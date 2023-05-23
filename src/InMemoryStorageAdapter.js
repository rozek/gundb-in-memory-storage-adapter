/**** (filtering) in-memory storage adapter ****/

  const InMemoryStorage = Object.create(null)

  GUN.on('create', function (Context) {        // do not use a "fat arrow" here!
    this.to.next(Context)

    const Filters = []

    let Options = Context.opt.inMemory
    switch (true) {
      case (Options === false):
        return                                       // adapter wasn't requested
      case (typeof Options === 'string'):
        Filters.push(Options)
        break
      case Array.isArray(Options):
        Options.forEach((Option) => {
          if (typeof Option === 'string') { Filters.push(Option) }
        })
    }

    function IdIsPermitted (Id) {
      if (Filters.length === 0) { return true }
        for (let i = 0, l = Filters.length; i < l; i++) {
          const Filter = Filters[i]
          if (Filter.endsWith('/')) {
            if (Id.startsWith(Filter)) { return true }
          } else {
            if (
              (Id === Filter) || Id.startsWith(Filter + '/')
            ) { return true }
          }
        }
      return false
    }

  /**** get - retrieve the contents of a given node ****/

    Context.on('get', function (WireMessage) {           // no "fat arrow" here!
      this.to.next(WireMessage)

      let DedupId = WireMessage['#']
      let LEX     = WireMessage.get
      let Soul    = (LEX == null ? undefined : LEX['#'])
      if (Soul == null) { return }

      if (! IdIsPermitted(Soul)) {                                // "fail fast"
        Context.on('in', { '@':DedupId, err:null, put:null })
        return
      }

      let Data = InMemoryStorage[Soul]              // fetches data from storage
      if (Data == null) {
        Context.on('in', { '@':DedupId, err:null, put:null })
      } else {
        let Key = LEX['.']
        if ((Key != null) && ! Object.plain(Key)) {
          Data = GUN.state.ify(
            {}, Key, GUN.state.is(Data,Key), Data[Key], Soul
          )
        }
      }

      Context.on('in', { '@':DedupId, ok:1, err:null, put:Data })
    })

  /**** put - patches the contents of a given node ****/

    Context.on('put', function (WireMessage) {           // no "fat arrow" here!
      this.to.next(WireMessage)

      let LEX     = WireMessage.put
      let Soul    = LEX['#'], Key  = LEX['.']
      let DedupId = WireMessage['#']
      let Ok      = WireMessage.ok || ''

      if (! IdIsPermitted(Soul)) {                                // "fail fast"
//      Context.on('in', { '@':DedupId, err:'undesired node id', ok:false })
        Context.on('in', { '@':DedupId, err:null, ok:false })
        return
      }

      InMemoryStorage[Soul] = GUN.state.ify(     // merges new data into storage
        InMemoryStorage[Soul], Key, LEX['>'], LEX[':'], Soul
      )

      Context.on('in', {                           // acknowledge put completion
        '@':DedupId, err:undefined, ok:true
      })
    })
  })

