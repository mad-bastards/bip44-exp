//   import bip39 from 'bip39';
// import cp from 'child_process';
// import {isNoE} from './util.mjs';
// import './util.mjs';
import assert from 'assert';
//import {isDecimalDigit} from "./lib/esutils/lib/code.js";

async function main() {
  async() => {
    const MASTER_SECRET = Buffer.from('Bitcoin seed', 'utf8')
    const HARDENED_OFFSET = 0x80000000;

    function isDigit(ch) {
      return !!ch.match(/^[0-9]/);
    }

    class Phrase {
      #entropy;

      constructor(phrase) {
        if (isBuffer(phrase))
          phrase = phrase.toString();
        if (isString(phrase))
          phrase = normalizeWords(phrase).split(/\s+/);
        if (!isArray(phrase)) {
          const type = whatIs(phrase);
          throw new Error("Expected Buffer, String, or Array of Words, got " + type);
        }
        this.#entropy = bip39.mnemonicToEntropy(phrase.join(" "));
      }

      getProp(key) {
        if (key === "array") {
          return this.getProp("string").split(/\s+/);
        } else if (key === "string") {
          return bip39.entropyToMnemonic(this.getProp("entropy"));
        } else if (key === "entropy") {
          return this.#entropy;
        }
      }

      dump() {
        const names = ["string", "array", "entropy"];
        console.log({names});
        let res;
        names.forEach(name => {
          if (res) {
            res = res + ",\n\t";
          } else {
            res = "{\n\t";
          }
          res = res + JSON.stringify(name);
          res = res + ": ";
          let val = this.getProp(name);
          val = JSON.stringify(val);
          res = res + val;
        });
        return res + "\n}\n";
      }
    }

    class Seed {
      seed;

      constructor(seed) {
        this.seed = seed;
      }

      static cache = {};

      static toKey(seed) {
        if (isBuffer(seed))
          seed = seed.toString();
        if (!seed.toString().startsWith("0x"))
          seed = "0x" + seed;
        return seed;
      }

      static fromCache(seed) {
        const key = this.toKey(seed)
        if (!this.cache[key])
          this.cache[key] = new Seed(seed);
        return this.cache[key];
      };

      static fromPhrase(phrase) {
        if (Object.getPrototypeOf(phrase) !== "Phrase")
          phrase = new Phrase(phrase);
        return this.fromCache(phrase.getProp("entropy"));
      }
    }

    class DerPath {
      parentPath;
      index;
      hard;

      constructor(path) {
        assert(path);
        path = path.replace(/^m?\/?/, "m/");
        path = path.replace(/\/$/, "");
        if (path === "m") {
          cache[path] = this;
        } else {

        }
      }

      static cache = {"m/": new DerPath()};

      static find(path) {
        if (!DerPath.cache[path]) {
          let res = /^(.*)\/(.*)$/.exec(path);
          console.log(this.find(res[1]));
        }
      }

      static parsePath(path) {
        return segs;
      }
    }

    let path = "m/";
    let derPath;
    while (path.length) {
      derPath = DerPath.find(path);
    }
  }

// let paths=[
//   "",
//   "m",
//   "/",
//   "m/",
//   "m/0",
//   "/0",
//   "0",
//   "m/1/2/3",
//   "m/1'/2'/3'",
//   "m/11/22/33",
//   "m/11'/22'/33'",
// ];
// for(let i=0;i<paths.length;i++){
//   console.log(DerPath.find(paths[i]));
// }
// global.srep=new RegExp("\s+")
// function brief(obj) {
//   let str=JSON.stringify(obj);
//   str=str.split(',').join("  ");
//   return str;
// }
// try {
//   console.log(brief(DerPath.parsePath("m/44'/0'/0'/0/0/")));
//   console.log(brief(DerPath.parsePath("44'/0'/5'/0/0")));
//   console.log(brief(DerPath.parsePath("m/44'/0'/144'/0/0")));
//   console.log(brief(DerPath.parsePath("m/44'/0'/5'/0/0")));
//   console.log(brief(DerPath.parsePath("/44'/0'/5'/0/0")));
// } catch ( err ) {
//   console.log(err);
// }

class Wallet {
  constructor(phrase, coins) {
    this.hint=phrase.shift();
    this.seed=Seed.fromPhrase(phrase);
    this.coins=coins;
  }
}




export async function getAbandonPhrase(len) {
  if(!len)
    len=12;
  return "abandon ".repeat(11)+"about";
}
export function normalizeWords(words){
  if(isNoE(words))
    return null;
  if(isString(words))
    words=words.trim().split(/\s+/);
  if(isArray(words))
    words=words.filter((word)=>!isNoE(word));
  return words.join(" ");
}
// export async function getPhrase() {
//   let phrase=await getEnvironmentPhrase();
//   phrase=phrase || await getCoinPagePhrase();
//   phrase=phrase || await getAbandonPhrase();
//   phrase=normalizeWords(phrase);
//   return phrase;
// }
export async function getCoinPagePhrase() {
  const cmd='cat $HOME/.coinpage/testkey.txt';
  const opt={ stderr: 'inherit', input: '' };
  try {
    return cp.execSync(cmd, opt).toString();
  } catch {
    return null;
  }
}
export async function getEnvironmentPhrase() {
  const phrase = process.env.PHRASE || null;
  if(phrase.toLowerCase() === "dante"){
    return getAbandonPhrase();
  } else {
    return phrase;
  }
}

//     static fromSeed(seed) {
//       const I = crypto.createHmac('sha512', MASTER_SECRET).update(seed).digest();
//       const privateKey = I.slice(0, 32);
//       const chainCode = I.slice(32);
//       return 
//       new HDNode(privateKey,chainCode);
//     }
//   }
//
//   export const HARDENED_OFFSET = 0x80000000;
//   class HDNode {
//     privateKey;
//     publicKey;
//     chainCode;
//     parent;
//     constructor(path,privateKey,chainCode,parent) {
//       this.privateKey=privateKey;
//       this.publicKey = Buffer.from(secp256k1.publicKeyCreate(this.privateKey, true))
//       this.chainCode=chainCode;
//       this.parentPath=parent.path;
//     }
//     deriveChild(index) {
//       let isHardened = index>=HARDENED_OFFSET;
//       let indexBuffer = Buffer.allocUnsafe(4);
//       indexBuffer.writeUInt32BE(index, 0);
//   
//       let data
//   
//       if (isHardened) { // Hardened child
//         assert(this.privateKey, 'Could not derive hardened child key')
//   
//         let pk = this.privateKey
//         let zb = Buffer.alloc(1, 0)
//         pk = Buffer.concat([zb, pk])
//   
//         // data = 0x00 || ser256(kpar) || ser32(index)
//         data = Buffer.concat([pk, indexBuffer])
//       } else { // Normal child
//         // data = serP(point(kpar)) || ser32(index)
//         //      = serP(Kpar) || ser32(index)
//         data = Buffer.concat([this.publicKey, indexBuffer])
//       }
//   
//       const I = crypto.createHmac('sha512', this.chainCode).update(data).digest();
//       let IL = I.slice(0, 32)
//       let IR = I.slice(32)
//   
//       const hd = new HDKey();
//   
//       assert (this.privateKey);
//       let privateKey;
//       {
//         // Private parent key -> private child key
//         // ki = parse256(IL) + kpar (mod n)
//         try {
//           privateKey = Buffer.from(secp256k1.privateKeyTweakAdd(Buffer.from(this.privateKey), IL))
//           //hd.privateKey =
//           // throw if IL >= n || (privateKey + IL) === 0
//         } catch (err) {
//           // In case parse256(IL) >= n or ki == 0, one should proceed with the next value for i
//           return this.deriveChild(index + 1)
//         }
//       }
//       return new HDNode(privateKey, IR, this, index);
//     }
//     static fromPhrase(phrase) {
//       return Seed.fromPhrase(phrase);
//     }
//     static fromPhrase(phrase) {
//       return this.fromMnemonic(phrase);
//     }
//     static fromMnemonic(phrase) {
//       if(isArray(phrase))
//         phrase=phrase.join(" ");
//       if(!isString(phrase))
//         phrase=phrase.toString();
//       const seed = bip39.mnemonicToSeedSync(phrase);
//       return this.fromSeed(seed);
//     }
//     get parent() {
//   
//     }
//     get depth() {
//       if(this.parent) {
//         return this.parent.depth+1;
//       } else {
//         return 0;
//       };
//     };
//   }
//   
//   export async function getRootKey()
//   {
//     const phrase = await getPhrase();
//     if (isNoE(phrase))
//       return null;
//     return HDNode.fromPhrase(phrase);
//   }
//   export async function getHDKeyPath(path){
//     const seed = bip39.mnemonicToSeedSync(await getPhrase());
//     const indexes=parsePath(path);
//     let key = HDKey.fromMasterSeed(seed);
//     const keys = [ key ];
//     for(const index of indexes){
//       key=key.deriveChild(index);
//       keys.push(key);
//     }
//     return keys;
//   }
//   export async function getKeyPath(path){
//     const indexes=parsePath(path);
//     let key = await getRootKey();
//     const keys = [ key ];
//     for(const index of indexes){
//       key=key.deriveChild(index);
//       keys.push(key);
//     }
//     return keys;
//   }
//   
//   function sha256(buf) {
//     if(typeof(buf)==='string')
//       buf=Buffer.from(buf,'hex');
//     return createHash('sha256').update(buf).digest();
//   }
//   function ripemd160(buf){
//     if(typeof(buf)==='string')
//       buf=Buffer.from(buf,'hex');
//     return createHash('ripemd160').update(buf).digest();
//   };
//   function hash160(buf){
//     return ripemd160(sha256(buf));
//   };
//   function p2pkhAddress(hdkey,idx) {
//     let node=hdkey.deriveChild(idx);
//     let pkrip=hash160(node.publicKey);
//     let encBuf = Buffer.concat([Buffer.from('00','hex'),pkrip]);
//     return bs58check.encode(encBuf);
//   }
//   function p2scrAddress(hdkey,idx) {
//     let node=hdkey.deriveChild(idx);
//     let pkrip=hash160(node.publicKey);
//     let script=Buffer.concat([Buffer.from('0014','hex'),pkrip]);
//     pkrip=hash160(script);
//     let res=Buffer.concat([Buffer.from("05",'hex'),pkrip]);
//     return bs58check.encode(res);
//   }
//   function bch32Address(hdkey,idx) {
//     let node=hdkey.deriveChild(idx);
//     let pkrip=hash160(node.publicKey);
//     let bech32words = bech32.toWords(pkrip);
//     const words=new Uint8Array([0,...bech32words]);
//     return bech32.encode('bc',words);
//   }
// const hexToMnemonic=(val) => bip39.entropyToMnemonic(Buffer.from(val, 'hex'));
//
//
// let phrases=[
//   getAbandonPhrase(),
//   getAbandonPhrase(24),
//     "name depth rent broken innocent cargo "+
//     "slice cactus exhaust wealth arrive nuclear "+
//     "rescue social boss inside nuclear owner "+
//     "cradle cargo cradle cargo cradle abandon ",
//   getEnvironmentPhrase(),
//   getCoinPagePhrase(),
//   hexToMnemonic( '0123456789abcdeffedcba9876543210'.repeat(2) )
// ];
// console.log(phrases);
// let count=0;
// const map = {};
// for(let i=0;i<phrases.length;i++){
//   try {
//     const phrase=await phrases[i];
//     const seed=Seed.fromPhrase(phrase);
//     map[phrase]=seed;
//   } catch ( err ) {
//     console.log("catch: "+(count++));
//     console.log(err);
//   }
// }
// console.log(map);
// console.log("Done");
// //
// //
// //
// // phrases=phrases.filter(phrase=>phrase!=null);
// // phrases=phrases.map(async phrase=>{return normalizeWords(phrase).then(w=>w)});
// // let temp=[];
