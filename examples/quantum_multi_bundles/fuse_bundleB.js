const { src, task, context } = require("fuse-box/sparky");
const { FuseBox, QuantumPlugin } = require("fuse-box");

/** -------------------------------------
 * CONFIGURATIONS
 */

// Default fusebox configuration
context(class {
  getConfig() {
    return FuseBox.init({
      homeDir: "src/moduleB",
      output: "bundleB/$name.js",
      globals: { myModuleB: "myModuleB" },
      package: {
        name: "myModuleB",
        main: "index.js"
      },
      plugins: [
        QuantumPlugin({
          target: "browser",
          uglify: {
            compress: {
              drop_console: false
            }
          },
          treeshake: true,
          ensureES5: true,
          bakeApiIntoBundle: "myModuleB",
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
task("default", ["clean", "bundle-moduleB", "copy-to-test"]);

// Clean
task("clean", async () => {
  await src("./bundleB").clean("bundleB/").exec();
});

// Copy for testing
task("copy-to-test", async () => {
  await src("./myModuleB.js", { base: "./bundleB" }).dest("test/bundle/").exec();
});

// Bundle moduleB
task("bundle-moduleB", async context => {
  const fuse = context.getConfig();

  // Create bundle
  fuse.bundle("myModuleB")
    .instructions("> index.ts");

  // Run build
  await fuse.run();
});