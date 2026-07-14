// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AnimalGallery } from "./AnimalGallery";

const PHOTOS = ["one.jpg", "two.jpg", "three.jpg"];

const heroSrc = () => screen.getByAltText("콩이 사진").getAttribute("src");

describe("AnimalGallery", () => {
  it("shows the first photo as the hero", () => {
    render(<AnimalGallery photos={PHOTOS} name="콩이" />);

    expect(heroSrc()).toBe("one.jpg");
    expect(screen.getAllByRole("button")).toHaveLength(PHOTOS.length);
  });

  it("swaps the hero when a thumbnail is selected", () => {
    render(<AnimalGallery photos={PHOTOS} name="콩이" />);

    fireEvent.click(screen.getByRole("button", { name: "콩이 사진 3" }));

    expect(heroSrc()).toBe("three.jpg");
    expect(screen.getByRole("button", { name: "콩이 사진 3" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("renders no thumbnails for a single photo", () => {
    render(<AnimalGallery photos={["only.jpg"]} name="콩이" />);

    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });
});
