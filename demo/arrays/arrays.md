# Arrays in TypeScript

The examples in [`index.ts`](./index.ts) show how to create arrays, read and
update their elements, and use common array methods. Arrays are ordered
collections, written with square brackets. Their indexes start at `0`.

## Creating and reading arrays

An array can be initialized with values:

```ts
const numbers = [1, 2, 4, 5, 6];
let letters = ["a", "b", "c"];
//             0    1    2

const secondLetter = letters[1]; // "b"
```

TypeScript infers an element type from the initial values. Here `numbers` is
an array of numbers and `letters` is an array of strings. Reading an element
uses its index in square brackets.

An element can be updated by assigning to its index:

```ts
letters[1] = "z";
// letters is now ["a", "z", "c"]
```

The variable can be declared with `const` and its elements can still be
changed. `const` prevents assigning a different array to the variable; it does
not make the array contents immutable.

## Arrays with different element types

The source also declares an array containing values of different types:

```ts
const mixed = [1, "a", true, {}, []];
```

TypeScript allows this and infers a type that can include the different
element types. For a collection intended to hold one kind of value, keeping
the elements the same type is usually clearer and makes the array easier to
use.

## Nested arrays

An array can contain other arrays. Use one index for each level:

```ts
const names = [
  ["Alice", "Carol"],
  ["Bob", "Dave"],
];

const alice = names[0][0]; // "Alice"
const bob = names[1][0];   // "Bob"
const carol = names[0][1]; // "Carol"
const dave = names[1][1];  // "Dave"
```

The first index selects a row; the second selects an item in that row.

## Adding and removing elements

The example starts with `["a", "z", "c"]` after changing the second letter.
These methods modify that same array:

| Method | What it does | Example |
| --- | --- | --- |
| `push(value)` | Adds a value to the end | `letters.push("d")` |
| `pop()` | Removes and returns the last value | `letters.pop()` |
| `unshift(value)` | Adds a value to the beginning | `letters.unshift("x")` |
| `shift()` | Removes and returns the first value | `letters.shift()` |

For example:

```ts
letters.push("d", "e"); // ["a", "z", "c", "d", "e"]
letters.unshift("x");   // ["x", "a", "z", "c", "d", "e"]
letters.shift();        // removes "x"
letters.pop();          // removes "e"
```

After these operations, `letters` is `["a", "z", "c", "d"]`. `push` and
`unshift` add values; `pop` and `shift` remove values and return the removed
value.

## Taking a portion with `slice`

`slice(start, end)` returns a new array containing elements from `start` up to,
but not including, `end`. It does not change the original array:

```ts
const firstLetter = letters.slice(0, 1); // ["a"]
```

In the source, the result of `letter.slice(0, 1)` is not assigned to a
variable, so it is calculated and then discarded.

## Empty arrays

The source also declares an empty array:

```ts
const emptyArray = [];
```

When creating an empty array that will later hold values, providing an
explicit element type can make its intended use clear:

```ts
const scores: number[] = [];
scores.push(10);
```