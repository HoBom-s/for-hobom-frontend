import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  getDatePickerToolbarTitle,
  getSelectedDate,
  normalizeTodoDateToUtcMidnight,
} from "./calendar-date.lib";
import { format, parseISO } from "date-fns";

describe("calendar-date.lib", () => {
  const MOCK_NOW_ISO = "2025-05-31T12:34:56Z";
  const MOCK_NOW_DATE = new Date(MOCK_NOW_ISO);

  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(MOCK_NOW_DATE);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe("getDatePickerToolbarTitle", () => {
    it("returns formatted now if query param is null", () => {
      const query = new URLSearchParams();
      const result = getDatePickerToolbarTitle(query, MOCK_NOW_DATE);
      expect(result).toBe(format(MOCK_NOW_DATE, "yyyy-MM-dd"));
    });

    it("returns formatted date from query param if valid", () => {
      const inputDate = "2025-05-01";
      const query = new URLSearchParams(`selectedDate=${inputDate}`);
      const result = getDatePickerToolbarTitle(query, MOCK_NOW_DATE);
      expect(result).toBe(inputDate);
    });

    it("returns formatted now if query param is invalid date string", () => {
      const query = new URLSearchParams("selectedDate=invalid");
      const result = getDatePickerToolbarTitle(query, MOCK_NOW_DATE);
      expect(typeof result).toBe("string");
    });
  });

  describe("getSelectedDate", () => {
    it("returns now if query param is null", () => {
      const query = new URLSearchParams();
      const result = getSelectedDate(query, MOCK_NOW_DATE);
      expect(result.toISOString()).toBe(MOCK_NOW_DATE.toISOString());
    });

    it("returns parsed date from query param if valid string", () => {
      const inputDate = "2024-01-15";
      const query = new URLSearchParams(`selectedDate=${inputDate}`);
      const result = getSelectedDate(query, MOCK_NOW_DATE);
      expect(result.toISOString()).toBe(parseISO(inputDate).toISOString());
    });
  });

  describe("normalizeTodoDateToUtcMidnight", () => {
    it("converts ISO string to UTC midnight Date", () => {
      const input = "2025-05-31T23:59:59+09:00";
      const result = normalizeTodoDateToUtcMidnight(input);
      expect(result.toISOString()).toBe("2025-05-31T00:00:00.000Z");
    });

    it("works with UTC midnight string", () => {
      const input = "2025-05-31T00:00:00Z";
      const result = normalizeTodoDateToUtcMidnight(input);
      expect(result.toISOString()).toBe("2025-05-31T00:00:00.000Z");
    });
  });
});
