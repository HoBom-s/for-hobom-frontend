// @vitest-environment happy-dom
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Carousel } from "./Carousel";

const slides = ["one", "two", "three"];

const renderCarousel = (arrows = false) =>
  render(
    <Carousel aria-label="images" arrows={arrows}>
      {slides.map((text) => (
        <div key={text}>{text}</div>
      ))}
    </Carousel>,
  );

describe("Carousel", () => {
  it("renders every slide and a counter", () => {
    renderCarousel();

    slides.forEach((text) => expect(screen.getByText(text)).toBeTruthy());
    expect(screen.getByText("1/3")).toBeTruthy();
  });

  it("hides the arrows by default", () => {
    renderCarousel();

    expect(screen.queryByRole("button", { name: "다음" })).toBeNull();
  });

  it("shows arrows when enabled and advances with next", () => {
    renderCarousel(true);

    expect(screen.queryByRole("button", { name: "이전" })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "다음" }));

    expect(screen.getByText("2/3")).toBeTruthy();
    expect(screen.getByRole("button", { name: "이전" })).toBeTruthy();
  });

  it("jumps to a slide via its dot", () => {
    renderCarousel();

    fireEvent.click(screen.getByRole("button", { name: "3번째로 이동" }));

    expect(screen.getByText("3/3")).toBeTruthy();
    expect(screen.queryByRole("button", { name: "다음" })).toBeNull();
  });

  it("renders a single child without carousel chrome", () => {
    render(
      <Carousel>
        <div>only</div>
      </Carousel>,
    );

    expect(screen.getByText("only")).toBeTruthy();
    expect(screen.queryByRole("button", { name: "다음" })).toBeNull();
  });
});
