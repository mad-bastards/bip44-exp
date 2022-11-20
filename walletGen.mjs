import assert from 'assert';
import './util.mjs';
import util from 'node:util';


class DerPathBody {
  #index;
  #prime;
  #ppath;
  #path;
  get index() {
    return this.#index;
  }
  get prime() {
    return this.#prime;
  }
  get ppath() {
    return this.#ppath;
  }
  constructor(path) {
    assert(path);
    this.#path=path;
    let pparts = DerPathBody.buildPath(path);
    this.#ppath=pparts.parent.path;
    this.#index=pparts.child;
    this.#prime=pparts.prime;
  }
  static cache = {};
  static find(path) {
    if(path) {
      return DerPathBody.cache[path] || new DerPathBody(path);
    } else {
      return null;
    }
  };
  static dump() {
    const cache=this.cache;
    const keys = Object.keys(cache).sort();
    console.log("dumping DerCache");
    for(let i=0;i<keys.length;i++){
      console.log(keys[i]);
    }
    console.log("dumped");
  }
  static buildPath(path) {
    const pathRegex = new RegExp("^(.*?)/?([0-9]*?)('?)$");
    const results = pathRegex.exec(path);
    let [ fuck, parent,child,prime ] = results;
    if(child===""){
      [parent,child]=[child,parent];
    }
    if(parent){
      parent=this.find(parent);
      if(parent==null){
        parent=new DerPath(parent);
      }
    }
    return { parent, child, prime };
  }
}
class DerPath {
  #body;
  #parent;
  #full;
  #path;
  constructor(path){
    this.#path=path;
    this.#body=DerPathBody.find(path);
    this.#parent=this.#body.parent;
    this.#full=this.full;
  }
  get ppath() {
    return this.#body.ppath;
  }
  get full() {
    if(!this.#full)
      this.#full=[ this.#body.index, this.#body.prime ].join("");
    return this.#full;
  }
  get parent() {
    if(!this.#parent) {
      this.#parent=new DerPath(this.ppath);
    }
    return this.#parent;
  }
  get path() {
    if(!this.#path) {
      let res = this.full;
      let ppath = this.ppath;
      if(ppath)
        res =[ this.ppath, res ].join("/");
      this.#path=res;
    }
    return this.#path;
  }
  toString() {
    return "DerBody{ "+this.path+" }";
  }
  get depth() {
    if(this.path==="m"){
      return 0;
    } else {
      return this.parent.depth+1;
    }
  }
  [util.inspect.custom]() {
    const res={};
    res.path=this.path;
    res.ppath=this.ppath;
    res.depth=this.depth;
    res.parentFingerprint=this.parentFingerprint;
    return res;
  }
}
// get path() {
//   const full=[this.index,this.hard].join("");
//   const parent=this.parent;
//   if(parent){
//     return [parent.path,full].join("/");
//   } else {
//     return full;
//   }
// }
//
// async function main() {
//   const pathRegex = new RegExp("^(.*)(/?)([^/]*)('?)$");
//   const MASTER_SECRET = Buffer.from('Bitcoin seed', 'utf8')
//   const HARDENED_OFFSET = 0x80000000;
//   function isDigit(ch) {
//     return !!ch.match(/^[0-9]/);
//   }
//   class Phrase {
//     #entropy;
//     constructor(phrase) {
//       if (isBuffer(phrase))
//         phrase = phrase.toString();
//       if (isString(phrase))
//         phrase = normalizeWords(phrase).split(/\s+/);
//       if (!isArray(phrase)) {
//         const type = whatIs(phrase);
//         throw new Error("Expected Buffer, String, or Array of Words, got " + type);
//       }
//       this.#entropy = bip39.mnemonicToEntropy(phrase.join(" "));
//     }
//     getProp(key) {
//       if (key === "array") {
//         return this.getProp("string").split(/\s+/);
//       } else if (key === "string") {
//         return bip39.entropyToMnemonic(this.getProp("entropy"));
//       } else if (key === "entropy") {
//         return this.#entropy;
//       }
//     }
//     dump() {
//       const names = ["string", "array", "entropy"];
//       console.log({names});
//       let res;
//       names.forEach(name => {
//         if (res) {
//           res = res + ",\n\t";
//         } else {
//           res = "{\n\t";
//         }
//         res = res + JSON.stringify(name);
//         res = res + ": ";
//         let val = this.getProp(name);
//         val = JSON.stringify(val);
//         res = res + val;
//       });
//       return res + "\n}\n";
//     }
//   }
//   class Seed {
//     seed;
//     constructor(seed) {
//       this.seed = seed;
//     }
//     static cache = {};
//     static toKey(seed) {
//       if (isBuffer(seed))
//         seed = seed.toString();
//       if (!seed.toString().startsWith("0x"))
//         seed = "0x" + seed;
//       return seed;
//     }
//     static fromCache(seed) {
//       const key = this.toKey(seed)
//       if (!this.cache[key])
//         this.cache[key] = new Seed(seed);
//       return this.cache[key];
//     };
//     static fromPhrase(phrase) {
//       if (Object.getPrototypeOf(phrase) !== "Phrase")
//         phrase = new Phrase(phrase);
//       return this.fromCache(phrase.getProp("entropy"));
//     }
//     get depth() {
//       if(parent==null) {
//         return 0;
//       } else {
//         return 1 + this.parent.depth;
//       }
//     }
//   }
//   DerPath.dump();
//   DerPath.find("m/44'/0'/0'/0/0");
//   DerPath.dump();
//   DerPath.find("m/44'/0'/4'/4/4");
//   DerPath.dump();
//   DerPath.find("m/44'/0'/4'/0/0");
// }
// main().catch(console.error);
// // let paths=[
// //   "",
// //   "m",
// //   "/",
// //   "m/",
// //   "m/0",
// //   "/0",
// //   "0",
// //   "m/1/2/3",
// //   "m/1'/2'/3'",
// //   "m/11/22/33",
// //   "m/11'/22'/33'",
// // ];
// // for(let i=0;i<paths.length;i++){
// //   console.log(DerPath.find(paths[i]));
// // }
// // global.srep=new RegExp("\s+")
// // function brief(obj) {
// //   let str=JSON.stringify(obj);
// //   str=str.split(',').join("  ");
// //   return str;
// // }
// // try {
// //   console.log(brief(DerPath.parsePath("m/44'/0'/0'/0/0/")));
// //   console.log(brief(DerPath.parsePath("44'/0'/5'/0/0")));
// //   console.log(brief(DerPath.parsePath("m/44'/0'/144'/0/0")));
// //   console.log(brief(DerPath.parsePath("m/44'/0'/5'/0/0")));
// //   console.log(brief(DerPath.parsePath("/44'/0'/5'/0/0")));
// // } catch ( err ) {
// //   console.log(err);
// // }
// class Wallet {
//   constructor(phrase, coins) {
//     this.hint=phrase.shift();
//     this.seed=Seed.fromPhrase(phrase);
//     this.coins=coins;
//   }
// }
// async function getAbandonPhrase(len) {
//   if(!len)
//     len=12;
//   return "abandon ".repeat(11)+"about";
// }
// function normalizeWords(words){
//   if(isNoE(words))
//     return null;
//   if(isString(words))
//     words=words.trim().split(/\s+/);
//   if(isArray(words))
//     words=words.filter((word)=>!isNoE(word));
//   return words.join(" ");
// }
// // async function getPhrase() {
// //   let phrase=await getEnvironmentPhrase();
// //   phrase=phrase || await getCoinPagePhrase();
// //   phrase=phrase || await getAbandonPhrase();
// //   phrase=normalizeWords(phrase);
// //   return phrase;
// // }
// async function getCoinPagePhrase() {
//   const cmd='cat $HOME/.coinpage/testkey.txt';
//   const opt={ stderr: 'inherit', input: '' };
//   try {
//     return cp.execSync(cmd, opt).toString();
//   } catch {
//     return null;
//   }
// }
// async function getEnvironmentPhrase() {
//   const phrase = process.env.PHRASE || null;
//   if(phrase.toLowerCase() === "dante"){
//     return getAbandonPhrase();
//   } else {
//     return phrase;
//   }
// }



// Regular expression testing, this should go in another file.
// let res;
// function checkRe(text) {
//   text=text.replace(/\/$/,"");
//   text=text.replace(/^m?\/?/,"m/");
//   res = pathRegex.exec(text);
//   res.shift();
//   console.log(res);
//   return res;
// }
const paths=[
  // "m/44'/0'/0'/0/0",
  // "m/44'/0'/0'/0/",
  // "m/44'/0'/0'/0",
  // "m/44'/0'/0'",
  // "m/44'/0'/0",
  "m/44'/0'/",
  // "m/44'/0'",
  // "m/44'/0",
  // "m/44'",
  // "m",
];
const derPaths = paths.map(path=>{
  const derPath =  new DerPath(path);
  console.log({build: derPath });
  return derPath;
});
console.log(whatIs(derPaths));
console.log(derPaths);

// const parts=paths.map(path=>checkRe(path));
// console.log(parts);
// process.exit(0);
