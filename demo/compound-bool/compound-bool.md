# Compound Boolean Expressions

A compound Boolean expression combines or modifies Boolean conditions using
logical operators. The examples in [`index.ts`](./index.ts) use `!` (NOT),
`||` (OR), and `&&` (AND).

## NOT: `!`

NOT reverses a Boolean value: `!true` is `false`, and `!false` is `true`.

```ts
const writing = true;
const reading = !writing; // false
```

The expression `!writing` means "not writing." Assigning it to `reading` is
the rule used in this example; in a real program, someone could be neither
writing nor reading.

## OR: `||`

For Boolean operands, OR produces `true` when at least one condition is true.

```ts
const rating = 9;
const favoriteMovie = false;
const suggestMovie = rating > 8 || favoriteMovie; // true
```

The rating is greater than 8, so the movie is suggested even though
`favoriteMovie` is `false`. A favorite movie would also be suggested if its
rating were 8 or lower.

| First condition | Second condition | First `||` second |
| --- | --- | --- |
| `false` | `false` | `false` |
| `false` | `true` | `true` |
| `true` | `false` | `true` |
| `true` | `true` | `true` |

## AND: `&&`

For Boolean operands, AND produces `true` only when both conditions are true.

```ts
const age = 18;
const isTeenager = age >= 13 && age < 20; // true
```

Both `18 >= 13` and `18 < 20` are true. This condition includes ages 13
through 19; age 12 fails the first comparison, and age 20 fails the second.

| First condition | Second condition | First `&&` second |
| --- | --- | --- |
| `false` | `false` | `false` |
| `false` | `true` | `false` |
| `true` | `false` | `false` |
| `true` | `true` | `true` |

## Combining operators: extra shipping fee

The example charges an extra fee when a package is **not exempt** and its
weight is greater than 25 or its length is greater than 40:

```ts
const packageWeight = 30;
const packageLength = 50;
const feeExemption = false;
const extraFee = !feeExemption && (packageWeight > 25 || packageLength > 40);
// true
```

The parentheses group the two size conditions:

```text
feeExemption = false ---- NOT ---- true --------+
                                                 AND ---- true --> extraFee
packageWeight = 30 ---- > 25 ---- true --+       |
                                          OR -----+
packageLength = 50 ---- > 40 ---- true --+
```

Conceptually, both size comparisons are true for these values, so their OR
result is true. The package is not exempt, so the AND result is also true.
In actual execution, `||` short-circuits after the true weight comparison, so
the length comparison is not evaluated in this example.

| Exempt? | Weight | Length | Extra fee? | Reason |
| --- | --- | --- | --- | --- |
| No | 30 | 50 | Yes | Not exempt; both limits are exceeded |
| No | 25 | 41 | Yes | Not exempt; length exceeds 40 |
| No | 26 | 40 | Yes | Not exempt; weight exceeds 25 |
| No | 25 | 40 | No | Neither limit is exceeded |
| Yes | 30 | 50 | No | Exemption prevents the fee |

The limits use `>`, not `>=`: a weight of exactly 25 or a length of exactly
40 does not exceed its respective limit. The `shippingDistance` and `air`
declarations in the source are commented out and do not affect the fee.

## Short-circuit evaluation

JavaScript evaluates logical expressions from left to right and may skip the
right operand:

- `false && expression` does not evaluate `expression`.
- `true || expression` does not evaluate `expression`.

In the shipping example, if `feeExemption` is `true`, `!feeExemption` is
`false`, so neither size comparison is evaluated. Parentheses group the size
conditions but do not prevent short-circuiting.

These examples use Boolean operands. In general, JavaScript's `&&` and `||`
return one of their operands, which is not necessarily a Boolean.

## Assertions

The file imports Node.js's strict assertion API:

```ts
import { strict as assert } from "assert";
assert.equal(extraFee, true);
```

In this strict API, `assert.equal` checks strict equality. The assertion
passes silently when the result is `true`; otherwise, it throws an error.