# quantum_multi_bundle_example

**It is a simple test for multi bundle.**

My test is to be able to coexist several bundled builded with the FuseBox API, while exposing their own methods to the window object.

I build two modules A and B with FuseBox: <br>
The **module A** export a method `funcA()`
and the **module B** export a a method `funcB()`.

### Requirements
- FuseBox 3.0.2+
- Node.js 8.2+

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
    myModuleB.funcB();
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
    myModuleA.funcA();
  </script>
```


## FuseBox config with
fuse_bundleA.js
```javascript
{
  globals : { "myModuleA": "myModuleA" },
  package: {
    name: "myModuleA",
    entry: "index.ts"
  }
}
```
fuse_bundleB.js
```javascript
{
  globals : { "myModuleB": "myModuleB" },
  package: {
    name: "myModuleB",
    entry: "index.ts"
  }
}
```


## Quantum config with
fuse_bundleA.js
```javascript
{
  ...
  bakeApiIntoBundle: "myModuleA",
  containedApi: true,
  noConflictApi: true
}
```
fuse_bundleB.js
```javascript
{
  ...
  bakeApiIntoBundle: "myModuleB",
  containedApi: true,
  noConflictApi: true
}
```