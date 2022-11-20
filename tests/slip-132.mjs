#!/usr/bin/nodejs

import { execSync } from 'child_process';
function checkOptions(){
  var options=process.env.NODE_OPTIONS;
  if(options==null)
    options="";
  options=options.split(/\s+/);
  for(var i=0;i<options.length;i++){
    if(options[i] === '--openssl-legacy-provider'){
      return;
    };
  };
  options.push("--openssl-legacy-provider");
  process.env.NODE_OPTIONS=options.join(" ");
  execSync(process.argv.join(" "),{stdio: 'inherit'});
  process.exit(0);
}
checkOptions();
import { getPhrase } from '../util.mjs';
import bip39 from 'bip39';
import  HDKey from 'hdkey';
import { vector } from './slip-132-vector.mjs';

console.log(vector);
async function main() {
  var CoinKey = (await import('coinkey')).default;

  var phrase = vector.mnemonic;
  console.log(phrase);
  var seed = bip39.mnemonicToSeedSync(phrase);
  console.log(seed.toString('hex'));

  var hdkey = HDKey.fromMasterSeed(seed);
  var data = vector.data;
  for(var i=0;i<data.length;i++){
    const item=data[i];
    var child = hdkey.derive(item.path+"/0/0");
    var ck = new CoinKey(child.privateKey);
    var addr=ck.publicAddress;
    var want=item['add0'];
    console.log({addr,want});
  };
}




await main();
