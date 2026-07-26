// @vitest-environment jsdom
import type { ReactNode } from "react";
import { act, renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { useSearchParamsState, type SearchParamsCodec } from "./useSearchParamsState";

interface Query {
  q?: string;
}

const codec: SearchParamsCodec<Query> = {
  decode: (params) => ({ q: params.get("q") ?? undefined }),
  encode: ({ q }) => {
    const params = new URLSearchParams();

    if (q) params.set("q", q);

    return params;
  },
};

const renderAt = (entry: string) => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[entry]}>{children}</MemoryRouter>
  );

  return renderHook(() => useSearchParamsState(codec), { wrapper });
};

describe("useSearchParamsState", () => {
  it("decodes the initial query via the codec", () => {
    const { result } = renderAt("/animals?q=hello");

    expect(result.current[0]).toEqual({ q: "hello" });
  });

  it("writes the encoded value back to the query on set", () => {
    const { result } = renderAt("/animals");

    act(() => result.current[1]({ q: "world" }));

    expect(result.current[0]).toEqual({ q: "world" });
  });

  it("clears the query on reset", () => {
    const { result } = renderAt("/animals?q=hello");

    act(() => result.current[2]());

    expect(result.current[0]).toEqual({ q: undefined });
  });
});
