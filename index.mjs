// noinspection SpellCheckingInspection

import * as gen from './walletGen.mjs';
const path = "m/44'/0'/0'/0";//process.env.DERPATH;
try {
  const keys = await gen.getKeyPath(path);
  const last = keys[keys.length-1];
  const data = {};
  [ "privateKey", "publicKey", "chainCode", "depth" ] .forEach(key=>{data[key]=last[key]});
  console.log(last.getP2PKH(0));
} catch ( err ) {
  console.log(err);
}
