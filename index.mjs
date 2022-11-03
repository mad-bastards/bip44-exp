import HDKey from 'hdkey'
import { getPhrase } from './util.mjs';
import bip39 from 'bip39';
import { encode as bs58e, decode as bs58d } from 'bs58';
const assert = (await import('assert')).default;
import CoinKey from 'coinkey';
import coininfo from 'coininfo';

function bufferizeVersion (version) {
  if (typeof version === 'string') return hexStringToBuffer(version)
  if (typeof version === 'number') return beUIntToBuffer(version)
  throw new Error('invalid version type.')
}

// accepts hex string sequence with or without 0x prefix
function hexStringToBuffer (input) {
  var isValidRE = /^(0x)?([\dA-Fa-f]{2})+$/g
  if (!isValidRE.test(input)) throw new Error('invalid hex string.')
  return Buffer.from(input.slice(input.slice(0, 2) === '0x' ? 2 : 0), 'hex')
}

function beUIntToBuffer (num) {
  var length
  if (num === 0) length = 1
  else if (num > 0) length = Math.ceil((Math.log(num + 1) / Math.log(2)) / 8)
  var buf = Buffer.alloc(length)
  buf.writeUIntBE(num, 0, length)

  return buf
}

const Coinomi = {
  "BCH" : "qqqrq9706mttv5h8vvcw82ze63ua38y22y36798xn8",
  "BTC" : "1JoP2wkKLTHk6GR1oUsVc7hJU1AXaTLLH7",
  "DASH" : "XwYE6phFnaDJgJjD9bRigx4btc98tWw7dg",
  "DOGE" : "DFeVnKxWT4pDf6sX15HYHtN9vEwbKuRoXr",
  "LBC" : "lbc1q8pywc7k0s05mvzd4pl6kmp76d98map57cf3mqv",
  "XMR" : "48Rq4Ga13UqgKSooN6EqpzDzroS1zUjyMTdUgeteup3ihYcb3gzeb8Xhx7q5j83wB5iEbgVqgsDJyLXAvNw6KiD19v6Pwi2",
  "XRP" : "r4joJp9ZuDHJ1RJAd1bU84BnS7w7mHkXaP",
  "ZEN" : "znXw56vq7n6q92gTkk1VJutWpJppXP84BQW"
};

global.pp=function pp(val) { return JSON.stringify(val,null,2); };
global.log=function log(val) { console.log(val); };
global.dump=function dump(val) { return log(pp(val)); };

function Coin(sym){
  const info=coininfo(sym);
  if(info==null)
    throw new Error(`no coininfo for "${sym}"`);

  const versions=info.versions;

  this.sym=sym;
  this.versions=versions;
  this.bip44=versions.bip44;
  this.path=`m/44'/${this.bip44}'/0'/0`;
  this.acct=hdkey.derive(this.path);
  this.addrs=[];
  for(var i=0;i<3;i++){
    const child = this.acct.deriveChild(i);
    const coinKey = new CoinKey(child.privateKey,coininfo(sym));
    const addr = coinKey.publicAddress;
    this.addrs.push(addr);
  }
}
function Wallet(...syms){
  this.coins={};
  syms.forEach((sym)=>{
    this.coins[sym]=new Coin(sym);
  });
}

global.phrase= await getPhrase();
global.seed = bip39.mnemonicToSeedSync(phrase);
global.hdkey = HDKey.fromMasterSeed(seed)
global.keys=Object.keys;

const wallet = new Wallet('BCH','BTC',"DASH",'DOGE',
//"LBC","XMR","XRP",
  'ZEN');
console.log(wallet);

