import { describe, expect, it } from "vitest";

import { payload, riskRegister, segmentVelocity, summary } from "./services/pipelineService";

describe("pipeline-velocity-dash", () => {
  it("summary exposes pipeline momentum posture", () => {
    const result = summary();

    expect(result.stageCount).toBeGreaterThan(0);
    expect(result.totalPipelineUsd).toBeGreaterThan(0);
    expect(result.recommendation).toContain("mql-to-sql");
  });

  it("segment velocity and risk lanes stay commercially legible", () => {
    expect(segmentVelocity().length).toBeGreaterThan(1);
    expect(riskRegister().some((risk) => risk.explanation.includes("pipeline"))).toBe(true);
  });

  it("payload bundles the full funnel surface", () => {
    const result = payload();

    expect(result.dashboard.stageCount).toBe(result.stageFunnel.length);
    expect(result.segmentVelocity.length).toBeGreaterThan(0);
    expect(result.risks.length).toBeGreaterThan(0);
    expect(result.verification.length).toBe(3);
  });
});
