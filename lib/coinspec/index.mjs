import fs from 'fs';
import assert from 'assert';
import * as crypto from 'crypto';
import * as bs58 from 'bs58';

const base58 = bs58;
const createHash = crypto.createHash;


// annoyingly, this is for browserify
//var coins = JSON.parse(fs.readFileSync('./lib/coinspec/coinspec.json'));

var supportedCoins = {}

export const coins = [
  {
    "hashGenesisBlock": "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
    "port": 8333,
    "portRpc": 8332,
    "protocol": {
      "magic": 3908297187
    },
    "seedsDns": [
      "seed.bitcoinabc.org",
      "seed-abc.bitcoinforks.org",
      "btccash-seeder.bitcoinunlimited.info",
      "seed.bitprim.org",
      "seed.deadalnix.me",
      "seeder.criptolayer.net"
    ],
    "versions": {
      "bip32": {
        "private": 76066276,
        "public": 76067358
      },
      "bip44": 145,
      "private": 128,
      "public": 0,
      "scripthash": 5
    },
    "name": "BitcoinCash",
    "per1": 100000000,
    "unit": "BCH"
  },
  {
    "hashGenesisBlock": "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
    "port": 8333,
    "portRpc": 8332,
    "protocol": {
      "magic": 3652501241
    },
    "bech32": "bc",
    "seedsDns": [
      "seed.bitcoin.sipa.be",
      "dnsseed.bluematt.me",
      "seed.bitcoinstats.com",
      "seed.bitcoin.jonasschnelli.ch",
      "seed.btc.petertodd.org",
      "seed.bitcoin.sprovoost.nl",
      "dnsseed.emzy.de"
    ],
    "versions": {
      "bip32": {
        "private": 76066276,
        "public": 76067358
      },
      "bip44": 0,
      "private": 128,
      "public": 0,
      "scripthash": 5
    },
    "name": "Bitcoin",
    "per1": 100000000,
    "unit": "BTC",
    "messagePrefix": "\u0018Bitcoin Signed Message:\n"
  },
  {
    "hashGenesisBlock": "00000ffd590b1485b3caadc19b22e6379c733355108f107a430458cdf3407ab6",
    "port": 9999,
    "portRpc": 9998,
    "protocol": {
      "magic": 3177909439
    },
    "seedsDns": [
      "dash.org",
      "dnsseed.dash.org",
      "dashdot.io",
      "dnsseed.dashdot.io",
      "masternode.io",
      "dnsseed.masternode.io",
      "dashpay.io",
      "dnsseed.dashpay.io"
    ],
    "versions": {
      "bip32": {
        "private": 76066276,
        "public": 76067358
      },
      "bip44": 5,
      "private": 204,
      "public": 76,
      "scripthash": 16
    },
    "name": "Dash",
    "unit": "DASH"
  },
  {
    "hashGenesisBlock": "1a91e3dace36e2be3bf030a65679fe821aa1d6ef92e7c9902eb318182c355691",
    "port": 22556,
    "protocol": {
      "magic": 3233857728
    },
    "seedsDns": [
      "seed.multidoge.org",
      "seed2.multidoge.org"
    ],
    "versions": {
      "bip32": {
        "private": 49988504,
        "public": 49990397
      },
      "bip44": 3,
      "private": 158,
      "public": 30,
      "scripthash": 22
    },
    "name": "Dogecoin",
    "unit": "DOGE"
  },
  {
    "hashGenesisBlock": "",
    "port": 0,
    "protocol": {
      "magic": 0
    },
    "bech32": "",
    "seedsDns": [
      ""
    ],
    "versions": {
      "bip32": {
        "private": 76066276,
        "public": 76067358
      },
      "bip44": 140,
      "private": 176,
      "public": 48,
      "scripthash": 122
    },
    "name": "LBRY Credits",
    "unit": "LBC",
    "messagePrefix": "\u0018LBRYcrd Signed Message:\n"
  },
  {
    "hashGenesisBlock": "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
    "port": 8333,
    "portRpc": 8332,
    "protocol": {
      "magic": 3652501241
    },
    "bech32": "bc",
    "seedsDns": [
      "seed.bitcoin.sipa.be",
      "dnsseed.bluematt.me",
      "seed.bitcoinstats.com",
      "seed.bitcoin.jonasschnelli.ch",
      "seed.btc.petertodd.org",
      "seed.bitcoin.sprovoost.nl",
      "dnsseed.emzy.de"
    ],
    "versions": {
      "bip32": {
        "private": 76066276,
        "public": 76067358
      },
      "bip44": 0,
      "private": 128,
      "public": 0,
      "scripthash": 5
    },
    "name": "Monero",
    "per1": 100000000,
    "unit": "XMR",
    "messagePrefix": "\u0018Bitcoin Signed Message:\n"
  },
  {
    "hashGenesisBlock": "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
    "port": 0,
    "portRpc": 0,
    "protocol": {
      "magic": 0
    },
    "bech32": "",
    "seedsDns": [
      ""
    ],
    "versions": {
      "bip32": {
        "private": 76066276,
        "public": 76067358
      },
      "bip44": 144,
      "private": 128,
      "public": 0,
      "scripthash": 5
    },
    "name": "Ripple",
    "per1": 0,
    "unit": "XRP"
  },
  {
    "hashGenesisBlock": "00040fe8ec8471911baa1db1266ea15dd06b4a8a5c453883c000b031973dce08",
    "port": 8233,
    "portRpc": 8232,
    "protocol": {
      "magic": 1680337188
    },
    "seedsDns": [
      "dnsseed.z.cash",
      "dnsseed.str4d.xyz",
      "dnsseed.znodes.org"
    ],
    "versions": {
      "bip32": {
        "private": 76066276,
        "public": 76067358
      },
      "bip44": 121,
      "private": 128,
      "public": 8329,
      "scriptHash": 8342
    },
    "name": "Horizen",
    "unit": "ZEN",
    "messagePrefix": "\u0018Zcash Signed Message:\n"
  }
];

coins.forEach(function (coin) {
  var unit = coin.unit.toLowerCase()
  var name = coin.name.toLowerCase()

  coin.address=address.bind(coin);

  coin.testnet = false
  supportedCoins[unit] = coin
  supportedCoins[name] = coin
})

export function coinspec (input) {
  var coin = input.toLowerCase()

  if (!(coin in supportedCoins)) {
    return null
  } else {
    return supportedCoins[coin]
  }
}

function bufferizeVersion (num) {
  var length
  if (num === 0) length = 1
  else if (num > 0) length = Math.ceil((Math.log(num + 1) / Math.log(2)) / 8)
  var buf = Buffer.alloc(length)
  buf.writeUIntBE(num, 0, length)

  return buf
}
function sha256x2 (buffer) {
  var sha = createHash('sha256').update(buffer).digest();
  return createHash('sha256').update(sha).digest();
}
function encode (payload, version) {
  if (Array.isArray(payload) || payload instanceof Uint8Array) {
    payload = new Buffer(payload)
  }
  if (payload==null){
    payload=Buffer.from("123123123123123123",'hex');
  };

  var buf
  if (version != null) {
    if (typeof version === 'number') {
      version = new Buffer([version])
    }
    buf = Buffer.concat([version, payload])
  } else {
    buf = payload
  }

  var checksum = sha256x2(buf).slice(0, 4)
  var result = Buffer.concat([buf, checksum])
  return base58.encode(result)
}

function decode (base58str, version) {
  var arr = base58.decode(base58str)
  var buf = new Buffer(arr)
  var versionLength

  if (version == null) {
    versionLength = 0
  } else {
    if (typeof version === 'number') version = new Buffer([version])

    versionLength = version.length
    var versionCompare = buf.slice(0, versionLength)
    if (versionCompare.toString('hex') !== version.toString('hex')) {
      throw new Error('Invalid version')
    }
  }

  var checksum = buf.slice(-4)
  var endPos = buf.length - 4
  var bytes = buf.slice(0, endPos)

  var newChecksum = sha256x2(bytes).slice(0, 4)
  if (checksum.toString('hex') !== newChecksum.toString('hex')) {
    throw new Error('Invalid checksum')
  }

  return bytes.slice(versionLength)
}

function address(privateAddress){
  var bufVersion = bufferizeVersion(this.versions.public)
  return encode(this.pubKeyHash, bufVersion)
};

coins.forEach(function (coin) {
  supportedCoins[coin.name.toLowerCase()] = coin
})

function toBitcoinJS () {
  return Object.assign({}, this, {
    messagePrefix: this.messagePrefix || ('\x19' + this.name + ' Signed Message:\n'),
    bech32: this.bech32,
    bip32: {
      public: (this.versions.bip32 || {}).public,
      private: (this.versions.bip32 || {}).private
    },
    pubKeyHash: this.versions.public,
    scriptHash: this.versions.scripthash,
    wif: this.versions.private,
    dustThreshold: null // TODO
  })
}

function toBitcore () {
  // reverse magic
  var nm = Buffer.allocUnsafe(4)
  nm.writeUInt32BE(this.protocol ? this.protocol.magic : 0, 0)
  nm = nm.readUInt32LE(0)

  return Object.assign({}, this, {
    name: this.testnet ? 'testnet' : 'livenet',
    alias: this.testnet ? 'testnet' : 'mainnet',
    pubkeyhash: this.versions.public,
    privatekey: this.versions.private,
    scripthash: this.versions.scripthash,
    xpubkey: (this.versions.bip32 || {}).public,
    xprivkey: (this.versions.bip32 || {}).private,
    networkMagic: nm,
    port: this.port,
    dnsSeeds: this.seedsDns || []
  })
}
