# Testing in TypeScript

Testing confirms that code behaves as expected. This project uses **Jest**
with `ts-jest`, so TypeScript test files can import functions from the source
file and run assertions.

The example files are [`index.ts`](./index.ts) and
[`index.test.ts`](./index.test.ts). Jest automatically finds test files whose
names end in `.test.ts` (or `.spec.ts`).

## Create a test file

For a source file such as `index.ts`, create `index.test.ts` beside it. Import
the functions that the tests need:

```ts
import { concat, div, slowString, failedString } from "./index";
```

Run tests from the project root with Jest:

```bash
npx jest demo/testing/index.test.ts
```

## Test a string function

`concat` accepts two strings and returns a new string containing both values:

```ts
export function concat(a: string, b: string): string {
  return `${a}${b}`;
}
```

Use `expect(...).toEqual(...)` to compare the actual result with the expected
result:

```ts
test('Should say "Hello, World!"', () => {
  expect(concat("Hello, ", "World")).toEqual("Hello, World!");
});
```

In this example:

- `concat("Hello, ", "World")` is the actual value.
- `"Hello, World!"` is the expected value.
- `toEqual` passes when both values are equal.

The test file currently uses both `it` and `test`; they are aliases in Jest,
so either name can be used.

## Test return values

`div` performs normal number division and throws when the divisor is zero:

```ts
export function div(lhs: number, rhs: number): number {
  if (rhs === 0) {
    throw new Error("Cannot divide by zero");
  }

  return lhs / rhs;
}
```

Multiple expectations can belong to one test:

```ts
test("should divide numbers correctly", () => {
  expect(div(6, 2)).toEqual(3);
  expect(div(10, 2)).toEqual(5);
});
```

To test an error, wrap the call in a function passed to `toThrow`:

```ts
test("should fail to divide by zero", () => {
  expect(() => div(10, 0)).toThrow("Cannot divide by zero");
});
```

This also works for checking an error type or for checking only that an error
was thrown.

## Test a resolved Promise

`slowString` waits 200 milliseconds and resolves to `"sample"`:

```ts
export function slowString(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("sample"), 200);
  });
}
```

Make the test function `async` and `await` the Promise:

```ts
test("slowString resolves to sample", async () => {
  await expect(slowString()).resolves.toEqual("sample");
});
```

`resolves` waits for the Promise to fulfill before Jest checks the value.
Returning or awaiting the Promise is important: it prevents the test from
finishing before the asynchronous result is available.

## Test a rejected Promise

`failedString` rejects with the string `"whoops"`:

```ts
export function failedString(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("whoops"), 1);
  });
}
```

Test the rejection with `rejects`:

```ts
test("failedString rejects with whoops", async () => {
  await expect(failedString()).rejects.toEqual("whoops");
});
```

Do not use `.then(...)` and `.catch(...)` without returning or awaiting the
whole Promise chain. Jest may finish the test before the callback assertion
runs.

## Useful Jest matchers

| Matcher | Purpose | Example |
| --- | --- | --- |
| `toEqual` | Compare values | `expect(div(6, 2)).toEqual(3)` |
| `toThrow` | Check for an exception | `expect(() => div(10, 0)).toThrow()` |
| `resolves` | Check a fulfilled Promise | `await expect(slowString()).resolves.toEqual("sample")` |
| `rejects` | Check a rejected Promise | `await expect(failedString()).rejects.toEqual("whoops")` |