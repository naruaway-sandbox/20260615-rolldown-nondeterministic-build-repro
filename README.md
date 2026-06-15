# 20260615-rolldown-nondeterministic-build-repro

Run `pnpm run repro`

For example, in my environment (MacBook), the output was like the following:

```
This output appeared 52 times out of 100:
{
  "./dist/entry0.js": "import process from \"node:process\";\n//#region src/mod0.js\nconsole.log(0, process.pid);\n//#endregion\nexport {};\n",
  "./dist/entry1.js": "import process from \"node:process\";\n//#region src/mod1.js\nconsole.log(1, process.pid);\n//#endregion\nexport {};\n"
}
This output appeared 48 times out of 100:
{
  "./dist/entry0.js": "import process2 from \"node:process\";\n//#region src/mod0.js\nconsole.log(0, process2.pid);\n//#endregion\nexport {};\n",
  "./dist/entry1.js": "import process2 from \"node:process\";\n//#region src/mod1.js\nconsole.log(1, process2.pid);\n//#endregion\nexport {};\n"
}
```

It looks like default import with different symbol names for externalized dependency causes this non deterministic build.
