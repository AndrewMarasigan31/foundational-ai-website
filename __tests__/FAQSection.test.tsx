import { render, screen, fireEvent } from "@testing-library/react";
import FAQSection from "@/components/FAQSection";

// Mock framer-motion AnimatePresence to render children directly
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useReducedMotion: () => false,
}));

// Mock AnimatedSection to render children directly
jest.mock("@/components/AnimatedSection", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("FAQSection accordion", () => {
  it("renders all FAQ questions", () => {
    render(<FAQSection />);
    expect(
      screen.getByText("Do I have to sign a long-term contract?")
    ).toBeInTheDocument();
    expect(screen.getByText("How fast will I see results?")).toBeInTheDocument();
  });

  it("does not show answer initially", () => {
    render(<FAQSection />);
    expect(
      screen.queryByText(/No long-term contract required/)
    ).not.toBeInTheDocument();
  });

  it("shows answer when question is clicked", () => {
    render(<FAQSection />);
    const button = screen.getByRole("button", {
      name: /Do I have to sign a long-term contract/,
    });
    fireEvent.click(button);
    expect(
      screen.getByText(/No long-term contract required/)
    ).toBeInTheDocument();
  });

  it("hides answer when question is clicked again", () => {
    render(<FAQSection />);
    const button = screen.getByRole("button", {
      name: /Do I have to sign a long-term contract/,
    });
    fireEvent.click(button);
    expect(
      screen.getByText(/No long-term contract required/)
    ).toBeInTheDocument();
    fireEvent.click(button);
    expect(
      screen.queryByText(/No long-term contract required/)
    ).not.toBeInTheDocument();
  });

  it("sets aria-expanded correctly", () => {
    render(<FAQSection />);
    const button = screen.getByRole("button", {
      name: /Do I have to sign a long-term contract/,
    });
    expect(button).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("can open multiple items independently", () => {
    render(<FAQSection />);
    const btn1 = screen.getByRole("button", {
      name: /Do I have to sign a long-term contract/,
    });
    const btn2 = screen.getByRole("button", {
      name: /How fast will I see results/,
    });
    fireEvent.click(btn1);
    fireEvent.click(btn2);
    expect(screen.getByText(/No long-term contract required/)).toBeInTheDocument();
    expect(screen.getByText(/GBP fixes can show ranking movement/)).toBeInTheDocument();
  });
});
