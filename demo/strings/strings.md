# Strings in TypeScript

The examples in [`index.ts`](./index.ts) use common `string` methods. Each
result is checked with Node.js's strict assertion API:

```ts
import { strict as assert } from "assert";
```

A passing assertion prints nothing; a failing one throws an error.

Strings are **immutable**: these methods never change the original string.
They return a new value, so store the result if you need it.

| Task | Method | Example | Result |
| --- | --- | --- | --- |
| Join strings | `concat` | `"Hello".concat(" ", "World")` | `"Hello World"` |
| Replace text | `replace` | `"dogs".replace(/dog/g, "cat")` | `"cats"` |
| Find a position | `indexOf` | `"fox hunt".indexOf("hunt")` | `4` |
| Extract a part | `substring` | `"JavaScript".substring(0, 4)` | `"Java"` |
| Check for text | `includes` | `"Hello World".includes("World")` | `true` |
| Remove outer spaces | `trim` | `"  Hi  ".trim()` | `"Hi"` |

## Concatenation: `concat`

Concatenation puts two or more strings together. `concat` appends each
argument, in order:

```ts
const a = "Hello";
const b = "World";
const result = a.concat(" ", b);
assert.equal(result, "Hello World");
```

```text
"Hello"  +  " "  +  "World"  ──►  "Hello World"
```

The `+` operator and template literals give the same result:

```ts
const viaPlus = a + " " + b;       // "Hello World"
const viaTemplate = `${a} ${b}`;   // "Hello World"
```

## Replacing text: `replace`

`replace` returns a new string with a match replaced:

```ts
const input = "The internet loves dogs";
const output = input.replace(/dog/g, "cat");
// "The internet loves cats"
```

`/dog/g` is a regular expression. The `g` flag means *global*: replace every
match, not only the first. `input` is unchanged.

The file does not assert on `output`. With a plain string pattern, only the
first match is replaced; use `replaceAll` to replace every match:

```ts
"dogs dogs".replace("dog", "cat");     // "cats dogs"
"dogs dogs".replaceAll("dog", "cat");  // "cats cats"
```

`replaceAll` needs a `lib` setting of `es2021` or later; this project targets
`es2020`, so the regular expression with `g` is the portable choice here.

## Searching: `indexOf`

`indexOf` returns the zero-based index where the text first appears, or `-1`
if it is not found:

```ts
const input1 = "The quick brown fox jumps over the lazy dog";
const index = input1.indexOf("fox");
assert.equal(index, 16);
```

```text
T h e _ q u i c k _ b r o w n _ f o x ...
0 1 2 3 4 5 6 7 8 9 10 ...        16 17 18
                                  └─ "fox" starts at index 16
```

```ts
input1.indexOf("The");  // 0
input1.indexOf("cat");  // -1 (not found)
```

Searches are case-sensitive.

## Extracting: `substring`

`substring(start, end)` returns the characters from `start` up to, but **not
including**, `end`:

```ts
const input = "JavaScript";
const j = input.substring(0, 4);   // "Java"
const s = input.substring(4, 10);  // "Script"
```

```text
 J  a  v  a  S  c  r  i  p  t
 0  1  2  3  4  5  6  7  8  9
[0 ........ 4)[4 ............ 10)
    "Java"        "Script"
```

- `end` is optional: `input.substring(4)` also returns `"Script"`.
- The end index can be as large as the string length (`10` here).
- `substring` swaps its arguments if `start` is greater than `end`, so
  `"abc".substring(3, 0)` is `"abc"`.

The example also sits in a `{ ... }` block, so its `input`, `j`, and `s`
are scoped to that block and do not clash with the top-level `input`.

## Checking contents: `includes`

`includes` returns a Boolean:

```ts
const input = "Hello World";
const hasWorld = input.includes("World");
assert.equal(hasWorld, true);
```

It is case-sensitive: `"Hello World".includes("world")` is `false`.

## Trimming: `trim`

`trim` removes whitespace from both ends. It does not touch whitespace in
the middle:

```ts
const input = "   Hello World   ";
const trimmed = input.trim();
assert.equal(trimmed, "Hello World");
```

```text
"   Hello World   "  ──trim()──►  "Hello World"
```

Use `trimStart()` or `trimEnd()` to remove whitespace from one side only.

## Block scoping in the file

The file uses `{ ... }` blocks for the last three examples so each can
declare its own `input`. This works because `const` is block-scoped.
Running the file prints `Java Script` from the `console.log(j, s)` call.
