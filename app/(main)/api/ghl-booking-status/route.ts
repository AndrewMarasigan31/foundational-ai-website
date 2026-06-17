import { NextResponse } from "next/server";

const GHL_API = "https://services.leadconnectorhq.com";
const BOOKED_STAGE_ID =
  process.env.GHL_BOOKED_STAGE_ID ?? "ffa4c61e-5e02-4754-96a7-a536cda6c14c";

function ghlHeaders(pit: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${pit}`,
    Version: "2021-07-28",
  };
}

export async function GET(_req: Request) {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function POST(req: Request) {
  const pit = process.env.GHL_PIT;
  if (!pit) {
    return NextResponse.json({ error: "GHL_PIT not configured" }, { status: 500 });
  }

  const { contactId, opportunityId } = await req.json();

  try {
    // 1. Check for appointments
    const apptRes = await fetch(
      `${GHL_API}/contacts/${contactId}/appointments`,
      { method: "GET", headers: ghlHeaders(pit) }
    );

    if (!apptRes.ok) {
      return NextResponse.json(
        { error: `Appointments fetch failed: ${apptRes.status}` },
        { status: 500 }
      );
    }

    const apptData = await apptRes.json();
    const appointments: unknown[] = apptData.appointments ?? [];
    const appointmentCount = appointments.length;

    if (appointmentCount === 0) {
      return NextResponse.json({ ok: true, booked: false, promoted: false, appointmentCount: 0 });
    }

    // 2. Promote opportunity to Booked stage
    const promoteRes = await fetch(`${GHL_API}/opportunities/${opportunityId}`, {
      method: "PUT",
      headers: ghlHeaders(pit),
      body: JSON.stringify({ pipelineStageId: BOOKED_STAGE_ID }),
    });

    if (!promoteRes.ok) {
      return NextResponse.json(
        { error: `Opportunity promotion failed: ${promoteRes.status}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, booked: true, promoted: true, appointmentCount });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Network error" },
      { status: 500 }
    );
  }
}
