const BigNumber = require('bignumber');
const BigInteger = BigNumber.BigInteger;

var num = new BigInteger("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBAAEDCE6AF48A03BBFD25E8CD0364140",16);
console.log(num.toString(16));
num *= 16;
console.log(num.toString(16));
