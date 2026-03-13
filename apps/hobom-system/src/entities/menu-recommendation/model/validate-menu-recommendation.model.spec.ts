import {
  validateMenuRecommendationInput,
  validateTodayMenuInput,
} from "./validate-menu-recommendation.model";

describe("validateTodayMenuInput", () => {
  const validInput = {
    candidates: ["Bibimbap", "Ramen"],
    recommendationDate: "2026-01-15",
  };

  it("returns data on valid input", () => {
    const result = validateTodayMenuInput(validInput);

    expect(result).toEqual(validInput);
  });

  it("returns Error when recommendationDate format is wrong (slash separator)", () => {
    const result = validateTodayMenuInput({
      ...validInput,
      recommendationDate: "2026/01/15",
    });

    expect(result).toBeInstanceOf(Error);
  });

  it("returns Error when recommendationDate is a datetime string", () => {
    const result = validateTodayMenuInput({
      ...validInput,
      recommendationDate: "2026-01-15T00:00:00Z",
    });

    expect(result).toBeInstanceOf(Error);
  });

  it("returns Error when candidates contains an empty string", () => {
    const result = validateTodayMenuInput({
      ...validInput,
      candidates: [""],
    });

    expect(result).toBeInstanceOf(Error);
  });

  it("accepts optional recommendedMenu and todayMenuId", () => {
    const result = validateTodayMenuInput({
      ...validInput,
      recommendedMenu: "Bibimbap",
      todayMenuId: "id-123",
    });

    expect(result).not.toBeInstanceOf(Error);
  });

  it("returns Error for missing required fields", () => {
    const result = validateTodayMenuInput({});

    expect(result).toBeInstanceOf(Error);
  });
});

describe("validateMenuRecommendationInput", () => {
  const validInput = {
    name: "Bibimbap",
    menuKind: "KOREAN",
    timeOfMeal: "LUNCH",
    foodType: "MEAL",
  };

  it("returns data on valid input", () => {
    const result = validateMenuRecommendationInput(validInput);

    expect(result).toEqual(validInput);
  });

  it("returns Error when name is empty string", () => {
    const result = validateMenuRecommendationInput({
      ...validInput,
      name: "",
    });

    expect(result).toBeInstanceOf(Error);
  });

  it("returns Error for unknown menuKind", () => {
    const result = validateMenuRecommendationInput({
      ...validInput,
      menuKind: "FRENCH",
    });

    expect(result).toBeInstanceOf(Error);
  });

  it("returns Error for unknown timeOfMeal", () => {
    const result = validateMenuRecommendationInput({
      ...validInput,
      timeOfMeal: "BRUNCH",
    });

    expect(result).toBeInstanceOf(Error);
  });

  it("returns Error for unknown foodType", () => {
    const result = validateMenuRecommendationInput({
      ...validInput,
      foodType: "SNACK",
    });

    expect(result).toBeInstanceOf(Error);
  });

  it("accepts all valid menuKind values", () => {
    const kinds = [
      "KOREAN",
      "JAPANESE",
      "CHINESE",
      "INDIAN",
      "MEXICAN",
      "AMERICAN",
      "ITALIAN",
    ];

    for (const menuKind of kinds) {
      const result = validateMenuRecommendationInput({
        ...validInput,
        menuKind,
      });

      expect(result).not.toBeInstanceOf(Error);
    }
  });

  it("accepts all valid timeOfMeal values", () => {
    const times = ["BREAKFAST", "LUNCH", "DINNER"];

    for (const timeOfMeal of times) {
      const result = validateMenuRecommendationInput({
        ...validInput,
        timeOfMeal,
      });

      expect(result).not.toBeInstanceOf(Error);
    }
  });
});
