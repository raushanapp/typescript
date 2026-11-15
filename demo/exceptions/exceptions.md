# Exceptions in TypeScript

An exception interrupts normal execution and transfers control to a matching
`catch` block. In JavaScript and TypeScript, `throw` raises an exception,
`try...catch` handles it, and `finally` runs whether the `try` block finishes
normally or throws. The examples below follow [`index.ts`](./index.ts).

## Throw an error

`divide` is intended to reject a zero divisor:

```ts
function divide(lhs: number, rhs: number): number {
  if (rhs === 0) {
    throw new Error("cannot divide by zero");
  }
  return lhs / rhs;
}
```

The source currently checks `lhs === 0`, which is the numerator, rather than
`rhs === 0`, the divisor. As written, `divide(10, 0)` does not throw: JavaScript
returns `Infinity` for `10 / 0`. The condition should be `rhs === 0` to match
the error message and intended behavior. Division by zero does not itself
throw a JavaScript exception.

## Catch, log, and rethrow

The `div` function catches an error from `divide`, logs it, and throws the
same error again:

```ts
function div(lhs: number, rhs: number): number {
  try {
    return divide(lhs, rhs);
  } catch (error) {
    console.error("An error occurred:", (error as Error).message);
    throw error;
  }
}
```

Rethrowing means this catch block does not fully handle the error; callers
still need to handle it. `(error as Error)` is a TypeScript type assertion,
not a runtime check. JavaScript permits throwing values that are not `Error`
objects, so checking with `error instanceof Error` is safer if the caught
value's shape is not guaranteed.

## Catch at the call site and always run cleanup

The outer `try` calls `div` twice:

```ts
try {
  const a = div(10, 2);
  console.log(a);
  const b = div(10, 0);
  console.log(b);
} catch (error) {
  console.error("Division failed:", error);
} finally {
  console.log("Division attempt finished.");
}
```

With the corrected divisor check, the first call prints `5`. The second call
throws, so `console.log(b)` is skipped. `div` logs the error and rethrows it;
the outer `catch` then handles it. The `finally` block runs afterward in
either case, so it prints `Division attempt finished.` whether the operation
succeeds or fails.

In the source, the outer `catch` is empty. That silently swallows any error
that reaches it, which can hide failures. Handle the error there (as above),
or let it propagate when the current function cannot handle it. With the
source's existing `lhs === 0` condition, the actual run instead logs `5`,
then `Infinity`, then `Division attempt finished.`; neither catch block runs.