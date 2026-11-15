# Maps in TypeScript

A `Map` stores key-value pairs. Each key occurs once, and its value can be
retrieved by key. The example in [`index.ts`](./index.ts) uses names as keys
and numeric scores as values.

## Create and type a map

```ts
type Name = string;
type Score = number;

const testScores: Map<Name, Score> = new Map();
```

`Map<KeyType, ValueType>` is a generic type: here, keys must be strings and
values must be numbers. These type aliases make the roles clear; the same map
could be written as `Map<string, number>`.

Unlike object properties, map keys can be values of many types, including
objects. Object keys are matched by identity, so two separate object literals
are different keys even if they have the same properties.

## Add, read, and check entries

Use `.set(key, value)` to add an entry and `.get(key)` to retrieve its value:

```ts
testScores.set("Alice", 95);
testScores.set("Bob", 87);
testScores.set("Charlie", 78);

const aliceScore = testScores.get("Alice");
```

Setting a key that is already in the map replaces its value; it does not add
a second entry for that key. `.get()` can return `undefined` when the key is
missing, so check for that before using a result when the key is not known to
exist:

```ts
const score = testScores.get("Dana");
if (score !== undefined) {
  console.log(score);
}
```

Use `.has(key)` to test whether a key exists and `.size` to get the number of
entries. The source asserts that Alice, Bob, and Charlie have their expected
scores and that the map's size is `3`.

## Iterate over entries

Iterating a map directly produces `[key, value]` pairs:

```ts
for (const [name, score] of testScores) {
  console.log(`${name}: ${score}`);
}
```

This prints:

```text
Alice: 95
Bob: 87
Charlie: 78
```

**A `Map` preserves insertion order.** Its iteration order is guaranteed to
follow the order in which keys were first added. The comment in the source
that says not to rely on map order is incorrect. Updating an existing key does
not move it; deleting a key and adding it again places it at the end.

## Delete an entry

`.delete(key)` removes an entry. It returns `true` if the key was present:

```ts
testScores.delete("Bob");

console.log(testScores.has("Bob")); // false
console.log(testScores.size);       // 2
```

The source checks that Bob is no longer present and that the map's size has
decreased to `2`. Passing assertions from Node.js's strict assertion API do
not print output; failed assertions throw an error.