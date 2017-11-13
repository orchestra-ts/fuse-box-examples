const {FuseBox, Sparky, QuantumPlugin, WebIndexPlugin} = require("fuse-box");

/** -------------------------------------
 * CONFIGURATIONS
 */

// Default fusebox configuration
const fuseConfig = {
  homeDir: "src/moduleB",
  output: "bundle/$name.js",
  globals: {default: "myModuleB"},
  package: {
    name: "moduleB",
    entry: "index.ts"
  },
  plugins: [
    // WebIndexPlugin(),
    QuantumPlugin({
      target: "browser",
      uglify: false,
      ensureES5: true,
      bakeApiIntoBundle: "myModuleB",
      containedApi: true
    })
  ]
};

/** -------------------------------------
 * TASKS
 */

// Default
Sparky.task("default", ["clean", "bundle-moduleB", "copy-to-test"], () => {});

// Clean
Sparky.task("clean", () => {
  return Sparky.src("bundleB/").clean("bundleB/");
});

Sparky.task("copy-to-test", () => {
  return Sparky.src("bundle/myModuleB.js").dest("test/");
});

// Bundle moduleB
Sparky.task("bundle-moduleB", () => {
  const fuse = FuseBox.init(fuseConfig);

  // Create bundle
  fuse.bundle("myModuleB")
    .instructions(`> index.ts`);

  // Run build
  return fuse.run();
});