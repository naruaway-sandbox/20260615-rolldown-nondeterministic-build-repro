# 20260615-rolldown-nondeterministic-build-repro

> [!NOTE]
> I reported this in https://github.com/rolldown/rolldown/issues/9754.

Run `pnpm run repro`.

For example, on my MacBook, the output looked like this:

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

This repro imports the same external Node built-in module (`node:process`) under two different local names: `process` in `src/mod0.js` and `process2` in `src/mod1.js`. Rolldown nondeterministically chooses one of those names for the generated default import, so both chunks sometimes use `process` and sometimes use `process2`.
