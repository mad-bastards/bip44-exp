const cp=await import('child_process');
const execSync=cp.execSync;
import * as util from 'util';
import Console from 'node:console'

global.whatIs=function whatIs(value) {
  return Object.prototype.toString.call(value)
      .replace(whatIs.regExp, '$1')
      .toLowerCase();
}
whatIs.regExp=new RegExp(/^\[object\s+([a-z]+)]$/,'i');
Object.prototype.whatIs=function whatIs(){
  return global.whatIs(this);
};
global.pp=(obj)=>{JSON.stringify(obj,null,2)};
global.isString=(obj)=>typeof(obj)==='string';
global.isArray=(obj)=>Array.isArray(obj);
global.isBuffer=(obj)=>util.isBuffer(obj);
global.isDate=(obj)=>util.types.isDate(obj);
global.isPromise=util.types.isPromise;
global.enPassant=function enPassant(obj,toDo){
  toDo(obj);
  return obj;
}
export  function isNoE(val){
  if(val==null)
    return true;
  if(isArray(val))
    return val.length===0;
  if(isString(val))
    return val.length===0;
  if(typeof(val)==='undefined')
    return true;
  return isNoE(val.toString());
}
global.isNoE=isNoE;

global.stringify = function (child) {
  if(child==null)
    return null;
  else
    return child.toString();
}

global.pad=function pad(len,str){
  if(str.length>len){
    str = str.slice(0,len-1);
  } else {
    str = str.padEnd(len-1)+" ";
  }
  return str;
}
global.firstWord=function firstWord(str) {
  let idx=str.indexOf(' ');
  console.log(str.substring(0,idx));
  return str;
}
export function typeOf(value) {
  if (value === null)
    return "null";
  
  const baseType = typeof value;
  
  if (!["object", "function"].includes(baseType))
    return baseType;

  // Symbol.toStringTag often specifies the "display name" of the
  // object's class. It's used in Object.prototype.toString().
  const tag = value[Symbol.toStringTag];
  if (typeof tag === "string")
    return tag;

  // If it's a function whose source code starts with the "class" keyword
  if ( baseType === "function" && Function.prototype.toString.call(value).startsWith("class"))
    return "class";

  // The name of the constructor; for example `Array`, `GeneratorFunction`,
  // `Number`, `String`, `Boolean` or `MyCustomClass`
  const className = value.constructor.name;
  if (typeof className === "string" && className !== "")
    return className;

  // At this point there's no robust way to get the type of value,
  // so we use the base implementation.
  return baseType;
}
Object.prototype.typeOf=typeOf;
console=new Console.Console({
  stdout: process.stdout,
  stderr: process.stderr,
  inspectOptions: {
    depth: 10,
    showProxy: true,
    compact: false,
    sorted: true
  }
});
global.console=console
global.tp=function tp(...obj){
  return JSON.stringify(obj);
}
global.pp=function pp(...obj){
  return JSON.stringify(obj, null, 2);
}
