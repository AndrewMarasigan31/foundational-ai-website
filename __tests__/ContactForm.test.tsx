/**
 * Tests for ContactForm booking flow (Issue #19)
 */
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import ContactForm from "@/components/ContactForm";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// submitContact mock factory — call before each test that needs different behavior
const mockSubmitContact = jest.fn();
jest.mock("@/app/actions/submitContact", () => ({
  submitContact: (...args: unknown[]) => mockSubmitContact(...args),
}));

// fetch mock for ghl-booking-status calls
function stubFetch(json: object, ok = true) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    json: () => Promise.resolve(json),
  });
}

async function fillAndSubmit() {
  fireEvent.change(screen.getByLabelText("Name"), {
    target: { value: "Jane Smith" },
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "jane@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/business name/i), {
    target: { value: "Smith Plumbing" },
  });
  fireEvent.click(screen.getByRole("button", { name: /book my free audit call/i }));
}

describe("ContactForm — booking flow", () => {
  beforeEach(() => {
    mockSubmitContact.mockReset();
  });

  it("shows booking CTA after successful submit", async () => {
    mockSubmitContact.mockResolvedValue({
      success: true,
      contactId: "cid-1",
      opportunityId: "oid-1",
    });

    render(<ContactForm />);
    await act(async () => { await fillAndSubmit(); });

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /book your audit call/i })).toBeInTheDocument();
    });
    // Old final message should NOT appear yet
    expect(screen.queryByText(/we'll see you on the call/i)).not.toBeInTheDocument();
  });

  it("booking CTA contains a link to the calendar", async () => {
    mockSubmitContact.mockResolvedValue({
      success: true,
      contactId: "cid-1",
      opportunityId: "oid-1",
    });

    render(<ContactForm />);
    await act(async () => { await fillAndSubmit(); });

    await waitFor(() => {
      const link = screen.getByRole("link", { name: /book/i });
      expect(link).toHaveAttribute("href");
      expect(link.getAttribute("href")).not.toBe("");
    });
  });

  it("calls /api/ghl-booking-status with stored IDs when user clicks 'I've booked'", async () => {
    mockSubmitContact.mockResolvedValue({
      success: true,
      contactId: "cid-1",
      opportunityId: "oid-1",
    });
    stubFetch({ ok: true, booked: false, promoted: false, appointmentCount: 0 });

    render(<ContactForm />);
    await act(async () => { await fillAndSubmit(); });

    await waitFor(() => screen.getByRole("heading", { name: /book your audit call/i }));

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /i.ve booked/i }));
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/ghl-booking-status",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ contactId: "cid-1", opportunityId: "oid-1" }),
      })
    );
  });

  it("shows final confirmation when booking status returns booked: true", async () => {
    mockSubmitContact.mockResolvedValue({
      success: true,
      contactId: "cid-1",
      opportunityId: "oid-1",
    });
    stubFetch({ ok: true, booked: true, promoted: true, appointmentCount: 1 });

    render(<ContactForm />);
    await act(async () => { await fillAndSubmit(); });

    await waitFor(() => screen.getByRole("heading", { name: /book your audit call/i }));

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /i.ve booked/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/you.re all set/i)).toBeInTheDocument();
    });
  });
});

describe("ContactForm — calendar pre-fill (Issue #23)", () => {
  beforeEach(() => {
    mockSubmitContact.mockReset();
    mockSubmitContact.mockResolvedValue({
      success: true,
      contactId: "cid-1",
      opportunityId: "oid-1",
    });
  });

  it("appends email query param to calendar link after submit", async () => {
    render(<ContactForm />);
    await act(async () => { await fillAndSubmit(); });

    await waitFor(() => screen.getByRole("heading", { name: /book your audit call/i }));
    const link = screen.getByRole("link", { name: /book your audit call/i });
    expect(link.getAttribute("href")).toContain("email=jane%40example.com");
  });

  it("appends firstName query param to calendar link", async () => {
    render(<ContactForm />);
    await act(async () => { await fillAndSubmit(); });

    await waitFor(() => screen.getByRole("heading", { name: /book your audit call/i }));
    const link = screen.getByRole("link", { name: /book your audit call/i });
    expect(link.getAttribute("href")).toContain("firstName=Jane");
  });

  it("appends lastName query param to calendar link", async () => {
    render(<ContactForm />);
    await act(async () => { await fillAndSubmit(); });

    await waitFor(() => screen.getByRole("heading", { name: /book your audit call/i }));
    const link = screen.getByRole("link", { name: /book your audit call/i });
    expect(link.getAttribute("href")).toContain("lastName=Smith");
  });
});
