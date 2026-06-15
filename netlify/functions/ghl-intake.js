const DEFAULTS = {
  locationId: "AAPY6H2WOEr7wRAWxdSO",
  pipelineId: "rfnYDQwA3yas4OIP4NSA",
  newLeadStageId: "4d237f32-29f2-4ee8-9e68-da32ab9cccf8",
  customFields: {
    serviceInterest: "Vi7V4hGyMcoTjitlCSSJ",
    landingPageUrl: "Aeed1SpWu2kTRRTZi0eO",
    utmSource: "ego2D7m5dkfJGAKzraJe",
    utmMedium: "SoCsReFWSaIVnRWsQkIo",
    utmCampaign: "bLFhBJvw7XE8onZhSR87"
  }
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
}

function normalizePhone(value) {
  if (!value) return "";
  return String(value).trim();
}

function normalizeString(value) {
  return value ? String(value).trim() : "";
}

async function ghlRequest(path, token, method, body) {
  const response = await fetch(`https://services.leadconnectorhq.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (_error) {
    data = { raw: text };
  }

  if (!response.ok) {
    const error = new Error(`GHL ${method} ${path} failed with ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

function buildCustomFields(payload) {
  const attribution = payload.attribution || {};
  const lead = payload.lead || {};
  const fields = [];
  const mapping = [
    [DEFAULTS.customFields.serviceInterest, normalizeString(lead.serviceLabel)],
    [DEFAULTS.customFields.landingPageUrl, normalizeString(attribution.landingPageUrl)],
    [DEFAULTS.customFields.utmSource, normalizeString(attribution.utm_source)],
    [DEFAULTS.customFields.utmMedium, normalizeString(attribution.utm_medium)],
    [DEFAULTS.customFields.utmCampaign, normalizeString(attribution.utm_campaign)]
  ];

  for (const [id, value] of mapping) {
    if (value) {
      fields.push({ id, value });
    }
  }

  return fields;
}

function buildTags(payload) {
  const tags = ["source:website"];
  const lead = payload.lead || {};
  if (lead.service) tags.push(`offer:${lead.service}`);
  tags.push(lead.wantsCall ? "intent:book-call" : "intent:message-only");
  return tags;
}

function buildOpportunityName(contact, lead) {
  const businessName = normalizeString(contact.businessName);
  const fullName = [contact.firstName, contact.lastName].filter(Boolean).join(" ").trim();
  const serviceLabel = normalizeString(lead.serviceLabel);

  if (businessName && serviceLabel) {
    return `${businessName} - ${serviceLabel}`;
  }
  if (businessName) {
    return businessName;
  }
  if (fullName && serviceLabel) {
    return `${fullName} - ${serviceLabel}`;
  }
  if (fullName) {
    return fullName;
  }
  return serviceLabel || "Website Lead";
}

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const token = process.env.GHL_PIT;
  const locationId = process.env.GHL_LOCATION_ID || DEFAULTS.locationId;
  const pipelineId = process.env.GHL_PIPELINE_ID || DEFAULTS.pipelineId;
  const pipelineStageId =
    process.env.GHL_NEW_LEAD_STAGE_ID || DEFAULTS.newLeadStageId;

  if (!token) {
    return json(500, { error: "Missing GHL_PIT environment variable" });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (_error) {
    return json(400, { error: "Invalid JSON body" });
  }

  const contact = payload.contact || {};
  const lead = payload.lead || {};
  const email = normalizeString(contact.email);
  const phone = normalizePhone(contact.phone);

  if (!email && !phone) {
    return json(422, { error: "Lead payload requires at least email or phone" });
  }

  try {
    const contactResult = await ghlRequest("/contacts/upsert", token, "POST", {
      locationId,
      firstName: normalizeString(contact.firstName),
      lastName: normalizeString(contact.lastName),
      name: [contact.firstName, contact.lastName].filter(Boolean).join(" ").trim(),
      email,
      phone,
      companyName: normalizeString(contact.businessName),
      city: normalizeString(contact.city)
    });

    const contactId = contactResult.contact?.id;
    if (!contactId) {
      throw new Error("GHL contact upsert did not return a contact ID");
    }

    const customFields = buildCustomFields(payload);
    if (customFields.length) {
      await ghlRequest(`/contacts/${contactId}`, token, "PUT", { customFields });
    }

    const tags = buildTags(payload);
    if (tags.length) {
      await ghlRequest(`/contacts/${contactId}/tags`, token, "POST", { tags });
    }

    const opportunityName = buildOpportunityName(contact, lead);

    const opportunity = await ghlRequest("/opportunities/", token, "POST", {
      locationId,
      contactId,
      pipelineId,
      pipelineStageId,
      status: "open",
      name: opportunityName
    });

    return json(200, {
      ok: true,
      contactId,
      opportunityId: opportunity.opportunity?.id || null
    });
  } catch (error) {
    return json(error.status || 500, {
      error: error.message,
      details: error.data || null
    });
  }
};
