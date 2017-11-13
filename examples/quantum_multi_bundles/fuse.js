const { FuseBox, Sparky } = require("fuse-box");

Sparky.task("default", ["server-test"], () => {});

// Launch test server
Sparky.task("server-test", () => {
  const fuse = FuseBox.init({
    homeDir: "src",
    output: "test/$name.js"
  });

  fuse.dev({
    root: "test",
  });

  // Run build
  return fuse.run();
});