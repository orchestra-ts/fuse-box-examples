# quantum_multi_bundle_example

**It is a simple test for my problem.**

I build two modules A and B with Fusebox: <br>
The **module A** export a method `funcA()`
and the **module B** export a a method `funcB()`.

## Build
In the terminal
- `node fuse_bundleA.js` for build the **module A**
- `node fuse_bundleA.js` for build the **module B**
- `node fuse.js` for start the dev server

Open your browser
- [page test moduleAB](http://localhost:4444/moduleAB.html)
- [page test moduleBA](http://localhost:4444/moduleBA.html)
- Open browser console (F12)

## Pages test
I create two pages test `moduleAB.html` and `moduleBA.html`: <br>
A first initialize the **bundleA** then the **bundleB**,
a second initialize the **bundleB** then the **bundleA**.

### Like this:
moduleAB.html
```html
  <script type="text/javascript">
    console.log("o-- myModuleA ----------------");
    console.log(myModuleA);
    myModuleA.funcA();
    
    console.log("o-- myModuleB ----------------");
    console.log(myModuleB);
    myModuleB.funcA(); // exist!
    myModuleB.funcB(); // fail
    // Uncaught TypeError: myModuleB.funcB is not a function
  </script>
```
moduleBA.html
```html
  <script type="text/javascript">
    console.log("o-- myModuleB ----------------");
    console.log(myModuleB);
    myModuleB.funcB();
    
    console.log("o-- myModuleA ----------------");
    console.log(myModuleA);
    myModuleA.funcB(); // exist!
    myModuleA.funcA(); // fail
    // Uncaught TypeError: myModuleA.funcA is not a function
  </script>
```

When I'm looking into bundle *myModuleA.js* and *myModuleB.js*, I have: <br>
`window.myModuleA = o.r(0)` and `window.myModuleB = o.r(0)` but is share the same object `$fsx.r(0)`!

## fusebox config with
fuse_bundleA.js
```javascript
{
  globals : { default: "myModuleA" },
  package: {
    name: "moduleA",
    entry: "index.ts"
  }
}
```
fuse_bundleB.js
```javascript
{
  globals : { default: "myModuleB" },
  package: {
    name: "moduleB",
    entry: "index.ts"
  }
}
```

## Quantum config with
fuse_bundleA.js
```javascript
{
  bakeApiIntoBundle: "myModuleA",
  containedApi: true
}
```
fuse_bundleB.js
```javascript
{
  bakeApiIntoBundle: "myModuleB",
  containedApi: true
}
```

Thx for help me.