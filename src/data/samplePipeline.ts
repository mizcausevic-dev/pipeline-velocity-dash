export type Segment = "enterprise" | "mid-market" | "smb";
export type Stage = "mql" | "sql" | "discovery" | "proposal" | "closed-won";
export type Health = "healthy" | "watch" | "critical";

export interface StageMetric {
  stage: Stage;
  count: number;
  conversionPct: number;
  averageDays: number;
  dropOffPct: number;
}

export interface SegmentVelocity {
  segment: Segment;
  sourcedPipelineUsd: number;
  influencedPipelineUsd: number;
  winRatePct: number;
  averageSalesCycleDays: number;
  health: Health;
  explanation: string;
}

export interface PipelineRisk {
  id: string;
  lane: string;
  health: Health;
  impactedPipelineUsd: number;
  explanation: string;
}

export const stageMetrics: StageMetric[] = [
  {
    stage: "mql",
    count: 482,
    conversionPct: 100,
    averageDays: 2,
    dropOffPct: 0
  },
  {
    stage: "sql",
    count: 174,
    conversionPct: 36.1,
    averageDays: 5,
    dropOffPct: 63.9
  },
  {
    stage: "discovery",
    count: 96,
    conversionPct: 55.2,
    averageDays: 11,
    dropOffPct: 44.8
  },
  {
    stage: "proposal",
    count: 41,
    conversionPct: 42.7,
    averageDays: 19,
    dropOffPct: 57.3
  },
  {
    stage: "closed-won",
    count: 18,
    conversionPct: 43.9,
    averageDays: 34,
    dropOffPct: 56.1
  }
];

export const segmentVelocities: SegmentVelocity[] = [
  {
    segment: "enterprise",
    sourcedPipelineUsd: 1280000,
    influencedPipelineUsd: 940000,
    winRatePct: 29,
    averageSalesCycleDays: 71,
    health: "watch",
    explanation: "Enterprise pipeline is large enough, but proposal-to-close timing is starting to stretch beyond the target window."
  },
  {
    segment: "mid-market",
    sourcedPipelineUsd: 910000,
    influencedPipelineUsd: 630000,
    winRatePct: 34,
    averageSalesCycleDays: 46,
    health: "healthy",
    explanation: "Mid-market is moving with the best combination of speed and win rate across the board."
  },
  {
    segment: "smb",
    sourcedPipelineUsd: 240000,
    influencedPipelineUsd: 180000,
    winRatePct: 18,
    averageSalesCycleDays: 28,
    health: "critical",
    explanation: "SMB volume is entering the funnel, but qualification and handoff quality are not producing enough downstream yield."
  }
];

export const pipelineRisks: PipelineRisk[] = [
  {
    id: "RISK-01",
    lane: "mql-to-sql handoff",
    health: "critical",
    impactedPipelineUsd: 320000,
    explanation: "Speed-to-lead is inconsistent across inbound cohorts, causing good traffic to decay before sales acceptance."
  },
  {
    id: "RISK-02",
    lane: "proposal aging",
    health: "watch",
    impactedPipelineUsd: 410000,
    explanation: "Proposal-stage pipeline is lingering long enough to compress forecast confidence."
  },
  {
    id: "RISK-03",
    lane: "smb qualification",
    health: "critical",
    impactedPipelineUsd: 140000,
    explanation: "Low-intent or poorly routed leads are inflating top-of-funnel counts without enough conversion quality."
  }
];
