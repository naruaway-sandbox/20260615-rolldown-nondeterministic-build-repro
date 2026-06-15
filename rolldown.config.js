import { defineConfig } from "rolldown";

export default defineConfig({
  platform: "node",
  input: {
    "parent-0": "./src/parent-0.js",
    "parent-1": "./src/parent-1.js",
  },
});
