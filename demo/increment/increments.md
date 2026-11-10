# Increment, Decrement, and Assignment Operators

The examples in [`index.ts`](./index.ts) show how to change a variable's value
with `++`, `--`, and compound assignment operators such as `+=` and `-=`.
Each result is checked with Node.js's strict assertion API:

```ts
import { strict as assert } from "assert";
```

These operators change a variable, so the variable must be declared with `let`
(not `const`).

## Increment: `++`

`++` adds 1 to a variable. It has two forms, and they differ in the **value of
the expression**, not in the final value of the variable.

| Form | Name | Updates variable | Expression value |
| --- | --- | --- | --- |
| `n++` | Postfix | After the value is read | The **old** value |
| `++n` | Prefix | Before the value is read | The **new** value |

When used as a standalone statement, both forms have the same effect:

```ts
let n = 1;
n++;                  // n is 2
assert.equal(n, 2);

++n;                  // n is 3
assert.equal(n, 3);
```

## Postfix: `n++` returns the old value

```ts
n = 5;
const k = n++;        // k gets 5, then n becomes 6
assert.equal(n, 6);
// assert.equal(k, 6); // Fails: k is 5, not 6
```

The commented assertion is wrong because `n++` returns the value from
**before** the increment. After this code, `k` is `5` and `n` is `6`.

```text
n = 5
  │
  └─ const k = n++
        │
        ├─ 1. read n          → 5
        ├─ 2. increment n     → 6
        └─ 3. assign old value to k → k = 5
```

## Prefix: `++n` returns the new value

```ts
n = 5;
const j = ++n;        // n becomes 6, then j gets 6
assert.equal(j, 6);
```

```text
n = 5
  │
  └─ const j = ++n
        │
        ├─ 1. increment n     → 6
        └─ 2. assign new value to j → j = 6
```

## Decrement: `--`

`--` subtracts 1 and also has prefix and postfix forms with the same rules as
`++`. The file demonstrates the prefix form:

```ts
n = 5;
const t = --n;        // n becomes 4, then t gets 4
assert.equal(t, 4);
```

The postfix form, `n--`, would return the old value:

```ts
n = 5;
const u = n--;        // u is 5, n becomes 4
```

## Compound assignment: `+=` and `-=`

`n += 5` is shorthand for `n = n + 5`. Likewise, `n -= 5` is shorthand for
`n = n - 5`.

```ts
n = 5;
n += 5;               // n = n + 5
assert.equal(n, 10);

n -= 5;               // n = n - 5
assert.equal(n, 5);

n -= 1;               // n = n - 1 (same effect as n--)
assert.equal(n, 4);
```

```text
n: 5 ──(+= 5)──► 10 ──(-= 5)──► 5 ──(-= 1)──► 4
```

Unlike `++` and `--`, which always change the value by 1, compound assignment
operators can use any right-hand value.

## Other compound operators

The final comments in the file list more compound assignment operators:

| Operator | Equivalent to | Example (starting with `n = 10`) | Result |
| --- | --- | --- | --- |
| `+=` | `n = n + x` | `n += 2` | `12` |
| `-=` | `n = n - x` | `n -= 2` | `8` |
| `*=` | `n = n * x` | `n *= 2` | `20` |
| `/=` | `n = n / x` | `n /= 2` | `5` |
| `%=` | `n = n % x` | `n %= 3` | `1` |

## Practical guidance

- Use `++` or `--` as standalone statements when you only need to change the
  value; this avoids confusion between prefix and postfix results.
- Avoid using `n++` or `++n` inside larger expressions unless the returned
  value is intentional.
- Use compound assignment when the change is not exactly 1.
