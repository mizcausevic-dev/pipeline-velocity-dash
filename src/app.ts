import express from "express";

import { payload, riskRegister, segmentVelocity, stageFunnel, summary, verification } from "./services/pipelineService";
import {
  renderDocs,
  renderOverview,
  renderSegmentVelocity,
  renderStageFunnel,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5298);

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/stage-funnel", (_req, res) => res.type("html").send(renderStageFunnel()));
app.get("/segment-velocity", (_req, res) => res.type("html").send(renderSegmentVelocity()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/stage-funnel", (_req, res) => res.json(stageFunnel()));
app.get("/api/segment-velocity", (_req, res) => res.json(segmentVelocity()));
app.get("/api/risks", (_req, res) => res.json(riskRegister()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`Pipeline Velocity Dash listening on http://127.0.0.1:${port}`);
  });
}

export default app;
