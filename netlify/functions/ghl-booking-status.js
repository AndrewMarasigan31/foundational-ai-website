const DEFAULTS = {
  locationId: "AAPY6H2WOEr7wRAWxdSO",
  bookedStageId: "ffa4c61e-5e02-4754-96a7-a536cda6c14c"
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

function normalizeId(value) {
  return value ? String(value).trim() : "";
}

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const token = process.env.GHL_PIT;
  const locationId = process.env.GHL_LOCATION_ID || DEFAULTS.locationId;
  const bookedStageId =
    normalizeId(process.env.GHL_BOOKED_STAGE_ID) || DEFAULTS.bookedStageId;

  if (!token) {
    return json(500, { error: "Missing GHL_PIT environment variable" });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (_error) {
    return json(400, { error: "Invalid JSON body" });
  }

  const contactId = normalizeId(payload.contactId);
  const opportunityId = normalizeId(payload.opportunityId);

  if (!contactId) {
    return json(422, { error: "contactId is required" });
  }

  try {
    const appointmentResult = await ghlRequest(
      `/contacts/${contactId}/appointments`,
      token,
      "GET"
    );
    const events = Array.isArray(appointmentResult.events) ? appointmentResult.events : [];
    const latestAppointment = events[0] || null;

    if (!latestAppointment) {
      return json(200, {
        ok: true,
        booked: false,
        promoted: false,
        appointmentCount: 0
      });
    }

    if (!bookedStageId || !opportunityId) {
      return json(200, {
        ok: true,
        booked: true,
        promoted: false,
        appointmentCount: events.length,
        latestAppointment,
        reason: !bookedStageId ? "missing-booked-stage-id" : "missing-opportunity-id"
      });
    }

    const updateResult = await ghlRequest(`/opportunities/${opportunityId}`, token, "PUT", {
      locationId,
      pipelineStageId: bookedStageId
    });

    return json(200, {
      ok: true,
      booked: true,
      promoted: true,
      appointmentCount: events.length,
      latestAppointment,
      opportunityId,
      pipelineStageId: updateResult.opportunity?.pipelineStageId || bookedStageId
    });
  } catch (error) {
    return json(error.status || 500, {
      error: error.message,
      details: error.data || null
    });
  }
};
