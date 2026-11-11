/* eslint-disable */
import { strict as assert } from "assert";

//  "Concatenation" will put two or more strings together

const a = "Hello";
const b = "World";
const result = a.concat(" ", b);
assert.equal(result, "Hello World");

// Replacing parts of a string with another uses the `replace` method
const input = "The internet loves dogs";
const output = input.replace(/dog/g, "cat");

//  Search for a specific string, we use the `indexOf` method

const input1 = "The quick brown fox jumps over the lazy dog";
//  test@email.com
const index = input1.indexOf("fox");
assert.equal(index, 16);

//  Parts of a string can bex extracted using `Substring`

{
  const input = "JavaScript";
  const j = input.substring(0, 4);
  const s = input.substring(4, 10);
  assert.equal(j, "Java");
  assert.equal(s, "Script");
  console.log(j, s);
}

//  Sometimes it's useful to determine if a string contains a specific substring
{
  const input = "Hello World";
  const hasWorld = input.includes("World");
  assert.equal(hasWorld, true);
}

//  to remove whitespace from the beginning and end of a string, we use `trim`
{
  const input = "   Hello World   ";
  const trimmed = input.trim();
  assert.equal(trimmed, "Hello World");
}
