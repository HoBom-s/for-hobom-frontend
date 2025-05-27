import { describe, test, expect } from "vitest";
import { values } from "./values";

describe("values()", () => {
  test("Extract values of passed object", () => {
    expect(
      values({
        x: "x",
        y: "y",
      }),
    ).toStrictEqual(["x", "y"]);
    expect(
      values({
        k: "A",
        first: 1,
        second: "Sec-ond",
      }),
    ).toStrictEqual(["A", 1, "Sec-ond"]);
  });

  test("Extract values of passed array", () => {
    const simpleArray = [1, 2, 10];
    const curried = values();

    expect(values(simpleArray)).toStrictEqual([1, 2, 10]);
    expect(values(curried(simpleArray))).toStrictEqual([1, 2, 10]);
  });

  test("Extract values from class", () => {
    class Person {
      age: number;
      name: string;

      constructor(age: number, name: string) {
        this.age = age;
        this.name = name;
      }
    }
    const person = new Person(12, "John");

    expect(values(person)).toStrictEqual([12, "John"]);
  });
});
