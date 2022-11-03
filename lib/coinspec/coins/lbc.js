// https://github.com/litecoin-project/litecoin/blob/master-0.10/src/chainparams.cpp

var common = {
  name: 'LBRY Credits',
  unit: 'LBC',
  messagePrefix: "\x18LBRYcrd Signed Message:\n",
}

var main = Object.assign({}, {
  hashGenesisBlock: '',
  port: 0,
  protocol: {
    magic: 0
  },
  bech32: '',
  seedsDns: [
    ''
  ],
  versions: {
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4,
    },
    bip44: 140,
    private: 0xb0,
    public: 0x30,
    scripthash: 0x7a
  }
}, common)


module.exports = {
  main //,
 //  test
}
