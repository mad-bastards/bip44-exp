import HDKey from 'hdkey'
import { getPhrase } from './util.mjs';
import bip39 from 'bip39';
import { encode as bs58e, decode as bs58d } from 'bs58';
const assert = (await import('assert')).default;
import CoinKey from 'coinkey';
import coininfo from 'coininfo';
import bip44c from 'bip44-constants';



global.pp=function pp(val) { return JSON.stringify(val,null,2); };
global.log=function log(val) { console.log(val); };
global.dump=function dump(val) { return log(pp(val)); };

global.phrase= await getPhrase();
global.seed = bip39.mnemonicToSeedSync(phrase);
global.hdkey = HDKey.fromMasterSeed(seed)
const ci={};
function Coin(sym){
  const info=coininfo(sym);
  if(info==null)
    return null;
  const versions=info.versions;

  this.sym=sym;
  this.versions=versions;
  this.bip44=versions.bip44;
  this.path=`m/44'/${this.bip44}'/0'/0`;
  this.root=hdkey.derive(this.path);
  this.addrs=[];
  for(var i=0;i<3;i++){
    const child = this.root.deriveChild(i);
    this.addrs.push(new CoinKey(child.privateKey,coininfo(sym)).publicAddress);
  };
}
function Wallet(...syms){
  this.coins={};
  syms.forEach((sym)=>{
    this.coins[sym]=new Coin(sym);
  });
}
global.keys=Object.keys;
dump(new Wallet('BTC','BCH','DOGE','ZEN'));

