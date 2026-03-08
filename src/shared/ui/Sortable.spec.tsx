import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Sortable } from "./Sortable";

describe("Sortable", () => {
  const items = ["item-1", "item-2", "item-3"];

  const noop = () => {};

  it("Root > List > Item 구조에서 모든 아이템을 렌더링한다", () => {
    render(
      <Sortable.Root onDragEnd={noop}>
        <Sortable.List items={items}>
          {items.map((id) => (
            <Sortable.Item key={id} id={id}>
              <span>{id}</span>
            </Sortable.Item>
          ))}
        </Sortable.List>
      </Sortable.Root>,
    );

    expect(screen.getByText("item-1")).toBeDefined();
    expect(screen.getByText("item-2")).toBeDefined();
    expect(screen.getByText("item-3")).toBeDefined();
  });

  it("useHandle=true일 때 Handle이 렌더링된다", () => {
    render(
      <Sortable.Root onDragEnd={noop}>
        <Sortable.List items={["item-1"]}>
          <Sortable.Item id="item-1" useHandle>
            <Sortable.Handle>
              <span>핸들</span>
            </Sortable.Handle>
            <span>아이템 내용</span>
          </Sortable.Item>
        </Sortable.List>
      </Sortable.Root>,
    );

    expect(screen.getByText("핸들")).toBeDefined();
    expect(screen.getByText("아이템 내용")).toBeDefined();
  });

  it("items prop 변경 시 목록이 업데이트된다", () => {
    const { rerender } = render(
      <Sortable.Root onDragEnd={noop}>
        <Sortable.List items={["a", "b"]}>
          <Sortable.Item id="a">
            <span>A</span>
          </Sortable.Item>
          <Sortable.Item id="b">
            <span>B</span>
          </Sortable.Item>
        </Sortable.List>
      </Sortable.Root>,
    );

    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("B")).toBeDefined();

    rerender(
      <Sortable.Root onDragEnd={noop}>
        <Sortable.List items={["a", "b", "c"]}>
          <Sortable.Item id="a">
            <span>A</span>
          </Sortable.Item>
          <Sortable.Item id="b">
            <span>B</span>
          </Sortable.Item>
          <Sortable.Item id="c">
            <span>C</span>
          </Sortable.Item>
        </Sortable.List>
      </Sortable.Root>,
    );

    expect(screen.getByText("C")).toBeDefined();
  });

  it("Item 밖에서 Handle을 사용하면 에러를 throw한다", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() =>
      render(
        <Sortable.Root onDragEnd={noop}>
          <Sortable.Handle>
            <span>핸들</span>
          </Sortable.Handle>
        </Sortable.Root>,
      ),
    ).toThrow(
      "Sortable.Handle must be used inside Sortable.Item with useHandle",
    );
  });
});
