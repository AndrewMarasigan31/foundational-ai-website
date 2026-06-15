/**
 * Tests for submitContact server action (Issue #16)
 * Verifies direct GHL API integration replacing the old webhook approach.
 */

const GHL_API = "https://services.leadconnectorhq.com";

const PAYLOAD = {
  name: "Jane Smith",
  email: "jane@example.com",
  businessName: "Smith Plumbing",
  websiteUrl: "https://example.com",
  helpWith: ["GBP Optimization", "Local SEO Content"],
};

function mockFetch(responses: { ok: boolean; json: object }[]) {
  let call = 0;
  return jest.fn().mockImplementation(() => {
    const r = responses[call++] ?? { ok: false, json: {} };
    return Promise.resolve({ ok: r.ok, json: () => Promise.resolve(r.json) });
  });
}

describe("submitContact", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
    jest.restoreAllMocks();
  });

  it("returns { success: false } when GHL_PIT is missing", async () => {
    delete process.env.GHL_PIT;
    const { submitContact } = await import("@/app/actions/submitContact");
    const result = await submitContact(PAYLOAD);
    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it("calls POST /contacts/upsert with auth header and correct body", async () => {
    process.env.GHL_PIT = "test-pit-token";
    global.fetch = mockFetch([
      { ok: true, json: { contact: { id: "cid-123" } } },
      { ok: true, json: { opportunity: { id: "oid-456" } } },
    ]);

    const { submitContact } = await import("@/app/actions/submitContact");
    await submitContact(PAYLOAD);

    const [url, init] = (global.fetch as jest.Mock).mock.calls[0];
    expect(url).toContain("/contacts/upsert");
    expect(init.method).toBe("POST");
    expect(init.headers["Authorization"]).toBe("Bearer test-pit-token");
    const body = JSON.parse(init.body);
    expect(body.email).toBe("jane@example.com");
    expect(body.locationId).toBeTruthy();
  });

  it("returns contactId from upsert response", async () => {
    process.env.GHL_PIT = "test-pit-token";
    global.fetch = mockFetch([
      { ok: true, json: { contact: { id: "cid-123" } } },
      { ok: true, json: { opportunity: { id: "oid-456" } } },
    ]);

    const { submitContact } = await import("@/app/actions/submitContact");
    const result = await submitContact(PAYLOAD);
    expect(result.contactId).toBe("cid-123");
  });

  it("calls POST /opportunities/ with contactId and correct stage", async () => {
    process.env.GHL_PIT = "test-pit-token";
    global.fetch = mockFetch([
      { ok: true, json: { contact: { id: "cid-123" } } },
      { ok: true, json: { opportunity: { id: "oid-456" } } },
    ]);

    const { submitContact } = await import("@/app/actions/submitContact");
    await submitContact(PAYLOAD);

    const [url, init] = (global.fetch as jest.Mock).mock.calls[1];
    expect(url).toContain("/opportunities/");
    const body = JSON.parse(init.body);
    expect(body.contactId).toBe("cid-123");
    expect(body.pipelineId).toBeTruthy();
    expect(body.pipelineStageId).toBeTruthy();
  });

  it("returns { success: true, contactId, opportunityId } on happy path", async () => {
    process.env.GHL_PIT = "test-pit-token";
    global.fetch = mockFetch([
      { ok: true, json: { contact: { id: "cid-123" } } },
      { ok: true, json: { opportunity: { id: "oid-456" } } },
    ]);

    const { submitContact } = await import("@/app/actions/submitContact");
    const result = await submitContact(PAYLOAD);
    expect(result).toEqual({ success: true, contactId: "cid-123", opportunityId: "oid-456" });
  });

  it("returns { success: false, error } when upsert API call fails", async () => {
    process.env.GHL_PIT = "test-pit-token";
    global.fetch = mockFetch([
      { ok: false, json: { message: "Bad request" } },
    ]);

    const { submitContact } = await import("@/app/actions/submitContact");
    const result = await submitContact(PAYLOAD);
    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it("returns { success: false, error } when opportunity creation fails", async () => {
    process.env.GHL_PIT = "test-pit-token";
    global.fetch = mockFetch([
      { ok: true, json: { contact: { id: "cid-123" } } },
      { ok: false, json: { message: "Server error" } },
    ]);

    const { submitContact } = await import("@/app/actions/submitContact");
    const result = await submitContact(PAYLOAD);
    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });
});
