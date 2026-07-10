import { describe, expect, it } from "vitest";
import { HoBomSchema } from "hobom-schema";
import { parseResponse } from "./parse-response.api";

const itemSchema = HoBomSchema.object({
  id: HoBomSchema.string(),
  title: HoBomSchema.string(),
});

describe("parseResponse", () => {
  it("returns the payload when it matches the schema", () => {
    const payload = { id: "1", title: "hello" };

    expect(parseResponse(itemSchema, "GET /items")(payload)).toEqual(payload);
  });

  it("throws with the context and issue detail when the shape is wrong", () => {
    expect(() => parseResponse(itemSchema, "GET /items")({ id: "1" })).toThrow(
      /Response validation failed \(GET \/items\)/,
    );
  });

  it("throws when a field has the wrong type", () => {
    expect(() =>
      parseResponse(itemSchema, "GET /items")({ id: 1, title: "hello" }),
    ).toThrow(/Response validation failed/);
  });

  it("validates arrays element by element", () => {
    const listSchema = HoBomSchema.array(itemSchema);
    const list = [
      { id: "1", title: "a" },
      { id: "2", title: "b" },
    ];

    expect(parseResponse(listSchema, "GET /items")(list)).toEqual(list);
    expect(() =>
      parseResponse(listSchema, "GET /items")([{ id: "1", title: "a" }, { id: "2" }]),
    ).toThrow(/Response validation failed/);
  });
});
