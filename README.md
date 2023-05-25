# gundb-in-memory-storage-adapter #

a trivial in-memory storage adapter for GunDB

[GunDB](https://github.com/amark/gun)'s built-in storage adapters based on [RAD](https://github.com/amark/gun/wiki/RAD) are completely broken (RAD [will soon be replaced by something else](https://github.com/amark/gun/issues/1329#issuecomment-1556079655)). Until then, this adapter may be used instead, e.g., for testing and debugging purposes.

In addition to the typical functionality of a GunDB storage adapter, this one also demonstrates "id filtering", a concept which lets the adapter only persist nodes which belong to a given "containment tree" and ignore any others. This functionality becomes important in really globally distributed sysems as it prevents a storage adapter from persisting foreign nodes.

Please be aware that this storage adapter does not really persist your nodes - all contents get lost as soon as you reload your web page or close its tab or window. If you want your data to survive these situations, you may use the [direct localStorage](https://github.com/rozek/gundb-direct-localstorage-adapter) or, even better, the [direct localForage](https://github.com/rozek/gundb-direct-localforage-adapter) adapter instead.

> **Important: after two weeks of intensive work and no substantial outcome, I have decided to give up on GunDB - it is full of design flaws, bugs and - even worse - race conditions and the implementation looks like being hacked in a style used 40 years ago (when source code had to be compact and variable names short and objects to be returned by reference because of performance constraints)**
> 
> **I wish everbody working with and on GunDB good luck - but will no longer participate myself**
>
> **Nevertheless, you may still use my contributions in any way you like - they are MIT licensed**

## Usage ##

Copy the contents of file [InMemoryStorageAdapter.js](./src/InMemoryStorageAdapter.js) into a `<script>` element and add it to the `<head>` section of your HTML document right after the one for GunDB itself.

```
<script src="https://cdn.jsdelivr.net/npm/gun/gun.js"></script>
<script>
  ... insert source code here
</script>
```

### Non-filtering Mode ###

Then, create your GunDB instance with the following options (among others, if need be):

```
  const Gun = GUN({ localStorage:false, inMemory:true })
```

From now on, work with your instance as usual - you should not recognize any difference except that GunDB will run much faster now.

### Filtering Mode ###

If you want to restrict persisting to only nodes that belong to one or multiple "containment trees" (i.e., nodes with ids that start with a given prefix) you may configure the storage adapter with one or multiple id prefixes.

Depending on whether such a prefix ends with a slash (`/`), the "root" of such a containment subtree will also be persisted or not:

* `'a/b/c'` will persist both the node `'a/b/c'` and all inner ones `'a/b/c/...'`, whereas
* `'a/b/c/'` will persist the inner nodes `'a/b/c/...'` only

If you need a single filtering prefix only, you may specify that string directly

```
  const Gun = GUN({ localStorage:false, inMemory:'a/b/c/' })
```

Otherwise specify an array containing all desired prefixes:

```
  const Gun = GUN({ localStorage:false, inMemory:['a/b/c/','1/2/3'] })
```

In any case, however, please be aware that the `InMemoryStorageAdapter` does not persist your data anywhere - all your GunDB contents will be lost as soon as you close your browser tab or window or reload the web page with your GunDB application. The `InMemoryStorageAdapter` is solely intended for experiments and tests.

## License ##

[MIT License](LICENSE.md)
