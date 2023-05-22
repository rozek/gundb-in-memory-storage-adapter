# gundb-inmemory-storage-adapter #

a trivial in-memory storage adapter for GunDB

[GunDB](https://github.com/amark/gun)'s built-in storage adapters based on [RAD](https://github.com/amark/gun/wiki/RAD) are completely broken (RAD [will soon be replaced by something else](https://github.com/amark/gun/issues/1329#issuecomment-1556079655)). Until then, this storage adapter may be used, e.g., for testing and debugging purposes.

> **Important**: this adapter is not yet finished and its documentation still has to be written. The plan is to finish everything by end of June, 2023

## Usage ##

Copy the contents of file [InMemoryStorageAdapter.js](./src/InMemoryStorageAdapter.js) into a `<script>` element and add it to the `<head>` section of your HTML document right after the one for GunDB itself.

Then, create your GunDB instance with the following options:

```
  const Gun = GUN(GUN({ localStorage:false, inMemory:true }))
```

Afterwards, work with your instance as usual - you should not recognize any difference except that GunDB will run much faster now.
