# Optional Chaining in TypeScript

Optional chaining (`?.`) safely accesses a property when the value before it
might be `null` or `undefined`. If that value is nullish, the expression
short-circuits and evaluates to `undefined` instead of throwing an error. The
example in [`index.ts`](./index.ts) uses it to read an age nested in an
optional search result:

```ts
interface Pii {
  age?: number;
  address?: string;
}

interface SearchResult {
  name: string;
  pii?: Pii;
}

const result = database.search("John");
const age = result?.pii?.age;
```

The first `?.` protects against `search` returning `undefined`; the second
protects against `pii` being absent. If the result, `pii`, or `age` is
missing, `age` is `undefined`. Otherwise, it is the numeric age (`30` for
`"John"` in this example).

## Check for a value, not just truthiness

The source's concise example uses this condition:

```ts
if (result?.pii?.age) {
  console.log(`${result.name} age is ${result.pii.age}`);
}
```

This works for John's age of `30`, but it checks whether the age is truthy.
The number `0` is falsy, so a valid age of `0` would be skipped. To test
whether an optional number is present, compare it with `undefined`:

```ts
if (result?.pii?.age !== undefined) {
  console.log(`${result.name} age is ${result.pii.age}`);
}
```

This allows `0` and excludes only a missing age. In the example's declared
types, `age` can be a number or `undefined`, not `null`.

## Compare with explicit checks

The first block in `index.ts` checks every level before reading the age:

```ts
if (
  result !== undefined &&
  result !== null &&
  result.pii !== undefined &&
  result.pii !== null &&
  result.pii.age !== undefined &&
  result.pii.age !== null
) {
  console.log(`${result.name} age is ${result.pii.age}`);
}
```

Optional chaining makes the access shorter, for example
`result?.pii?.age !== undefined`. The extra `null` checks in the source are
redundant for its declared types: `search` returns `SearchResult | undefined`,
and `pii` and `age` are optional but do not include `null`. If data can
actually contain `null` at runtime, include `null` in the types and handle it
explicitly or validate the data.

The database returns a result with an age for `"John"`, a result without
`pii` for `"Jane"`, and `undefined` for other names. Both blocks in the source
search for `"John"`, so each prints:

```text
John Doe age is 30
```

Optional chaining only protects the part of an access chain that uses `?.`.
For example, `result?.pii.age` can still throw if `result` exists but `pii`
is `undefined`; use `result?.pii?.age` when either level may be missing.
Optional chaining also does not provide a fallback value. Use `??` if one is
needed:

```ts
const displayAge = result?.pii?.age ?? "not provided";
```