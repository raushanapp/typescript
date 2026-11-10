# Arithmetic in TypeScript

The examples in [`index.ts`](./index.ts) use arithmetic operators on `number`
values and check each result with Node.js's strict assertion API.

```ts
import { strict as assert } from "assert";
```

A passing assertion prints nothing; a failing one throws an error.

## Operators at a glance

| Operator | Name | Example | Result |
| --- | --- | --- | --- |
| `+` | Addition | `5 + 3` | `8` |
| `-` | Subtraction | `10 - 4` | `6` |
| `*` | Multiplication | `6 * 7` | `42` |
| `/` | Division | `20 / 5` | `4` |
| `%` | Remainder | `10 % 3` | `1` |
| `**` | Exponentiation | `2 ** 3` | `8` |
| `-x` | Unary negation | `-rem` | flips the sign |

## Basic operations

```ts
const sum = 5 + 3;         // 8
const difference = 10 - 4; // 6
const product = 6 * 7;     // 42
const quotient = 20 / 5;   // 4
```

Each of these values has the inferred type `number`. TypeScript uses `number`
for both integers and decimals (`20 / 8` is `2.5`).

The source comment notes that `bigint` can be used for very large integers.
`bigint` values use an `n` suffix and cannot be mixed directly with `number`:

```ts
const big = 9000n * 2n; // 18000n
// const mixed = 9000n * 2; // Error: cannot mix bigint and number
```

## Division by zero: `Infinity` and `NaN`

JavaScript and TypeScript do not throw an error when a number is divided by
zero:

```ts
const infinity = 1 / 0;
assert.equal(infinity, Infinity); // passes

const nan = 0 / 0;
assert(isNaN(nan));               // passes
```

| Expression | Result |
| --- | --- |
| `1 / 0` | `Infinity` |
| `-1 / 0` | `-Infinity` |
| `0 / 0` | `NaN` (not a number) |

`NaN` is never equal to any value, including itself (`nan === nan` is
`false`). That is why the example uses `isNaN(nan)` instead of comparing with
`NaN`. `Number.isNaN` is stricter: the global `isNaN` first converts its
argument to a number, while `Number.isNaN` does not.

```text
 1 / 0         ──►  Infinity
 0 / 0         ──►  NaN
 NaN === NaN   ──►  false
```

## Remainder: `%`

`%` returns what is left after dividing the left operand by the right one.
The file computes `10 % 3` twice, as `rem` and as `remainder`; both are `1`.

```ts
const rem = 10 % 3;        // 1
const remainder = 10 % 3;  // 1
```

```text
10 ÷ 3 = 3 remainder 1

 ● ● ●   ● ● ●   ● ● ●   ●
 └ 3 ┘   └ 3 ┘   └ 3 ┘   └ 1 left over
```

Common uses include checking for even numbers (`n % 2 === 0`). The result
takes the sign of the left operand, so `-10 % 3` is `-1`. In JavaScript and
TypeScript, `%` is a remainder operator, not a true mathematical modulo.

## Unary negation

A leading `-` flips the sign of a number. Applying it twice restores the
original value:

```ts
const rem = 10 % 3;  // 1
const neg = -rem;    // -1
const neg2 = -neg;   // 1
```

```text
rem (1) ──(-)──► neg (-1) ──(-)──► neg2 (1)
```

## Exponentiation: `**`

`**` raises the left operand to the power of the right one:

```ts
const exp = 2 ** 3; // 2 × 2 × 2 = 8
```

`**` is right-associative: `2 ** 3 ** 2` is `2 ** (3 ** 2)`, which is `512`.

## `Math` helpers

The `Math` object provides numeric functions and constants:

```ts
const abs = Math.abs(-5); // 5 (absolute value)
const pi = Math.PI;       // 3.141592653589793
```

The file declares `pi` but does not assert on it. Floating-point constants
are not usually compared with exact literals.

## Operator precedence

`**` is evaluated first, then `*`, `/`, and `%`, and finally `+` and `-`.
Parentheses override the default order:

```ts
const a = 2 + 3 * 4;   // 14
const b = (2 + 3) * 4; // 20
```

## Floating-point precision

`number` is a 64-bit floating-point value, so some decimal results are
approximate:

```ts
0.1 + 0.2; // 0.30000000000000004
```

For currency or other exact decimal needs, use integer units (such as cents)
or a dedicated decimal library.
