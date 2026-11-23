# Generic Functions

A generic function works with values of different types while preserving the
relationship between its inputs and outputs. It declares a **type parameter**
such as `T`, which TypeScript fills in from the arguments or from an explicit
type argument.

## The example: getting the first array item

The [`index.ts`](./index.ts) file first defines separate functions for number
and string arrays. They perform the same operation but repeat the logic:

```ts
function getFirstNumber(arr: number[]): number | undefined {
  if (arr.length > 0) {
    return arr[0];
  }
  return undefined;
}

function getFirstString(arr: string[]): string | undefined {
  if (arr.length > 0) {
    return arr[0];
  }
  return undefined;
}
```

A union-typed version could accept several element types, but its return type
would also be a union whether or not that particular input contains all of
them. A generic expresses the more precise relationship: the result has the
same element type as the input array.

```ts
function getFirst<T>(arr: T[]): T | undefined {
  if (arr.length > 0) {
    return arr[0];
  }
  return undefined;
}

const firstNumber = getFirst([1, 2]);       // number | undefined
const firstString = getFirst(["a", "b"]);   // string | undefined
const firstBoolean = getFirst([true, false]); // boolean | undefined
```

When it sees each call, TypeScript infers `T` from the array argument. For
`getFirst([1, 2])`, `T` is `number`; for `getFirst(["a", "b"])`, it is
`string`. The return type includes `undefined` because an empty array has no
first item.

The type parameter can also be supplied explicitly when useful:

```ts
const firstOrMissing = getFirst<number>([]);
// firstOrMissing has type number | undefined
```

Usually inference is sufficient, so an explicit type argument is not needed.

## Why use a generic instead of `any`?

`any` turns off useful type checking and does not preserve the input/output
relationship:

```ts
function getFirstAny(arr: any[]): any {
  return arr[0];
}
```

With `getFirstAny`, the caller can use the result as any type, even if the
array contains something else. With `getFirst<T>`, TypeScript remembers the
array's element type and checks how the returned value is used.

## When and where to use generic functions

Use a generic when the same logic should work with multiple types and the
function's input and output types are related. Common examples include:

- selecting or returning an item from a collection;
- transforming a value while preserving its type information;
- reusable helpers for arrays, promises, or other typed containers.

For example, `getFirst` is useful in code that works with lists of different
element types: one implementation handles each list, and callers still get
the correct result type. A generic is not needed when a function only accepts
one fixed type or when its behavior truly requires a particular type.

A type parameter does not give a function permission to use every possible
operation on `T`. If the implementation needs a capability shared by a set of
types, constrain the type parameter to that capability; otherwise, treat `T`
as an unknown type and only pass it through or use operations valid for all
types.