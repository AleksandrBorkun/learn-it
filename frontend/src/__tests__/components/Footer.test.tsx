/**
 * Component tests for the Footer component.
 */

import { render, screen } from "@testing-library/react";

import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders the copyright notice with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} LearnIt. All rights reserved.`),
    ).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("has proper navigation aria label", () => {
    render(<Footer />);
    expect(
      screen.getByRole("navigation", { name: "Footer navigation" }),
    ).toBeInTheDocument();
  });
});
