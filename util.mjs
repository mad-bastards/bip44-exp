const cp=await import('child_process');
const execSync=cp.execSync;
import Console from 'console'

const child_process=await import('child_process');
export async function getPhrase() {
  //const child=execSync('gpg -d < $HOME/.coinpage/cred.txt.asc');
  const child=execSync('cat < $HOME/.coinpage/testkey.txt');
  let phrase = child.toString();
  phrase=phrase.split(/\s+/).join(" ").trim();
  return phrase;
}

global.typeOf=function typeOf(value) {
  if (value === null) {
    return "null";
  }
  const baseType = typeof value;
    // Primitive types
  if (!["object", "function"].includes(baseType)) {
    return baseType;
  }

  // Symbol.toStringTag often specifies the "display name" of the
  // object's class. It's used in Object.prototype.toString().
  const tag = value[Symbol.toStringTag];
  if (typeof tag === "string") {
    return tag;
  }

  // If it's a function whose source code starts with the "class" keyword
  if (
    baseType === "function" &&
    Function.prototype.toString.call(value).startsWith("class")
  ) {
    return "class";
  }

  // The name of the constructor; for example `Array`, `GeneratorFunction`,
  // `Number`, `String`, `Boolean` or `MyCustomClass`
  const className = value.constructor.name;
  if (typeof className === "string" && className !== "") {
    return className;
  }

  // At this point there's no robust way to get the type of value,
  // so we use the base implementation.
  return baseType;
}
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
global.pp=function pp(...obj){
  return JSON.stringify(obj, null, 2);
}
