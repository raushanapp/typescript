# Boolean Logic in TypeScript

The examples in [`index.ts`](./index.ts) show how comparisons produce Boolean
values and how to check those values with assertions.

## Boolean values and expressions

A Boolean has one of two values: `true` or `false`. A Boolean expression is an
expression that evaluates to one of these values.

```ts
const yes = true;
const no = false;

const age = 18;
const canPurchase = age >= 18; // true
```

Here, `age >= 18` asks whether `age` is greater than or equal to `18`.
Because `age` is `18`, the expression evaluates to `true`.

```text
age = 18
   |
   v
Is age >= 18?
   |
   +-- yes --> true  --> canPurchase
   |
   +-- no  --> false --> canPurchase
```

## Checking results with assertions

The file imports Node.js's `assert` module and uses `assert.equal` to check
the results:

```ts
import assert from "assert";

const age = 18;
const canPurchase = age >= 18;

assert.equal(canPurchase, true);  // Passes: both values are true.
// assert.equal(canPurchase, false); // Fails: true is not false.
```

An assertion throws an error when the actual result does not match the
expected result. A passing assertion does not print anything. For Boolean
checks, `assert.strictEqual` is also useful because it checks without type
coercion.

## Comparison operators

Comparisons evaluate to `true` or `false`:

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `<` | Less than | `18 < 18` | `false` |
| `<=` | Less than or equal to | `18 <= 18` | `true` |
| `>` | Greater than | `18 > 18` | `false` |
| `>=` | Greater than or equal to | `18 >= 18` | `true` |
| `===` | Strictly equal | `3 === 3` | `true` |
| `!==` | Not strictly equal | `3 !== 10` | `true` |

The arithmetic examples in `index.ts` first calculate `1 + two`, then compare
the result:

```ts
const two = 2;
const isThree = 1 + two == 3;     // 3 == 3: true
const isNotThree = 1 + two !== 10; // 3 !== 10: true

assert.equal(isThree, true);
assert.equal(isNotThree, true);
```

The file uses `==` for the first comparison. Unlike `===`, `==` can convert
values to different types before comparing them. Prefer `===` when you do not
want this conversion; `1 + two === 3` also evaluates to `true`.

## Comparing string literals

The file also contains a commented-out color comparison:

```ts
const favoriteColor = "yellow";
// const isFavoriteColorYellow = favoriteColor === "red";
```

TypeScript infers the literal type `"yellow"` for this `const`. It reports a
diagnostic for comparing it to `"red"` because those literal types have no
overlap; the comparison cannot be true. In JavaScript, the comparison itself
would simply evaluate to `false` at runtime.

The name `isFavoriteColorYellow` would also be misleading when comparing
against `"red"`. To check for yellow instead:

```ts
const favoriteColor = "yellow";
const isFavoriteColorYellow = favoriteColor === "yellow"; // true
```

## Logical operators

Logical operators can combine or reverse Boolean expressions:

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `&&` | AND: both conditions must be true | `true && false` | `false` |
| `||` | OR: at least one condition must be true | `true || false` | `true` |
| `!` | NOT: reverses a Boolean | `!true` | `false` |

For example:

```ts
const age = 18;
const hasId = true;
const canEnter = age >= 18 && hasId; // true
```

```text
age >= 18 ---- true ----+
                        AND ---- true ----> canEnter
hasId -------- true ----+
```

Parentheses can group expressions and make the intended order clear:

```ts
const hasTicket = false;
const isStaff = true;
const canEnter = (age >= 18 && hasTicket) || isStaff; // true
```

Here the grouped AND expression is evaluated before the OR result. Logical
operators also *short-circuit*: `&&` skips its right side when the left side is
false, and `||` skips its right side when the left side is true. Therefore,
an expression inside parentheses is not necessarily evaluated if it is on a
skipped side.