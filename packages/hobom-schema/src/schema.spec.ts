import { HoBomSchema, SchemaError, type Infer } from "./index";

describe("string", () => {
  const schema = HoBomSchema.string();

  it("parses valid string", () => {
    expect(schema.safeParse("hello")).toEqual({
      success: true,
      data: "hello",
    });
  });

  it("fails on non-string", () => {
    const result = schema.safeParse(123);

    expect(result.success).toBe(false);
  });

  it("min validation", () => {
    const s = HoBomSchema.string().min(3);

    expect(s.safeParse("ab").success).toBe(false);
    expect(s.safeParse("abc").success).toBe(true);
  });

  it("min with custom message", () => {
    const s = HoBomSchema.string().min(1, "required");
    const result = s.safeParse("");

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe("required");
    }
  });

  it("max validation", () => {
    const s = HoBomSchema.string().max(3);

    expect(s.safeParse("abcd").success).toBe(false);
    expect(s.safeParse("abc").success).toBe(true);
  });

  it("max with custom message", () => {
    const s = HoBomSchema.string().max(5, "too long");
    const result = s.safeParse("123456");

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe("too long");
    }
  });

  it("regex validation", () => {
    const s = HoBomSchema.string().regex(/^\d{4}-\d{2}-\d{2}$/);

    expect(s.safeParse("2024-01-01").success).toBe(true);
    expect(s.safeParse("not-a-date").success).toBe(false);
  });

  it("regex with global flag is safe", () => {
    const s = HoBomSchema.string().regex(/abc/g);

    expect(s.safeParse("abc").success).toBe(true);
    expect(s.safeParse("abc").success).toBe(true);
    expect(s.safeParse("abc").success).toBe(true);
  });

  it("chained validations", () => {
    const s = HoBomSchema.string().min(1).max(10);

    expect(s.safeParse("").success).toBe(false);
    expect(s.safeParse("hello").success).toBe(true);
    expect(s.safeParse("a very long string").success).toBe(false);
  });
});

describe("number", () => {
  const schema = HoBomSchema.number();

  it("parses valid number", () => {
    expect(schema.safeParse(42)).toEqual({ success: true, data: 42 });
  });

  it("fails on non-number", () => {
    expect(schema.safeParse("42").success).toBe(false);
  });

  it("fails on NaN", () => {
    expect(schema.safeParse(NaN).success).toBe(false);
  });

  it("fails on Infinity", () => {
    expect(schema.safeParse(Infinity).success).toBe(false);
    expect(schema.safeParse(-Infinity).success).toBe(false);
  });

  it("positive validation", () => {
    const s = HoBomSchema.number().positive();

    expect(s.safeParse(1).success).toBe(true);
    expect(s.safeParse(0).success).toBe(false);
    expect(s.safeParse(-1).success).toBe(false);
  });

  it("min validation", () => {
    const s = HoBomSchema.number().min(5);

    expect(s.safeParse(5).success).toBe(true);
    expect(s.safeParse(4).success).toBe(false);
  });

  it("max validation", () => {
    const s = HoBomSchema.number().max(10);

    expect(s.safeParse(10).success).toBe(true);
    expect(s.safeParse(11).success).toBe(false);
  });
});

describe("enum", () => {
  const schema = HoBomSchema.enum(["A", "B", "C"]);

  it("parses valid enum value", () => {
    expect(schema.safeParse("A")).toEqual({ success: true, data: "A" });
  });

  it("fails on invalid value", () => {
    expect(schema.safeParse("D").success).toBe(false);
  });

  it("fails on non-string", () => {
    expect(schema.safeParse(1).success).toBe(false);
  });

  it("exposes options as readonly copy", () => {
    const values = ["X", "Y"] as const;
    const s = HoBomSchema.enum(values);

    expect(s.options).toEqual(["X", "Y"]);
    expect(s.options).not.toBe(values);
  });
});

describe("object", () => {
  const schema = HoBomSchema.object({
    name: HoBomSchema.string().min(1),
    age: HoBomSchema.number().positive(),
  });

  it("parses valid object", () => {
    expect(schema.safeParse({ name: "Alice", age: 30 })).toEqual({
      success: true,
      data: { name: "Alice", age: 30 },
    });
  });

  it("fails on missing field", () => {
    expect(schema.safeParse({ name: "Alice" }).success).toBe(false);
  });

  it("fails on invalid field", () => {
    expect(schema.safeParse({ name: "", age: 30 }).success).toBe(false);
  });

  it("fails on null", () => {
    expect(schema.safeParse(null).success).toBe(false);
  });

  it("fails on non-object", () => {
    expect(schema.safeParse("string").success).toBe(false);
  });

  it("collects multiple errors", () => {
    const result = schema.safeParse({ name: "", age: -1 });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("strips extra keys", () => {
    const result = schema.safeParse({ name: "Alice", age: 30, admin: true });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(Object.keys(result.data)).toEqual(["name", "age"]);
    }
  });

  it("handles empty shape", () => {
    const empty = HoBomSchema.object({});

    expect(empty.safeParse({}).success).toBe(true);
    expect(empty.safeParse({ extra: 1 }).success).toBe(true);
  });
});

describe("array", () => {
  const schema = HoBomSchema.array(HoBomSchema.string().min(1));

  it("parses valid array", () => {
    expect(schema.safeParse(["a", "b"])).toEqual({
      success: true,
      data: ["a", "b"],
    });
  });

  it("parses empty array", () => {
    expect(schema.safeParse([])).toEqual({ success: true, data: [] });
  });

  it("fails on non-array", () => {
    expect(schema.safeParse("not array").success).toBe(false);
  });

  it("fails on invalid element", () => {
    expect(schema.safeParse(["a", ""]).success).toBe(false);
  });

  it("nested object errors include index", () => {
    const s = HoBomSchema.array(HoBomSchema.object({ name: HoBomSchema.string().min(1) }));
    const result = s.safeParse([{ name: "" }]);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toContain("[0]");
    }
  });
});

describe("optional", () => {
  const schema = HoBomSchema.string().optional();

  it("allows undefined", () => {
    expect(schema.safeParse(undefined)).toEqual({
      success: true,
      data: undefined,
    });
  });

  it("parses valid value", () => {
    expect(schema.safeParse("hello")).toEqual({
      success: true,
      data: "hello",
    });
  });

  it("still validates inner schema", () => {
    expect(schema.safeParse(123).success).toBe(false);
  });
});

describe("nullable", () => {
  const schema = HoBomSchema.string().nullable();

  it("allows null", () => {
    expect(schema.safeParse(null)).toEqual({ success: true, data: null });
  });

  it("parses valid value", () => {
    expect(schema.safeParse("hello")).toEqual({
      success: true,
      data: "hello",
    });
  });

  it("still validates inner schema", () => {
    expect(schema.safeParse(123).success).toBe(false);
  });
});

describe("nullable + optional chain", () => {
  const schema = HoBomSchema.string().nullable().optional();

  it("allows undefined", () => {
    expect(schema.safeParse(undefined)).toEqual({
      success: true,
      data: undefined,
    });
  });

  it("allows null", () => {
    expect(schema.safeParse(null)).toEqual({ success: true, data: null });
  });

  it("parses valid value", () => {
    expect(schema.safeParse("hello")).toEqual({
      success: true,
      data: "hello",
    });
  });
});

describe("parse (throwing)", () => {
  it("returns value on success", () => {
    expect(HoBomSchema.string().parse("hello")).toBe("hello");
  });

  it("throws SchemaError on failure", () => {
    expect(() => HoBomSchema.string().parse(123)).toThrow(SchemaError);
  });

  it("SchemaError preserves structured issues", () => {
    try {
      HoBomSchema.object({
        name: HoBomSchema.string().min(1),
        age: HoBomSchema.number(),
      }).parse({ name: "", age: "not a number" });
      expect.unreachable();
    } catch (e) {
      expect(e).toBeInstanceOf(SchemaError);

      const err = e as InstanceType<typeof SchemaError>;

      expect(err.issues.length).toBeGreaterThanOrEqual(2);
      expect(err.issues[0].message).toContain("name");
    }
  });
});

describe("complex schema (menu-recommendation pattern)", () => {
  const schema = HoBomSchema.object({
    candidates: HoBomSchema.array(HoBomSchema.string().min(1)),
    recommendationDate: HoBomSchema.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
    recommendedMenu: HoBomSchema.string().optional(),
    todayMenuId: HoBomSchema.string().optional(),
  });

  it("parses full object", () => {
    const result = schema.safeParse({
      candidates: ["김치찌개", "된장찌개"],
      recommendationDate: "2024-01-01",
      recommendedMenu: "김치찌개",
      todayMenuId: "abc123",
    });

    expect(result.success).toBe(true);
  });

  it("parses with optional fields omitted", () => {
    const result = schema.safeParse({
      candidates: ["김치찌개"],
      recommendationDate: "2024-01-01",
    });

    expect(result.success).toBe(true);
  });

  it("fails on invalid date format", () => {
    const result = schema.safeParse({
      candidates: ["김치찌개"],
      recommendationDate: "not-a-date",
    });

    expect(result.success).toBe(false);
  });
});

describe("type inference", () => {
  it("Infer works with enum", () => {
    const Status = HoBomSchema.enum(["ACTIVE", "ARCHIVED"]);

    type Status = Infer<typeof Status>;
    const value: Status = "ACTIVE";

    expect(value).toBe("ACTIVE");
  });

  it("Infer works with object", () => {
    const _UserSchema = HoBomSchema.object({
      name: HoBomSchema.string(),
      age: HoBomSchema.number(),
    });

    type User = Infer<typeof _UserSchema>;
    const user: User = { name: "Alice", age: 30 };

    expect(user.name).toBe("Alice");
  });
});
