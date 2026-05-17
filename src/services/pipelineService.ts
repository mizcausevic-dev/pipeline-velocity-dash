import { pipelineRisks, segmentVelocities, stageMetrics } from "../data/samplePipeline";

export function summary() {
  const totalPipelineUsd = segmentVelocities.reduce(
    (total, segment) => total + segment.sourcedPipelineUsd + segment.influencedPipelineUsd,
    0
  );
  const healthySegments = segmentVelocities.filter((segment) => segment.health === "healthy").length;
  const criticalLanes = pipelineRisks.filter((risk) => risk.health === "critical").length;
  const averageWinRate =
    Math.round(segmentVelocities.reduce((total, segment) => total + segment.winRatePct, 0) / segmentVelocities.length);

  return {
    stageCount: stageMetrics.length,
    totalPipelineUsd,
    healthySegments,
    criticalLanes,
    averageWinRatePct: averageWinRate,
    recommendation:
      "Fix the mql-to-sql handoff first, because pipeline volume is entering the system faster than qualification discipline can convert it."
  };
}

export function stageFunnel() {
  return stageMetrics;
}

export function segmentVelocity() {
  return segmentVelocities;
}

export function riskRegister() {
  return pipelineRisks;
}

export function verification() {
  return [
    "Stage counts, conversion rates, and cycle times are modeled together so funnel health is visible in one place.",
    "Segment velocity exposes where sourced pipeline and influenced pipeline are producing different levels of commercial yield.",
    "Pipeline risks connect operational slowdowns to actual revenue pressure instead of leaving them as abstract process complaints."
  ];
}

export function payload() {
  return {
    dashboard: summary(),
    stageFunnel: stageFunnel(),
    segmentVelocity: segmentVelocity(),
    risks: riskRegister(),
    verification: verification()
  };
}
