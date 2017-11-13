const { FuseBox, Sparky, QuantumPlugin, WebIndexPlugin } = require("fuse-box");

/** -------------------------------------
 * CONFIGURATIONS
 */

// Default fusebox configuration
const fuseConfig = {
  homeDir: "src/moduleA",
  output: "bundle/$name.js",
  globals: { default: "myModuleA" },
  package: {
    name: "moduleA",
    entry: "index.ts"
  },
  plugins: [
    // WebIndexPlugin(),
    QuantumPlugin({
      target: "browser",
      uglify: false,
      ensureES5: true,
      bakeApiIntoBundle: "myModuleA",
      containedApi: false
    })
  ]
};

/** -------------------------------------
 * TASKS
 */

// Default
Sparky.task("default", ["clean", "bundle-moduleA", "copy-to-test"], () => {});

// Clean
Sparky.task("clean", () => {
  return Sparky.src("bundleA/").clean("bundleA/");
});

Sparky.task("copy-to-test", () => {
  return Sparky.src("bundle/myModuleA.js").dest("test/");
});

// Bundle moduleA
Sparky.task("bundle-moduleA", () => {
  const fuse = FuseBox.init(fuseConfig);

  // Create bundle
  fuse.bundle("myModuleA")
    .instructions(`>index.ts`);

  // Run build
  return fuse.run();
});