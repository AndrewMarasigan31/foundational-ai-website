"use server";

const GHL_API = "https://services.leadconnectorhq.com";
const LOCATION_ID = process.env.GHL_LOCATION_ID ?? "AAPY6H2WOEr7wRAWxdSO";
const PIPELINE_ID = process.env.GHL_PIPELINE_ID ?? "rfnYDQwA3yas4OIP4NSA";
const NEW_LEAD_STAGE_ID =
  process.env.GHL_NEW_LEAD_STAGE_ID ?? "4d237f32-29f2-4ee8-9e68-da32ab9cccf8";

export interface ContactPayload {
  name: string;
  email: string;
  businessName: string;
  websiteUrl?: string;
  helpWith: string[];
}

export interface SubmitContactResult {
  success: boolean;
  error?: string;
  contactId?: string;
  opportunityId?: string;
}

function ghlHeaders(pit: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${pit}`,
    Version: "2021-07-28",
  };
}

export async function submitContact(
  payload: ContactPayload
): Promise<SubmitContactResult> {
  const pit = process.env.GHL_PIT;
  if (!pit) {
    return { success: false, error: "GHL_PIT env var not configured" };
  }

  const [firstName, ...rest] = payload.name.trim().split(" ");
  const lastName = rest.join(" ") || undefined;

  const tags = [
    "source:website",
    "intent:book-call",
    ...payload.helpWith.map((s) => `offer:${s}`),
  ];

  try {
    // 1. Upsert contact
    const upsertRes = await fetch(`${GHL_API}/contacts/upsert`, {
      method: "POST",
      headers: ghlHeaders(pit),
      body: JSON.stringify({
        locationId: LOCATION_ID,
        firstName,
        lastName,
        email: payload.email,
        companyName: payload.businessName,
        website: payload.websiteUrl,
        tags,
        customFields: [
          { id: "service_interest", value: payload.helpWith.join(", ") },
        ],
      }),
    });

    if (!upsertRes.ok) {
      return { success: false, error: `Contact upsert failed: ${upsertRes.status}` };
    }

    const upsertData = await upsertRes.json();
    const contactId: string = upsertData.contact.id;

    // 2. Create opportunity
    const oppRes = await fetch(`${GHL_API}/opportunities/`, {
      method: "POST",
      headers: ghlHeaders(pit),
      body: JSON.stringify({
        locationId: LOCATION_ID,
        pipelineId: PIPELINE_ID,
        pipelineStageId: NEW_LEAD_STAGE_ID,
        contactId,
        name: `${payload.name} — website`,
        status: "open",
      }),
    });

    if (!oppRes.ok) {
      return { success: false, error: `Opportunity creation failed: ${oppRes.status}` };
    }

    const oppData = await oppRes.json();
    const opportunityId: string = oppData.opportunity.id;

    return { success: true, contactId, opportunityId };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}
