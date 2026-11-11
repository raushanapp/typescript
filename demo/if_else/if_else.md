# If-Else Statements in TypeScript

The examples in [`index.ts`](./index.ts) use `if`, `else if`, and `else` to
choose which statements run based on conditions. JavaScript evaluates the
condition for truthiness; comparisons such as `age >= 18` produce Boolean
values. The `if` block runs when its condition is truthy, and an optional
`else` block runs when it is falsy.

## `if` and `else`

The first example checks whether an age is at least 18:

```ts
const age = 25;
if (age >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are not an adult.");
}
```

Since `25 >= 18` is `true`, only the first message is printed. If the
condition were false, the `else` block would print the other message. The
braces mark the statements belonging to each branch.

## Choosing among multiple branches

Use `else if` when there are several mutually exclusive outcomes:

```ts
const score = 85;
let grade;
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else if (score >= 60) {
  grade = "D";
} else {
  grade = "F";
}
console.log(`Your grade is ${grade}.`);
```

Conditions are checked from top to bottom. Once a condition is `true`, its
block runs and the remaining `else if` and `else` branches are skipped. With a
score of `85`, the first condition is false and the second is true, so the
grade is `"B"`. The order matters: a broader condition such as `score >= 60`
placed first would match many scores before the more specific conditions.
The final `else` is the fallback when none of the preceding conditions match.

## Combining conditions

An `if` condition can use logical operators to express more than one
requirement. The source checks club access with AND (`&&`):

```ts
const isMember = true;
const hasPaidDues = false;

if (isMember && hasPaidDues) {
  console.log("Full Club Access granted.");
} else {
  console.log("Limited Club Access");
}
```

AND is true only when both conditions are true. Here, `hasPaidDues` is false,
so the full-access branch does not run.

The discount example uses OR (`||`):

```ts
const isStudent = false;
const hasCoupon = true;

if (isStudent || hasCoupon) {
  console.log("eligible for discount");
} else {
  console.log("not eligible for discount");
}
```

OR is true when at least one condition is true. Here, the coupon makes the
condition true, so the eligible message is printed even though `isStudent` is
false. Logical operators short-circuit: `&&` skips its right side when the
left side is false, and `||` skips its right side when the left side is true.

## Control flow

Control flow is the order in which a program's statements execute. An `if` /
`else if` / `else` chain directs that flow by selecting one matching branch.
Statements after the chain continue executing normally; for example, the
grade message is printed after the grade has been assigned.
