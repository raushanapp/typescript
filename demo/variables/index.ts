/* eslint-disable */

const courseName = "typescript";
const courseName1 = "typescript";
const courseName2 = `typescript`;

const amount = 10;
const fraction = 10.5;
const oneThousand = 1e3;
const allPermissions = 0o777;
const hexByte = 0xff;
const binary = 0b0100001;
const bigInt = 9000n;
const yes = true;
const no = false;

//  complete missing
const missing = undefined;
//  we know it's missing
const empty = null;

let someNum = 0;
someNum = 1;
someNum = 2;

//  let someNum=5

{
  //  this is still have in memory only within this block
  //  this is called variable shadowing
  let someNum = 5;
}
//  we can not the shadowed variable outside the block

// uninitalized variable
let hello;
hello = "world";
hello = "hi";

// const whoops; //  this will cause an error because const must be initialized

//  const must be initialized at the time of declaration and cannot be reassigned later
//  if you use uninitialized value we need to use let instead of const
