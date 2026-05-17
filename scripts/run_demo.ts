import { payload, summary } from "../src/services/pipelineService";

console.log("pipeline-velocity-dash demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().segmentVelocity, null, 2));
