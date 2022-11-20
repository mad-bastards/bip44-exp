// noinspection SpellCheckingInspection

import cp from 'child_process';
if(!process.env.NODE_OPTIONS){
  process.env.NODE_OPTIONS='--openssl-legacy-provider';
  cp.execSync('node index.mjs',{stdio: 'inherit'});
  process.exit(0);
}
import * as gen from './walletGen.mjs';
const path = "m";///44'";///0h/0'/0/0";
process.env.PHRASE="abandon ".repeat(11)+"about";
try {
  var b = (""?true:false);
  b=("'"?true:false);
  const keys = await gen.getKeyPath(path);
  const hdks = await gen.getHDKeyPath(path);
  console.log(keys);
} catch ( err ) {
  console.log(err);
}

//   function parsePath(path){
//     let i=0;
//     if(path[i]==='m')
//       i++;
//     if(path[i]==='/')
//       i++;
//     while(i<path.length){
//       let idx=0;
//       assert(isDigit(path[i]));
//       while(isDigit(path[i])){
//         idx*=10;
//         idx+=
//       };
//     };
//   };
//   class Path {
//     constructor(path){
//       this.hard=[];
//       console.log(path[0]);
//       const re = /\/*([0-9]+'?)/; // /*/;
//       const parts = console.log(path.split(re));
//       console.log(parts);
//     }
//   }

//const path = new Path( "m/44'/0'/0'/0/0" );

//   const path = [
//     { idx: 44, hard: true, },
//     { idx: 0, hard: true, },
//     { idx: 0, hard: true, },
//     { idx: 0, hard: false, },
//     { idx: 0, hard: false, }
//   ];
//   
//   const keyStack=[];
//   for(let i=0;i<=path.length;i++){
//     let pub = key.privateKey;
//     pub=Buffer.from(pub).toString('hex');
//     console.log(xPath, pad(6,"prv"), pub);
//     key.xprv=key.privateExtendedKey;
//     console.log(xPath ,pad(6,"xprv"), key.xprv);
//     pub = key.publicKey;
//     pub=Buffer.from(pub).toString('hex');
//     console.log(xPath, pad(6,"pub"),pub);
//     key.xpub=key.publicExtendedKey;
//     console.log(xPath ,pad(6,"xpub"), key.xpub);
//     console.log(xPath, pad(6,"addr"), toAddr(key));
//     console.log("\n");
//     const item=path[i];
//     if(!item)
//       break;
//     const index=item.idx+(item.hard ? HARDENED_OFFSET : 0 );
//     const oPath=key.path;
//     keyStack.push(key);
//     key=key.deriveChild(index);
//     key.path=oPath+"/"+item.idx+(item.hard ? "'" : "");
//   }
//   keyStack.push(key);


//   const Coinomi = {
//   //     "BCH" : "qqqrq9706mttv5h8vvcw82ze63ua38y22y36798xn8",
//     "BTC" : "1JoP2wkKLTHk6GR1oUsVc7hJU1AXaTLLH7",
//   //     "DASH" : "XwYE6phFnaDJgJjD9bRigx4btc98tWw7dg",
//   //     "DOGE" : "DFeVnKxWT4pDf6sX15HYHtN9vEwbKuRoXr",
//   //     "LBC" : "lbc1q8pywc7k0s05mvzd4pl6kmp76d98map57cf3mqv",
//   //     "XMR" : "48Rq4Ga13UqgKSooN6EqpzDzroS1zUjyMTdUgeteup3ihYcb3gzeb8Xhx7q5j83wB5iEbgVqgsDJyLXAvNw6KiD19v6Pwi2",
//   //     "XRP" : "r4joJp9ZuDHJ1RJAd1bU84BnS7w7mHkXaP",
//   //     "ZEN" : "znXw56vq7n6q92gTkk1VJutWpJppXP84BQW"
//   };
//   
//   const chains={};
//   const accounts={}
//   
//   class Chain {
//     constructor(sym){
//       this.sym=sym;
//       this.versions=this.spec.versions;
//       chains[sym]=this;
//     }
//     get spec() {
//       return coinspec(this.sym);
//     };
//   }
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
//   class Account {
//     constructor(sym,hdkey){
//       const test={};
//       this.sym=sym;
//       this.hdkey=hdkey;
//       accounts[sym]=this;
//       console.log(hdkey.privateKey);
//     }
//     get chain() {
//       return chains[this.sym];
//     }
//     inspect() {
//       throw new Error("fuck");
//     };
//     p2pkhAddress(idx) {
//       var node=this.hdkey.deriveChild(idx);
//       var pkrip=hash160(node.publicKey);
//       var encBuf = Buffer.concat([Buffer.from('00','hex'),pkrip]);
//       return bs58check.encode(encBuf);
//     }
//     p2scrAddress(idx) {
//       var node=this.hdkey.deriveChild(idx);
//       var pkrip=hash160(node.publicKey);
//       var script=Buffer.concat([Buffer.from('0014','hex'),pkrip]);
//       pkrip=hash160(script);
//       var res=Buffer.concat([Buffer.from("05",'hex'),pkrip]);
//       return bs58check.encode(res);
//     }
//     bch32Address(idx) {
//       var node=this.hdkey.deriveChild(idx);
//       var pkrip=hash160(node.publicKey);
//       var bech32words = bech32.toWords(pkrip);
//       const words=new Uint8Array([0,...bech32words]);
//       return bech32.encode('bc',words);
//     }
//   }
//   
//   for(var sym in Coinomi)
//     new Chain(sym);
//   console.log(chains);
//   const path = [
//     { idx: 44, hard: true, },
//     { idx: 0, hard: true, },
//     { idx: 0, hard: true, },
//     { idx: 0, hard: false, }
//   ];
//   for(var sym in Coinomi) {
//     const chain=chains[sym];
//     const bip44 = chain.versions.bip44;
//     hdkey.path="m";
//     var node = hdkey;
//     node.xpub = node.extendedPublicKey;
//     node.xprv = node.extendedPrivateKey;
//     const nodes=[hdkey];
//     for(var i=0;i<path.length;i++){
//       const part=path[i];
//       const idx = ( part.hard ? 0x80000000 : 0 ) + part.idx;
//       const oldPath=node.path;
//       const oldNode=node;
//       node = node.deriveChild(idx);
//       node.parent+oldNode;
//       nodes.push(node);
//       node.path=oldPath+"/"+part.idx+(part.hard ? "'":"");
//     }
//     const account=new Account(sym,node);
//     console.log(node.publicKey);
//     var addr0 = node.deriveChild(0);
//     account.path=node.path+"/0";
//     account.pub=addr0.publicKey.toString('hex');
//     account.prv=addr0.privateKey.toString('hex');
//     console.log({
//       xprv: account.xprv,
//       xpub: account.xpub,
//       pub: account.pub,
//       prv: account.prv,
//       p2pkh0: account.p2pkhAddress(0),
//       bch320: account.bch32Address(0),
//       p2scr0: account.p2scrAddress(0),
//       p2pkh1: account.p2pkhAddress(1),
//       bch321: account.bch32Address(1),
//       p2scr1: account.p2scrAddress(1),
//       path: account.path,
//     });
//   }
