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

This is valid: TypeScript infers an element type that can accommodate the
values. An array does not have to contain only one type, but if the allowed
types are intentional, make that clear with a union:

```ts
const identifiers: (number | string)[] = [101, "A-102"];
```

For a collection intended to hold only one kind of value, a single element
type is usually clearer and gives more useful checks.

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

## Adding array types

The source annotates arrays in two equivalent ways:

```ts
let userIds: number[] = [1, 2, 3];
let securityPins: string[] = ["1234", "0111", "0123"];

let productIds: Array<number> = [101, 102, 103];
let productNames: Array<string> = ["Laptop", "Phone", "Tablet"];
```

`number[]` means “an array whose elements are numbers.” `Array<number>` means
the same thing, using TypeScript's generic `Array` type. Use whichever form
best matches the style of the project; `T[]` is common for simple types.

An annotation lets TypeScript check later additions and assignments:

```ts
const scores: number[] = [10, 20];
scores.push(30);      // OK
// scores.push("40"); // Error: string is not assignable to number
```

The annotation does not convert values at runtime; it catches mismatches
during type checking.

## Tuples: arrays with position-specific types

The source also uses a tuple:

```ts
let user: [number, string] = [1, "Alice"];
```

The tuple type describes the expected type at each position: index `0` is a
number and index `1` is a string. This is different from `(number | string)[]`,
where either type can appear at any position and the array can have any
length. A regular tuple is still mutable; its type describes the intended
structure but does not make the JavaScript array immutable at runtime.

```ts
const userId = user[0];   // number
const userName = user[1]; // string
```

Use an ordinary array for a collection of similarly typed items; use a tuple
when the positions have different meanings or types.

## Empty arrays

The source also declares an empty array:

```ts
const emptyArray = [];
```

An empty array has no elements from which TypeScript can infer the intended
element type. When it will later hold values, add an annotation to make its
purpose clear and check future additions:

```ts
const scores: number[] = [];
scores.push(10);
```