/* eslint-disable */
import { strict as assert } from "assert";

// A `Map` is a data structure that allows you to store data in a key-value
// pair format. Keys in a map must be unique, and each key can map to only one
// value. You can use any type of value as the key, including objects and
// functions. Maps are useful when you want to quickly access data and you are
// able to maintain the key in memory. In situations where you have to search
// (you don't have a key) for the data you need, a difference data structure
// would be more appropriate.
//
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
//

type Name = string;
type Score = number;

//                    KEY   VALUE
const testScores: Map<Name, Score> = new Map();

testScores.set("Alice", 95);
testScores.set("Bob", 87);
testScores.set("Charlie", 78);

assert.strictEqual(testScores.get("Alice"), 95);
assert.strictEqual(testScores.get("Bob"), 87);
assert.strictEqual(testScores.get("Charlie"), 78);

assert.equal(testScores.size, 3);

//          [KEY ,VALUE]
for (const [name, score] of testScores) {
  console.log(`${name}: ${score}`);
}

//  do not rely on the order of elements in a Map, as it is not guaranteed.
testScores.delete("Bob");
assert.equal(testScores.has("Bob"), false);
assert.equal(testScores.size, 2);
