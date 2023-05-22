/**** in-memory storage adapter ****/

  const InMemoryStorage = Object.create(null)

  GUN.on('create', function (Context) {        // do not use a "fat arrow" here!
    this.to.next(Context)
    
    if (Context.opt.inMemory != true) { return }     // adapter wasn't requested
    
  /**** get - retrieve the contents of a given node ****/
    
    Context.on('get', function (WireMessage) {           // no "fat arrow" here!
      this.to.next(WireMessage)
      
      let LEX  = WireMessage.get
      let Soul = (LEX == null ? undefined : LEX['#'])
      if (Soul == null) { return }
      
      let Data = InMemoryStorage[Soul]              // fetches data from storage
      if (Data != null) {
        let Key = LEX['.']
        if ((Key != null) && ! Object.plain(Key)) {
          Data = GUN.state.ify(
            {}, Key, GUN.state.is(Data,Key), Data[Key], Soul
          )
        }
      }
      
      GUN.on.get.ack(WireMessage,Data)
    })
        
  /**** put - patches the contents of a given node ****/

    Context.on('put', function (WireMessage) {           // no "fat arrow" here!
      this.to.next(WireMessage)

      let LEX  = WireMessage.put
      let Soul = LEX['#'], Key  = LEX['.']
      let Id   = WireMessage['#']
      let Ok   = WireMessage.ok || ''

      InMemoryStorage[Soul] = GUN.state.ify(     // merges new data into storage
        InMemoryStorage[Soul], Key, LEX['>'], LEX[':'], Soul
      )
      
      Context.on('in', {                           // acknowledge put completion
        '@':Id, err:undefined, ok:1
      })
    })
  })
