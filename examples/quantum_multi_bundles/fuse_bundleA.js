const { src, task, context } = require("fuse-box/sparky");
const { FuseBox, QuantumPlugin } = require("fuse-box");

/** -------------------------------------
 * CONFIGURATIONS
 */

// Default fusebox configuration
context(class {
  getConfig() {
    return FuseBox.init({
      homeDir: "src/moduleA",
      output: "bundleA/$name.js",
      globals: { default: "modA" },
      plugins: [
        QuantumPlugin({
          uglify: {
            compress: {
              drop_console: false
            }
          },
          treeshake: true,
          ensureES5: true,
          bakeApiIntoBundle: "myModuleA",
          containedApi: true,
          noConflictApi: true
        })
      ]
    });
  }
});

/** -------------------------------------
 * TASKS
 */

// Default
task("default", ["clean", "bundle-moduleA", "copy-to-test"]);

// Clean
task("clean", async () => {
  await src("./bundleA").clean("bundleA/").exec();
});

// Copy for testing
task("copy-to-test", async () => {
  await src("./myModuleA.js", { base: "./bundleA" }).dest("test/bundle/").exec();
});

// Bundle moduleA
task("bundle-moduleA", async context => {
  const fuse = context.getConfig();

  // Create bundle
  fuse.bundle("myModuleA")
    .instructions("> index.ts");

  // Run build
  await fuse.run();
});