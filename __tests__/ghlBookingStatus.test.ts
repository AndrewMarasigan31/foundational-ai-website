/** @jest-environment node */
/**
 * Tests for POST /api/ghl-booking-status (Issue #18)
 */

jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) =>
      new Response(JSON.stringify(body), {
        status: init?.status ?? 200,
        headers: { "Content-Type": "application/json" },
      }),
  },
}));

const BOOKED_STAGE_ID = "ffa4c61e-5e02-4754-96a7-a536cda6c14c";

function makeRequest(method: string, body?: object) {
  return new Request("http://localhost/api/ghl-booking-status", {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
}

function mockFetch(responses: { ok: boolean; json: object }[]) {
  let call = 0;
  return jest.fn().mockImplementation(() => {
    const r = responses[call++] ?? { ok: false, json: {} };
    return Promise.resolve({ ok: r.ok, json: () => Promise.resolve(r.json) });
  });
}

describe("GET /api/ghl-booking-status", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
    jest.restoreAllMocks();
  });

  it("returns 405 for non-POST requests", async () => {
    const { GET } = await import(
      "@/app/api/ghl-booking-status/route"
    );
    const res = await GET(makeRequest("GET"));
    expect(res.status).toBe(405);
  });

  it("returns 500 when GHL_PIT is missing", async () => {
    delete process.env.GHL_PIT;
    const { POST } = await import("@/app/api/ghl-booking-status/route");
    const res = await POST(makeRequest("POST", { contactId: "c1", opportunityId: "o1" }));
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  it("returns { ok: true, booked: false } when no appointments exist", async () => {
    process.env.GHL_PIT = "test-pit";
    global.fetch = mockFetch([
      { ok: true, json: { appointments: [] } },
    ]);

    const { POST } = await import("@/app/api/ghl-booking-status/route");
    const res = await POST(
      makeRequest("POST", { contactId: "c1", opportunityId: "o1" })
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ ok: true, booked: false, promoted: false, appointmentCount: 0 });
  });

  it("promotes opportunity and returns booked: true when appointment exists", async () => {
    process.env.GHL_PIT = "test-pit";
    global.fetch = mockFetch([
      { ok: true, json: { appointments: [{ id: "appt-1" }] } },
      { ok: true, json: { opportunity: { id: "o1" } } },
    ]);

    const { POST } = await import("@/app/api/ghl-booking-status/route");
    const res = await POST(
      makeRequest("POST", { contactId: "c1", opportunityId: "o1" })
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ ok: true, booked: true, promoted: true, appointmentCount: 1 });
  });

  it("calls PUT /opportunities/{id} with bookedStageId when promoting", async () => {
    process.env.GHL_PIT = "test-pit";
    global.fetch = mockFetch([
      { ok: true, json: { appointments: [{ id: "appt-1" }] } },
      { ok: true, json: { opportunity: { id: "o1" } } },
    ]);

    const { POST } = await import("@/app/api/ghl-booking-status/route");
    await POST(makeRequest("POST", { contactId: "c1", opportunityId: "o1" }));

    const [url, init] = (global.fetch as jest.Mock).mock.calls[1];
    expect(url).toContain("/opportunities/o1");
    expect(init.method).toBe("PUT");
    const body = JSON.parse(init.body);
    expect(body.pipelineStageId).toBe(BOOKED_STAGE_ID);
  });

  it("returns 500 when appointments fetch fails", async () => {
    process.env.GHL_PIT = "test-pit";
    global.fetch = mockFetch([
      { ok: false, json: { message: "error" } },
    ]);

    const { POST } = await import("@/app/api/ghl-booking-status/route");
    const res = await POST(
      makeRequest("POST", { contactId: "c1", opportunityId: "o1" })
    );
    expect(res.status).toBe(500);
  });
});
