(function () {
  const CONTEXT_KEY = "fasLeadContext";
  const SUBMISSION_KEY = "fasContactSubmission";
  const DEFAULT_CALENDAR_URL =
    "https://api.leadconnectorhq.com/widget/booking/andrew-marasigan-personal-calendar-lq0wbvtsf";
  const DEFAULT_BOOKING_STATUS_URL = "/.netlify/functions/ghl-booking-status";
  const DEFAULT_WEBHOOK_TIMEOUT_MS = 8000;
  const SITE_CONFIG = window.FAS_SITE_CONFIG || {};

  const TRACKED_QUERY_KEYS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
    "msclkid",
    "service",
    "cta",
    "source",
    "call",
    "book"
  ];

  function readJson(key) {
    try {
      const raw = window.sessionStorage.getItem(key);
      return raw ? JSON.parse(raw) : {};
    } catch (_error) {
      return {};
    }
  }

  function writeJson(key, value) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (_error) {
      // Ignore storage issues.
    }
  }

  function currentPage() {
    return window.location.pathname.split("/").pop() || "index.html";
  }

  function getCalendarUrl() {
    return SITE_CONFIG.bookingCalendarUrl || DEFAULT_CALENDAR_URL;
  }

  function getWebhookUrl() {
    const value = SITE_CONFIG.ghlWebhookUrl;
    return typeof value === "string" ? value.trim() : "";
  }

  function getWebhookMode() {
    const value =
      typeof SITE_CONFIG.ghlWebhookMode === "string"
        ? SITE_CONFIG.ghlWebhookMode.trim().toLowerCase()
        : "off";
    return ["off", "dry-run", "live"].includes(value) ? value : "off";
  }

  function getBookingStatusUrl() {
    const value = SITE_CONFIG.ghlBookingStatusUrl;
    return typeof value === "string" && value.trim()
      ? value.trim()
      : DEFAULT_BOOKING_STATUS_URL;
  }

  function getWebhookTimeoutMs() {
    const value = Number(SITE_CONFIG.ghlWebhookTimeoutMs);
    return Number.isFinite(value) && value >= 1000 ? value : DEFAULT_WEBHOOK_TIMEOUT_MS;
  }

  function shouldUseNativeFormFallback(form) {
    if (window.location.protocol === "file:") return false;
    if (window.location.hostname === "localhost") return false;
    if (window.location.hostname === "127.0.0.1") return false;
    if (window.location.hostname === "[::1]") return false;

    return form.hasAttribute("data-netlify") || window.location.hostname.endsWith(".netlify.app");
  }

  function rememberSubmissionMeta(meta) {
    const next = Object.assign({}, readJson(SUBMISSION_KEY), meta);
    writeJson(SUBMISSION_KEY, next);
    return next;
  }

  function normalizeService(value) {
    if (!value) return "";
    const normalized = String(value).trim().toLowerCase();
    const map = {
      "gbp-audit": "gbp-audit",
      audit: "gbp-audit",
      "seo-content": "seo-content",
      seo: "seo-content",
      website: "website",
      web: "website",
      multiple: "multiple"
    };
    return map[normalized] || "";
  }

  function mergeContext(updates) {
    const next = Object.assign({}, readJson(CONTEXT_KEY), updates);
    writeJson(CONTEXT_KEY, next);
    return next;
  }

  function capturePageContext() {
    const params = new URLSearchParams(window.location.search);
    const updates = {
      currentPageUrl: window.location.href,
      currentPagePath: window.location.pathname
    };

    TRACKED_QUERY_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) {
        updates[key] = value;
      }
    });

    const service = normalizeService(params.get("service"));
    if (service) {
      updates.intendedService = service;
    }

    if (params.get("call") === "1" || params.get("book") === "1") {
      updates.bookIntent = true;
    }

    const existing = readJson(CONTEXT_KEY);
    if (!existing.firstLandingPageUrl) {
      updates.firstLandingPageUrl = window.location.href;
      updates.firstLandingPagePath = window.location.pathname;
    }
    if (document.referrer && !existing.originalReferrer) {
      updates.originalReferrer = document.referrer;
    }

    mergeContext(updates);
  }

  function rememberTrackedClick(anchor) {
    const updates = {
      ctaLabel: anchor.dataset.ctaLabel || anchor.textContent.trim(),
      ctaPage: currentPage()
    };

    const service = normalizeService(anchor.dataset.service);
    if (service) {
      updates.intendedService = service;
    }
    if (anchor.dataset.bookingIntent === "1") {
      updates.bookIntent = true;
    }

    mergeContext(updates);
  }

  function bindTrackedLinks() {
    document.querySelectorAll("a[data-track-contact]").forEach((anchor) => {
      anchor.addEventListener("click", function () {
        rememberTrackedClick(anchor);
      });
    });
  }

  function setFieldValue(form, name, value) {
    const input = form.querySelector('[name="' + name + '"]');
    if (input) {
      input.value = value || "";
    }
  }

  function getFieldValue(form, name) {
    const input = form.querySelector('[name="' + name + '"]');
    return input ? String(input.value || "").trim() : "";
  }

  function buildRedirectUrl(service, wantsCall, deliveryMode) {
    const redirectParams = new URLSearchParams();
    redirectParams.set("source", "contact-form");
    if (service) {
      redirectParams.set("service", service);
    }
    if (wantsCall) {
      redirectParams.set("booking", "1");
    }
    if (deliveryMode) {
      redirectParams.set("delivery", deliveryMode);
    }
    return "thank-you.html?" + redirectParams.toString();
  }

  function buildBookingPageUrl() {
    return "book-call.html";
  }

  function buildWebhookPayload(form, service, wantsCall) {
    const context = readJson(CONTEXT_KEY);

    return {
      submittedAt: new Date().toISOString(),
      contact: {
        firstName: getFieldValue(form, "firstName"),
        lastName: getFieldValue(form, "lastName"),
        email: getFieldValue(form, "email"),
        phone: getFieldValue(form, "phone"),
        businessName: getFieldValue(form, "businessName"),
        city: getFieldValue(form, "city")
      },
      lead: {
        service: service,
        serviceLabel: labelForService(service),
        wantsCall: wantsCall,
        message: getFieldValue(form, "message")
      },
      attribution: {
        landingPageUrl: getFieldValue(form, "landingPageUrl"),
        landingPagePath: getFieldValue(form, "landingPagePath"),
        originalEntryUrl: getFieldValue(form, "originalEntryUrl"),
        currentPageUrl: getFieldValue(form, "currentPageUrl"),
        referrer: getFieldValue(form, "referrer"),
        ctaLabel: getFieldValue(form, "ctaLabel"),
        ctaPage: getFieldValue(form, "ctaPage"),
        timezone: getFieldValue(form, "timezone"),
        language: getFieldValue(form, "language"),
        utm_source: getFieldValue(form, "utm_source"),
        utm_medium: getFieldValue(form, "utm_medium"),
        utm_campaign: getFieldValue(form, "utm_campaign"),
        utm_term: getFieldValue(form, "utm_term"),
        utm_content: getFieldValue(form, "utm_content"),
        gclid: getFieldValue(form, "gclid"),
        fbclid: getFieldValue(form, "fbclid"),
        msclkid: getFieldValue(form, "msclkid")
      },
      pageContext: context
    };
  }

  function setSubmittingState(form, submitting) {
    const button = form.querySelector('button[type="submit"]');
    if (!button) return;

    if (!button.dataset.defaultLabel) {
      button.dataset.defaultLabel = button.textContent;
    }

    button.disabled = submitting;
    button.textContent = submitting ? "Sending..." : button.dataset.defaultLabel;
  }

  function submitViaNativeFallback(form, redirectUrl) {
    form.action = redirectUrl;
    HTMLFormElement.prototype.submit.call(form);
  }

  function redirectToThankYou(redirectUrl) {
    window.location.assign(redirectUrl);
  }

  function handleFallbackSubmit(form, service, wantsCall, reason) {
    const nativeDelivery = shouldUseNativeFormFallback(form);
    const deliveryMode = nativeDelivery ? "native" : "preview";
    const redirectUrl = buildRedirectUrl(service, wantsCall, deliveryMode);

    rememberSubmissionMeta({
      service: service,
      wantsCall: wantsCall,
      submittedAt: new Date().toISOString(),
      deliveryMode: deliveryMode,
      fallbackReason: reason || ""
    });

    if (nativeDelivery) {
      submitViaNativeFallback(form, redirectUrl);
      return;
    }

    console.warn(
      "No live delivery endpoint is configured for this host. Redirecting in preview mode only."
    );
    redirectToThankYou(redirectUrl);
  }

  async function submitToWebhook(webhookUrl, payload) {
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timeoutId = controller
      ? window.setTimeout(function () {
          controller.abort();
        }, getWebhookTimeoutMs())
      : null;

    try {
      const response = await window.fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        signal: controller ? controller.signal : undefined
      });

      if (!response.ok) {
        throw new Error("Webhook returned " + response.status);
      }

      const text = await response.text();
      return text ? JSON.parse(text) : {};
    } finally {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    }
  }

  function hydrateContactForm(form) {
    const params = new URLSearchParams(window.location.search);
    const context = readJson(CONTEXT_KEY);
    const serviceSelect = form.querySelector("#service");
    const callRequest = form.querySelector("#callRequest");
    const service =
      normalizeService(params.get("service")) ||
      normalizeService(context.intendedService) ||
      "";
    const wantsCall =
      params.get("call") === "1" ||
      params.get("book") === "1" ||
      Boolean(context.bookIntent);

    if (serviceSelect && service) {
      serviceSelect.value = service;
    }

    if (callRequest && wantsCall) {
      callRequest.checked = true;
    }

    setFieldValue(form, "serviceInterest", service);
    setFieldValue(form, "landingPageUrl", context.firstLandingPageUrl || "");
    setFieldValue(form, "landingPagePath", context.firstLandingPagePath || "");
    setFieldValue(form, "originalEntryUrl", context.firstLandingPageUrl || "");
    setFieldValue(form, "currentPageUrl", window.location.href);
    setFieldValue(form, "referrer", context.originalReferrer || document.referrer || "");
    setFieldValue(form, "ctaLabel", context.ctaLabel || "");
    setFieldValue(form, "ctaPage", context.ctaPage || "");
    setFieldValue(form, "timezone", Intl.DateTimeFormat().resolvedOptions().timeZone || "");
    setFieldValue(form, "language", navigator.language || "");

    [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
      "fbclid",
      "msclkid"
    ].forEach((key) => {
      setFieldValue(form, key, context[key] || params.get(key) || "");
    });
  }

  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    hydrateContactForm(form);

    form.addEventListener("submit", async function (event) {
      capturePageContext();
      hydrateContactForm(form);

      const serviceSelect = form.querySelector("#service");
      const callRequest = form.querySelector("#callRequest");
      const service = normalizeService(serviceSelect ? serviceSelect.value : "");
      const wantsCall = Boolean(callRequest && callRequest.checked);

      if (service) {
        setFieldValue(form, "serviceInterest", service);
      }

      rememberSubmissionMeta({
        service: service,
        wantsCall: wantsCall,
        submittedAt: new Date().toISOString(),
        deliveryMode: "pending",
        fallbackReason: ""
      });

      const webhookMode = getWebhookMode();
      const webhookUrl = getWebhookUrl();

      if (webhookMode === "off") {
        event.preventDefault();
        handleFallbackSubmit(form, service, wantsCall, "webhook-off");
        return;
      }

      event.preventDefault();
      setSubmittingState(form, true);

      const payload = buildWebhookPayload(form, service, wantsCall);

      try {
        if (webhookMode === "dry-run") {
          console.info("GHL dry-run payload", payload);
          rememberSubmissionMeta({
            payloadPreview: payload,
            deliveryMode: "dry-run",
            fallbackReason: ""
          });
          redirectToThankYou(buildRedirectUrl(service, wantsCall, "dry-run"));
          return;
        }

        if (!webhookUrl) {
          throw new Error("Live webhook mode requires ghlWebhookUrl.");
        }

        const result = await submitToWebhook(webhookUrl, payload);
        rememberSubmissionMeta({
          contactId: result.contactId || "",
          opportunityId: result.opportunityId || "",
          deliveryMode: "webhook",
          fallbackReason: ""
        });
        redirectToThankYou(buildRedirectUrl(service, wantsCall, "webhook"));
      } catch (error) {
        console.error("GHL webhook submit failed, falling back safely.", error);
        handleFallbackSubmit(form, service, wantsCall, "webhook-failed");
      } finally {
        setSubmittingState(form, false);
      }
    });
  }

  function labelForService(service) {
    const labels = {
      "gbp-audit": "GBP Audit & Optimization",
      "seo-content": "Local SEO Content Package",
      website: "Already Done Website",
      multiple: "more than one service"
    };
    return labels[service] || "your request";
  }

  function initThankYouPage() {
    const heading = document.getElementById("thankYouHeading");
    const message = document.getElementById("thankYouMessage");
    const bookingAction = document.getElementById("bookingAction");
    const deliveryNote = document.getElementById("thankYouDeliveryNote");
    if (!heading || !message || !bookingAction) return;

    const params = new URLSearchParams(window.location.search);
    const submission = readJson(SUBMISSION_KEY);
    const context = readJson(CONTEXT_KEY);
    const service =
      normalizeService(params.get("service")) ||
      normalizeService(submission.service) ||
      normalizeService(context.intendedService) ||
      "";
    const wantsCall = params.get("booking") === "1" || Boolean(submission.wantsCall);
    const deliveryMode = params.get("delivery") || submission.deliveryMode || "";

    if (service) {
      message.textContent =
        "Your message is in. We review every inquiry manually and will follow up within 1 business day about " +
        labelForService(service) +
        ".";
    }

    if (wantsCall) {
      heading.textContent = "Message sent. Book your call next.";
      message.textContent =
        "Your request is in. If you want to keep the momentum, grab a time on the calendar now and we will come into the call with context.";
      bookingAction.hidden = false;
      bookingAction.href = buildBookingPageUrl();
    }

    if (deliveryNote && deliveryMode && deliveryMode !== "webhook" && deliveryMode !== "native") {
      deliveryNote.hidden = false;
      if (deliveryMode === "dry-run") {
        deliveryNote.textContent =
          "Test mode only: this submission was not sent to HighLevel. Check the browser console or sessionStorage for the payload preview.";
      } else if (deliveryMode === "preview") {
        deliveryNote.textContent =
          "Preview mode only: this host does not have a live form destination configured, so no lead was delivered from this test submission.";
      }
    }
  }

  async function fetchBookingStatus(submission) {
    const response = await window.fetch(getBookingStatusUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contactId: submission.contactId || "",
        opportunityId: submission.opportunityId || ""
      })
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      throw new Error(data.error || "Booking status request failed");
    }

    return data;
  }

  function initBookCallPage() {
    const frame = document.getElementById("bookingFrame");
    const status = document.getElementById("bookingStatus");
    if (!frame || !status) return;

    const submission = readJson(SUBMISSION_KEY);
    frame.src = getCalendarUrl();

    if (!submission.contactId) {
      status.textContent =
        "The live calendar is ready. Book your time here. Booking sync will start automatically after lead intake is live in this browser session.";
      return;
    }

    status.textContent =
      "Calendar is live. After you book, this page will check for the appointment and move the opportunity into the dedicated booked stage.";

    let attempts = 0;
    const maxAttempts = 40;
    const intervalId = window.setInterval(async function () {
      attempts += 1;

      try {
        const result = await fetchBookingStatus(submission);
        if (result.booked && result.promoted) {
          status.textContent =
            "Appointment detected. The opportunity was moved into the booked stage successfully.";
          window.clearInterval(intervalId);
          return;
        }
        if (result.booked && !result.promoted) {
          status.textContent =
            result.reason === "missing-booked-stage-id"
              ? "Appointment detected. Promotion is waiting on the dedicated Booked stage ID in Netlify env."
              : "Appointment detected. Promotion is waiting on the opportunity ID from the intake step.";
          window.clearInterval(intervalId);
          return;
        }
        if (attempts >= maxAttempts) {
          status.textContent =
            "Still waiting for a confirmed appointment. If you just booked, leave this page open for another minute and it should catch up.";
          window.clearInterval(intervalId);
        }
      } catch (error) {
        status.textContent =
          "Booking sync hit an error while checking the appointment. The calendar still works, but the booked-stage promotion needs a quick check.";
        console.error("Booking status polling failed.", error);
        window.clearInterval(intervalId);
      }
    }, 15000);
  }

  function initNav() {
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    capturePageContext();
    bindTrackedLinks();
    initContactForm();
    initThankYouPage();
    initBookCallPage();
    initNav();
  });
})();
