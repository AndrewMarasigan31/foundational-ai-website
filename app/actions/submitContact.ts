"use server";

export interface ContactPayload {
  name: string;
  email: string;
  businessName: string;
  websiteUrl?: string;
  helpWith: string[];
}

export async function submitContact(
  payload: ContactPayload
): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (!webhookUrl) {
    return { success: false, error: "Webhook not configured" };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return { success: false, error: `Request failed: ${res.status}` };
    }
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}
