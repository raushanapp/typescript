# Union Types in TypeScript

A union type describes a value that may be one of several types. Write the
alternatives with the pipe character (`|`). A value assigned to a union must
match at least one of its members. The examples in [`index.ts`](./index.ts)
show literal unions, a union of primitive types, and a return type that may be
`undefined`.

## Unions of literal values

```ts
type Color = "red" | "green" | "blue";

const r: Color = "red";

function setBgColor(c: Color): void {
  switch (c) {
    case "red":
      break;
    case "blue":
      break;
    case "green":
      break;
  }
}

setBgColor("blue"); // OK
// setBgColor("purple"); // Error: "purple" is not a Color
```

`Color` is limited to exactly the three listed string values. This kind of
union is useful for a fixed set of options, such as a status or mode. In the
source example, `setBgColor` currently has no side effects; its cases only
demonstrate that `c` can have one of the allowed values.

The same idea works with numeric literals:

```ts
type OneTwoThree = 1 | 2 | 3;

const one: OneTwoThree = 1;
// const four: OneTwoThree = 4; // Error: 4 is not an allowed member
```

## Unions of different types and narrowing

```ts
type StrOrNum = string | number;

function sample(data: StrOrNum): void {
  if (typeof data === "string") {
    console.log("String data:", data.toUpperCase());
  } else if (typeof data === "number") {
    console.log("Number data:", data + 10);
  }
}

sample("hello"); // String data: HELLO
sample(5);       // Number data: 15
// sample(true); // Error: boolean is not assignable to StrOrNum
```

Before checking `data`, TypeScript only allows operations that work for both
strings and numbers. The `typeof` checks **narrow** the type in each branch:
inside the first branch `data` is a string, and inside the second it is a
number. This lets each branch safely use type-specific operations.

## A union with `undefined`

The `find` function in the source declares that it may return a string or no
value:

```ts
function find(): string | undefined {
  return undefined;
}

const result = find();
if (result !== undefined) {
  console.log(result.toUpperCase());
}
```

The declared return type requires every returned value to be either a string
or `undefined`. Because a caller cannot assume a string was found, it should
check for `undefined` before using string-only operations. In this example,
`find` always returns `undefined`; its name does not implement a search.

Union types are checked by TypeScript at compile time. They do not convert
values or validate data at runtime, so values from an external source still
need runtime checks before being trusted.