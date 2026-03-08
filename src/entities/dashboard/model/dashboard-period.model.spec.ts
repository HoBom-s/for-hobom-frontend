import { describe, it, expect } from "vitest";
import {
  PeriodModel,
  SystemPeriodModel,
  PERIOD_LABEL,
  SYSTEM_PERIOD_LABEL,
  SYSTEM_PERIOD_HOURS,
} from "./dashboard-period.model";

describe("PeriodModel", () => {
  it("모든 PeriodModel 키에 대해 PERIOD_LABEL 항목이 존재한다", () => {
    for (const key of Object.keys(PeriodModel)) {
      expect(PERIOD_LABEL).toHaveProperty(key);
    }
  });
});

describe("SystemPeriodModel", () => {
  it("모든 SystemPeriodModel 키에 대해 SYSTEM_PERIOD_LABEL 항목이 존재한다", () => {
    for (const key of Object.keys(SystemPeriodModel)) {
      expect(SYSTEM_PERIOD_LABEL).toHaveProperty(key);
    }
  });

  it("모든 SystemPeriodModel 키에 대해 SYSTEM_PERIOD_HOURS 항목이 존재한다", () => {
    for (const key of Object.keys(SystemPeriodModel)) {
      expect(SYSTEM_PERIOD_HOURS).toHaveProperty(key);
    }
  });

  it("모든 SYSTEM_PERIOD_HOURS 값은 양수이다", () => {
    for (const hours of Object.values(SYSTEM_PERIOD_HOURS)) {
      expect(hours).toBeGreaterThan(0);
    }
  });
});
