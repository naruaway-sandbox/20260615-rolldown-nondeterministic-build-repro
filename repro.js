import { spawnSync } from "node:child_process";
import * as fs from "node:fs";

const runRolldown = () => {
  fs.rmSync("./dist", { recursive: true, force: true });

  spawnSync(
    // Replace this with locally built Rolldown binary when testing changes to the Rolldown source
    "./node_modules/.bin/rolldown",
    ["-c", "rolldown.config.js"],
    { stdio: "inherit" },
  );

  const distFileMap = {};
  for (const item of fs.readdirSync("./dist").sort()) {
    const relativePath = "./dist/" + item;
    distFileMap[relativePath] = fs.readFileSync(relativePath, "utf8");
  }
  return distFileMap;
};

const totalIterations = 1000;
const variants = new Map();
for (let i = 0; i < totalIterations; ++i) {
  console.log(`Iteration: ${i}`);
  const distFileMap = runRolldown();
  const serialized = JSON.stringify(distFileMap, null, 2);
  variants.set(serialized, (variants.get(serialized) ?? 0) + 1);
}

for (const [k, v] of variants.entries()) {
  console.log(`This output appeared ${v} times out of ${totalIterations}:`);
  console.log(k);
}
