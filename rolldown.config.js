import { defineConfig } from "rolldown";

export default defineConfig({
  platform: "node",
  input: {
    entry0: "./src/entry0.js",
    entry1: "./src/entry1.js",
  },
});
