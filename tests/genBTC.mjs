import { getPhrase } from '../util.mjs';
import bip39 from 'bip39';
import  HDKey from 'hdkey';
var CoinKey = (await import('coinkey')).default;

var phrase = await getPhrase();
var seed = bip39.mnemonicToSeedSync(phrase);
console.log(seed.toString('hex'));

var hdkey = HDKey.fromMasterSeed(seed);
var child = hdkey.derive("m/44'/0'/0'/0/0");
console.log(child.privateKey.toString('hex'));

var ck = new CoinKey(child.privateKey);
console.log(ck.publicAddress);

