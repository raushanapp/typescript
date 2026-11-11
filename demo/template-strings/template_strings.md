# Template Strings in TypeScript

A template string (also called a template literal) is a string written with
backticks (`` ` ``). The examples in [`index.ts`](./index.ts) use it to insert
values into text.

## Three ways to write a string

The comments in the file list the three quote styles:

```ts
const double = "typescript";   // " "
const single = 'typescript';   // ' '
const template = `typescript`; // ` `
```

All three produce a `string`. Only backticks support interpolation and
multi-line text.

## Interpolation: `${ }`

Inside a template string, `${expression}` is replaced by the value of the
expression:

```ts
function greet(message) {
  console.log(`Hello, ${message}`);
}

greet("typescript"); // Hello, typescript
```

```text
`Hello, ${message}`
        │
        └─ message = "typescript"
                │
                ▼
        "Hello, typescript"
```

Here `message` is the function's parameter. In `index.ts` it has no type
annotation; this compiles because the project's settings allow implicit `any`
(`noImplicitAny` is `false`). Writing `message: string` is clearer.

## Expressions inside `${ }`

Any expression is allowed, including calculations and function calls. The
result is converted to a string:

```ts
const kids = 2;
const adults = 4;
const totalAttending = kids + adults;
const message = `There are ${totalAttending} people`;
// "There are 6 people"
```

```ts
`${kids + adults}`;        // "6"
`${"ts".toUpperCase()}`;   // "TS"
```

## Combining template strings

The file builds a second string from the first:

```ts
console.log(`${message} to seat at the restaurant.`);
// There are 6 people to seat at the restaurant.
```

```text
kids (2) + adults (4)
        │
        ▼
totalAttending = 6
        │
        ▼
message = "There are 6 people"
        │
        ▼
"There are 6 people to seat at the restaurant."
```

Running the file prints:

```text
Hello, typescript
There are 6 people to seat at the restaurant.
```

## Compare with concatenation

The same result using `+` needs more punctuation and is easier to get wrong:

```ts
const viaPlus = "There are " + totalAttending + " people";
const viaTemplate = `There are ${totalAttending} people`;
```

## Multi-line strings

A template string keeps line breaks exactly as written:

```ts
const poem = `line 1
line 2`;
// Same as "line 1\nline 2"
```

## Converting values

Interpolated values are converted to strings:

| Expression | Output |
| --- | --- |
| `${true}` | `true` |
| `${null}` | `null` |
| `${undefined}` | `undefined` |
| `${[1, 2]}` | `1,2` |
| `${{}}` | `[object Object]` |

Objects produce `[object Object]` unless they define their own string
conversion, so avoid interpolating them directly.

## Escaping

To include a literal backtick or `${` in a template string, escape it with a
backslash:

```ts
`\`tick\``;   // `tick`
`\${price}`;  // ${price}
```

## Unused import

`index.ts` imports `assert` but does not use it. Nothing is asserted in this
file, so the output is checked by reading the printed lines.
