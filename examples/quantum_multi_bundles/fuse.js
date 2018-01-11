const { task, context } = require("fuse-box/sparky");
const { FuseBox } = require("fuse-box");

task("default", ["server-test"]);

context(class {
  getConfig() {
    return FuseBox.init({
      homeDir: "src",
      output: "test/$name.js"
    });
  }
});

// Launch testing server
task("server-test", async context => {
  const fuse = context.getConfig();

  fuse.dev({
    root: "test",
  });

  // Run build
  await fuse.run();
});