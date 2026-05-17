# Architecture

## Core idea

`pipeline-velocity-dash` models revenue momentum through three linked views:
- stage-level conversion and drop-off
- segment-level yield and speed
- operational risks mapped to actual pipeline impact

## Surface model

- overview
  - stage count, total pipeline, segment health, critical lanes, and win-rate posture
- stage funnel
  - count, conversion, cycle time, and drop-off by stage
- segment velocity
  - sourced pipeline, influenced pipeline, win rate, and cycle time by segment
- verification
  - claims about pipeline visibility and revenue interpretation

## Data model

- `StageMetric`
  - stage
  - count
  - conversion
  - average days
  - drop-off
- `SegmentVelocity`
  - segment
  - sourced pipeline
  - influenced pipeline
  - win rate
  - average sales cycle
  - health
  - explanation
- `PipelineRisk`
  - lane
  - health
  - impacted pipeline
  - explanation

## Commercial value

The point is not just to chart funnel math. The point is to make it obvious where operational drag is starting to reduce real revenue yield across segments and stages.
