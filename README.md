# gundb-in-memory-storage-adapter #

a trivial in-memory storage adapter for GunDB

[GunDB](https://github.com/amark/gun)'s built-in storage adapters based on [RAD](https://github.com/amark/gun/wiki/RAD) are completely broken (RAD [will soon be replaced by something else](https://github.com/amark/gun/issues/1329#issuecomment-1556079655)). Until then, this storage adapter may be used, e.g., for testing and debugging purposes.

Please be aware that this storage adapter does not really persist your nodes - all contents get lost as soon as you reload your web page or close its tab or window. If you want your data to survive these situations, you may use the [direct localStorage adapter](https://github.com/rozek/gundb-direct-localstorage-adapter) instead.

> **Important**: this adapter is not yet finished and its documentation still has to be written. The plan is to finish everything by end of June, 2023

## Usage ##

Copy the contents of file [InMemoryStorageAdapter.js](./src/InMemoryStorageAdapter.js) into a `<script>` element and add it to the `<head>` section of your HTML document right after the one for GunDB itself.

```
<script src="https://cdn.jsdelivr.net/npm/gun/gun.js"></script>
<script>
  ... insert source code here
</script>
```

Then, create your GunDB instance with the following options (among others, if need be):

```
  const Gun = GUN({ localStorage:false, inMemory:true })
```

From now on, work with your instance as usual - you should not recognize any difference except that GunDB will run much faster now.

However, please be aware that the `InMemoryStorageAdapter` does not persist your data anywhere - all your GunDB contents will be lost as soon as you close your browser tab or window or reload the web page with your GunDB application. The `InMemoryStorageAdapter` is solely intended for experiments and tests.

## License ##

[MIT License](LICENSE.md)
