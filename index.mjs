import {getPhrase} from './util.mjs';
import bip39 from 'bip39';
import CoinKey from 'coinkey';
import HDKey from 'hdkey'
import coininfo from "coininfo";



const list = ['BTC'];//, 'BCH', 'DOGE', 'ZEN'];

class Chain {
    constructor(sym) {
        this.sym = sym;
    }

    getInfo() {
        return coinInfo(this.sym);
    }

    getVersions() {
        return this.getInfo().versions;
    }

    getBip44() {
        return this.getVersions().bip44;
    }

    getPath() {
        const parts = ['m', "44'", null, "0'", "0'"];
        parts[2] = this.getBip44();
        return parts.join('/');
    }
}
const chains={};
chains["BTC"]=new Chain("BTC");
chains["BCH"]=new Chain("BCH");

class Coin {
    constructor(chain) {
        const seed = bip39.mnemonicToSeedSync(phrase).toString("hex");
        const hdkey = HDKey.fromMasterSeed(seed);

        this.chain=chain;
        this.addrs = [];
        for (let i = 0; i < 4; i++) {
            this.addrs.push(this.getAddress(i));
        }
    }

    getChain() {
        return chains[this.sym];
    }

    getBip32ExtendedKeys() {
        const data={};
        data.chain = this.getChain();
        data.path = data.chain.getPath();
        return hdkey.derive(data.path);
    }

    getAddress(idx) {
        const extKeys = this.getBip32ExtendedKeys();
        const child = extKeys.deriveChild(idx)
        const coinKey = new CoinKey(child.privateKey, coinInfo(this.sym));
        return coinKey.publicAddress;
    }
}

class Wallet {
    constructor(hdkey) {
        this.hdkey=hdkey;
    }
}

const phrase = await getPhrase();
const seed = bip39.mnemonicToSeedSync(phrase).toString("hex");
const hdkey = HDKey.fromMasterSeed(seed);
const wallet = new Wallet(hdkey);
console.log(wallet);


//coins[sym] = new Coin(sym);
// coins[sym] = new Coin(sym);
//const wallet = new Wallet(coins);
