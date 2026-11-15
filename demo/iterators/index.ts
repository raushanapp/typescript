/* eslint-disable */
// Iterators offer a way to traverse the elements of a collection one by one.
// The purpose of iterators is to provide a standard way for accessing and
// iterating over collections, such as arrays or maps, in a language-agnostic
// way. Using iterators, you can iterate over collections in a loop without
// having to worry about the underlying implementation of the collection.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html
//

const abc = ["a", "b", "c"];

//  c-style
for (let i = 0; i < abc.length; i++) {
  console.log(abc[i]);
}

for (const letter of abc) {
  console.log(letter);
}

const nums = {
  one: 1,
  two: 2,
  three: 3,
};

let property: keyof typeof nums;

for (property in nums) {
  console.log(property, nums[property]);
}

//  these are caluate at runtime
//  for example, the keys of the `nums` object are determined when the code runs, not at compile time.

//  if we are modifying the object

nums["letter"] = "c";

for (property in nums) {
  const answer = nums[property] * 2;
  console.log(property, answer);
  //  this will result in NaN for non-numeric values like "c"
  //  this might cause our program to behave unexpectedly if we assume all values are numeric
}
