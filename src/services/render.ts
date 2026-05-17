import { riskRegister, segmentVelocity, stageFunnel, summary, verification } from "./pipelineService";

function layout(title: string, activePath: string, body: string) {
  const nav = [
    { href: "/", label: "Overview" },
    { href: "/stage-funnel", label: "Stage Funnel" },
    { href: "/segment-velocity", label: "Segment Velocity" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ]
    .map((item) => {
      const active = item.href === activePath ? "nav-chip active" : "nav-chip";
      return `<a class="${active}" href="${item.href}">${item.label}</a>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
      :root {
        --bg: #07111d;
        --panel: rgba(15, 27, 44, 0.9);
        --line: rgba(123, 164, 255, 0.16);
        --text: #eef4ff;
        --muted: #97abc7;
        --accent: #69c7ff;
        --accent-strong: #6c7eff;
        --good: #39d98a;
        --watch: #f1bd55;
        --critical: #ff6d84;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", Inter, sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top left, rgba(105, 199, 255, 0.18), transparent 28%),
          radial-gradient(circle at top right, rgba(108, 126, 255, 0.16), transparent 26%),
          linear-gradient(180deg, #05101b 0%, var(--bg) 100%);
      }
      a { color: inherit; text-decoration: none; }
      .shell { max-width: 1280px; margin: 0 auto; padding: 28px 28px 40px; }
      .topbar {
        display: flex; justify-content: space-between; align-items: center; gap: 20px;
        padding: 16px 18px; border: 1px solid var(--line);
        background: rgba(8, 16, 28, 0.82); border-radius: 24px;
      }
      .brand { display: flex; gap: 14px; align-items: center; }
      .brand-mark {
        width: 42px; height: 42px; display: grid; place-items: center;
        border-radius: 14px;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
        font-weight: 800;
      }
      .eyebrow {
        margin: 0 0 2px; font-size: 12px; letter-spacing: 0.22em;
        text-transform: uppercase; color: #90cbff;
      }
      .brand-title { margin: 0; font-size: 24px; font-weight: 700; }
      .brand-subtitle { margin: 4px 0 0; color: var(--muted); font-size: 14px; }
      nav { display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; }
      .nav-chip {
        padding: 12px 16px; border-radius: 999px; border: 1px solid var(--line);
        background: rgba(14, 25, 41, 0.9); color: #dce8ff; font-size: 13px;
        letter-spacing: 0.06em; text-transform: uppercase;
      }
      .nav-chip.active {
        background: linear-gradient(135deg, rgba(105, 199, 255, 0.95), rgba(108, 126, 255, 0.92));
        border-color: transparent; color: white; box-shadow: 0 10px 24px rgba(72, 129, 255, 0.32);
      }
      .hero {
        margin-top: 24px; padding: 30px 30px 34px; border-radius: 30px;
        border: 1px solid var(--line);
        background: linear-gradient(180deg, rgba(13, 24, 40, 0.95), rgba(9, 19, 33, 0.92));
      }
      .hero h1 {
        margin: 8px 0 10px; max-width: 920px;
        font-size: clamp(40px, 4.8vw, 66px); line-height: 0.96; letter-spacing: -0.04em;
      }
      .hero p { max-width: 860px; margin: 0; font-size: 21px; line-height: 1.5; color: #b6c8e5; }
      .section { margin-top: 24px; display: grid; gap: 20px; }
      .metrics { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px; }
      .panel { padding: 22px; border-radius: 26px; border: 1px solid var(--line); background: var(--panel); }
      .metric-label { color: #8fb6ea; letter-spacing: 0.18em; font-size: 12px; text-transform: uppercase; }
      .metric-value { margin-top: 14px; font-size: 44px; font-weight: 750; line-height: 1; }
      .metric-copy { margin-top: 12px; font-size: 14px; color: var(--muted); line-height: 1.5; }
      .cols-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
      .table { width: 100%; border-collapse: collapse; margin-top: 14px; }
      .table th, .table td {
        padding: 14px 10px; border-bottom: 1px solid rgba(143, 182, 234, 0.11);
        text-align: left; vertical-align: top;
      }
      .table th { color: #8fb6ea; font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; }
      .table td { color: #e9f1ff; font-size: 14px; line-height: 1.45; }
      .tag {
        display: inline-flex; align-items: center; padding: 6px 10px; border-radius: 999px;
        font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
      }
      .healthy { background: rgba(57, 217, 138, 0.15); color: var(--good); }
      .watch { background: rgba(241, 189, 85, 0.15); color: var(--watch); }
      .critical { background: rgba(255, 109, 132, 0.15); color: var(--critical); }
      .velocity { background: rgba(105, 199, 255, 0.14); color: var(--accent); }
      .section-title { margin: 0; font-size: 28px; line-height: 1.1; }
      .section-copy { margin: 10px 0 0; color: var(--muted); font-size: 16px; line-height: 1.55; }
      ul.clean { margin: 16px 0 0; padding-left: 18px; color: #dbe7fb; }
      ul.clean li { margin-top: 10px; line-height: 1.5; }
      code { background: rgba(14, 25, 41, 0.9); padding: 2px 6px; border-radius: 8px; }
      @media (max-width: 1100px) {
        .metrics, .cols-2 { grid-template-columns: 1fr; }
        nav { justify-content: flex-start; }
        .topbar { flex-direction: column; align-items: flex-start; }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">PV</div>
          <div>
            <p class="eyebrow">Digital Intelligence</p>
            <h1 class="brand-title">Pipeline Velocity Dash</h1>
            <p class="brand-subtitle">Stage conversion, segment speed, and revenue momentum in one operator view.</p>
          </div>
        </div>
        <nav>${nav}</nav>
      </header>
      ${body}
    </main>
  </body>
</html>`;
}

export function renderOverview() {
  const stats = summary();
  const riskList = riskRegister()
    .map((risk) => `<li><strong>${risk.lane}</strong> — $${risk.impactedPipelineUsd} impacted. ${risk.explanation}</li>`)
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Pipeline Control Plane</p>
      <h1>Pipeline velocity should make revenue slowdowns obvious before forecast confidence breaks.</h1>
      <p>Track stage conversion, segment-level yield, and operational drag so Growth, RevOps, and sales leadership can see where funnel momentum is actually slowing.</p>
    </section>
    <section class="section">
      <div class="metrics">
        <article class="panel">
          <div class="metric-label">Stages</div>
          <div class="metric-value">${stats.stageCount}</div>
          <div class="metric-copy">Modeled stages across the core revenue funnel.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Pipeline</div>
          <div class="metric-value">$${stats.totalPipelineUsd}</div>
          <div class="metric-copy">Combined sourced and influenced pipeline currently under review.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Healthy Segments</div>
          <div class="metric-value">${stats.healthySegments}</div>
          <div class="metric-copy">Segments currently moving at target speed and yield.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Critical Lanes</div>
          <div class="metric-value">${stats.criticalLanes}</div>
          <div class="metric-copy">Revenue lanes where process drag is compressing outcomes.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Avg Win Rate</div>
          <div class="metric-value">${stats.averageWinRatePct}%</div>
          <div class="metric-copy">Blended win rate across modeled segments.</div>
        </article>
      </div>
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Recommendation</p>
          <h2 class="section-title">What to fix first</h2>
          <p class="section-copy">${stats.recommendation}</p>
        </article>
        <article class="panel">
          <p class="eyebrow">Risk Register</p>
          <h2 class="section-title">Where momentum is leaking</h2>
          <ul class="clean">${riskList}</ul>
        </article>
      </div>
    </section>`;

  return layout("Pipeline Velocity Dash", "/", body);
}

export function renderStageFunnel() {
  const rows = stageFunnel()
    .map(
      (stage) => `
      <tr>
        <td>${stage.stage}</td>
        <td>${stage.count}</td>
        <td>${stage.conversionPct}%</td>
        <td>${stage.averageDays}</td>
        <td>${stage.dropOffPct}%</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Stage Funnel</p>
      <h1>Stage conversion is where pipeline volume turns into either forecast confidence or false optimism.</h1>
      <p>This funnel shows how many deals survive each step, how long they stay there, and where drop-off is starting to outweigh top-of-funnel creation.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Stage Metrics</p>
        <h2 class="section-title">Count, conversion, cycle time, and drop-off by stage.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Stage</th>
              <th>Count</th>
              <th>Conversion</th>
              <th>Avg Days</th>
              <th>Drop-off</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </article>
    </section>`;

  return layout("Pipeline Velocity Dash - Stage Funnel", "/stage-funnel", body);
}

export function renderSegmentVelocity() {
  const segmentRows = segmentVelocity()
    .map(
      (segment) => `
      <tr>
        <td>${segment.segment}</td>
        <td>$${segment.sourcedPipelineUsd}</td>
        <td>$${segment.influencedPipelineUsd}</td>
        <td>${segment.winRatePct}%</td>
        <td>${segment.averageSalesCycleDays}</td>
        <td><span class="tag ${segment.health}">${segment.health}</span></td>
        <td>${segment.explanation}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Segment Velocity</p>
      <h1>Not every segment is slow for the same reason, and not every win rate means the same thing.</h1>
      <p>This surface compares sourced pipeline, influenced pipeline, cycle time, and win rate so teams can see which segments are scaling cleanly and which ones are hiding drag.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Segment Metrics</p>
        <h2 class="section-title">Revenue momentum by segment.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Segment</th>
              <th>Sourced</th>
              <th>Influenced</th>
              <th>Win Rate</th>
              <th>Cycle Days</th>
              <th>Health</th>
              <th>Explanation</th>
            </tr>
          </thead>
          <tbody>${segmentRows}</tbody>
        </table>
      </article>
    </section>`;

  return layout("Pipeline Velocity Dash - Segment Velocity", "/segment-velocity", body);
}

export function renderVerification() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Verification</p>
      <h1>This build proves funnel velocity should be measured in operational and commercial terms together.</h1>
      <p>The point is not just visualizing stages. The point is exposing where conversion, timing, and segment quality are combining to either strengthen or weaken pipeline outcomes.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Release Checks</p>
        <h2 class="section-title">What this repo validates</h2>
        <ul class="clean">
          ${verification().map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
    </section>`;

  return layout("Pipeline Velocity Dash - Verification", "/verification", body);
}

export function renderDocs() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Docs</p>
      <h1>Modeled as a pipeline-operations dashboard for Growth and RevOps.</h1>
      <p>This repo combines stage conversion, segment-level momentum, and risk lanes so leadership can see where revenue creation is healthy and where the machine is slowing down.</p>
    </section>
    <section class="section">
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Routes</p>
          <h2 class="section-title">UI surface</h2>
          <ul class="clean">
            <li><code>/</code> overview and revenue momentum posture</li>
            <li><code>/stage-funnel</code> conversion and drop-off view</li>
            <li><code>/segment-velocity</code> sourced vs influenced segment speed</li>
            <li><code>/verification</code> release checks and modeling claims</li>
          </ul>
        </article>
        <article class="panel">
          <p class="eyebrow">API</p>
          <h2 class="section-title">Machine-readable outputs</h2>
          <ul class="clean">
            <li><code>/api/dashboard/summary</code></li>
            <li><code>/api/stage-funnel</code></li>
            <li><code>/api/segment-velocity</code></li>
            <li><code>/api/risks</code></li>
            <li><code>/api/verification</code></li>
            <li><code>/api/sample</code></li>
          </ul>
        </article>
      </div>
    </section>`;

  return layout("Pipeline Velocity Dash - Docs", "/docs", body);
}
