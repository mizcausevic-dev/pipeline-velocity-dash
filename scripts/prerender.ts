import fs from "node:fs/promises";
import path from "node:path";

import { payload, riskRegister, segmentVelocity, stageFunnel, summary, verification } from "../src/services/pipelineService";
import { renderDocs, renderOverview, renderSegmentVelocity, renderStageFunnel, renderVerification } from "../src/services/render";

const root = path.resolve(__dirname, "..");
const site = path.join(root, "site");

async function writeFile(target: string, content: string) {
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, content, "utf8");
}

async function writeJson(relativePath: string, value: unknown) {
  await writeFile(path.join(site, relativePath), JSON.stringify(value, null, 2));
}

async function main() {
  await fs.rm(site, { recursive: true, force: true });

  await writeFile(path.join(site, "index.html"), renderOverview());
  await writeFile(path.join(site, "stage-funnel", "index.html"), renderStageFunnel());
  await writeFile(path.join(site, "segment-velocity", "index.html"), renderSegmentVelocity());
  await writeFile(path.join(site, "verification", "index.html"), renderVerification());
  await writeFile(path.join(site, "docs", "index.html"), renderDocs());

  await writeJson("api/dashboard/summary/index.json", summary());
  await writeJson("api/stage-funnel/index.json", stageFunnel());
  await writeJson("api/segment-velocity/index.json", segmentVelocity());
  await writeJson("api/risks/index.json", riskRegister());
  await writeJson("api/verification/index.json", verification());
  await writeJson("api/sample/index.json", payload());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
