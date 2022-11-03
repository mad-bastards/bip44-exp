import HDKey from 'hdkey'
import { getPhrase } from './util.mjs';
import bip39 from 'bip39';
import { encode as bs58e, decode as bs58d } from 'bs58';
import bip44c from 'bip44-constants';
const assert = (await import('assert')).default;
import CoinKey from 'coinkey';
import coininfo from 'coininfo';



global.pp=function pp(val) { return JSON.stringify(val,null,2); };
global.log=function log(val) { console.log(val); };
global.dump=function dump(val) { return log(pp(val)); };

function Coin(sym){
  const info=coininfo(sym);
  if(info==null)
    return null;
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
const wallet = new Wallet('BTC','BCH','DOGE','ZEN');
console.log(wallet);

