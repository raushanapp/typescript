# Variables and Basic Types

TypeScript can infer a variable's type from the value used to initialize it. The
examples in [`index.ts`](./index.ts) use inferred types, so explicit annotations
are not needed for these declarations.

## `const` and `let`

Use `const` when a binding should not be reassigned. A `const` declaration must
be initialized immediately. Use `let` when the binding needs a new value later;
it can also be declared first and assigned afterward.

```ts
const courseName = "typescript";
const amount = 10;

let count = 0;
count = 1;
count = 2;

let greeting: string;
greeting = "hello";
greeting = "hi";

// const title; // Error: const declarations must be initialized.
```

The `const` rule applies to reassignment of the binding, not to the contents of
an object or array stored in it.

## Values and inferred types

```ts
const wholeNumber = 10;       // number
const decimal = 10.5;         // number
const scientific = 1e3;       // number (1000)
const octal = 0o777;          // number
const hexadecimal = 0xff;     // number
const binary = 0b0100001;     // number
const largeInteger = 9000n;   // bigint
const enabled = true;         // boolean
const disabled = false;       // boolean
const notProvided = undefined;
const explicitlyEmpty = null;
```

Strings can use single quotes, double quotes, or backticks:

```ts
const first = "typescript";
const second = 'typescript';
const third = `typescript`;
```

Backticks also allow interpolation:

```ts
const course = "TypeScript";
const message = `Learning ${course}`;
```

## Block scope and shadowing

Variables declared with `let` or `const` are block-scoped. A declaration inside
a block can use the same name as an outer variable; the inner declaration
shadows the outer one only inside that block.

```ts
let someNum = 2;

{
  let someNum = 5;
  console.log(someNum); // 5
}

console.log(someNum); // 2
```

```text
Outer scope
┌─────────────────────────────┐
│ someNum = 2                 │
│                             │
│  Inner block                │
│  ┌───────────────────────┐  │
│  │ someNum = 5           │  │  ← shadows the outer binding here
│  └───────────────────────┘  │
│                             │
│ After the block: someNum=2  │
└─────────────────────────────┘
```

The inner `someNum` is a separate binding. When the block ends, it is no longer
in scope, and the outer `someNum` is available again.