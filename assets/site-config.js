window.FAS_SITE_CONFIG = {
  bookingCalendarUrl:
    "https://api.leadconnectorhq.com/widget/booking/andrew-marasigan-personal-calendar-lq0wbvtsf",

  // Leave blank until the live HighLevel inbound workflow webhook exists.
  // Modes:
  // - "off": skip webhook posting and use the host fallback behavior
  // - "dry-run": keep everything local for testing, no lead delivery
  // - "live": POST JSON to ghlWebhookUrl
  ghlWebhookMode: "live",
  ghlWebhookUrl: "/.netlify/functions/ghl-intake",
  ghlWebhookTimeoutMs: 8000,
  ghlBookingStatusUrl: "/.netlify/functions/ghl-booking-status"
};
