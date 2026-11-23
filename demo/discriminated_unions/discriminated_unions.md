# Discriminated Unions

A discriminated union is a union of object types that share a property whose
value is a different literal for each member. That shared property is called
the **discriminant** (or **tag**). TypeScript uses its value to narrow the
union to the matching object type.

The example in [`index.ts`](./index.ts) models the possible results of
creating an account:

```ts
type AccountCreationMessage =
  | { kind: "ok"; greeting: string }
  | { kind: "passwordComplexityFailure"; message: string }
  | { kind: "usernameExists" };
```

Each member has a distinct `kind` value. The success case carries a `greeting`,
the password failure carries a `message`, and the username-exists case needs
no additional data.

## Creating values

Each value must match one complete member of the union:

```ts
const ok: AccountCreationMessage = {
  kind: "ok",
  greeting: "Welcome to the platform",
};

const passwordTooShort: AccountCreationMessage = {
  kind: "passwordComplexityFailure",
  message: "Password must be at least 10 characters",
};

const exists: AccountCreationMessage = {
  kind: "usernameExists",
};
```

The discriminant determines which fields are valid. For example, an object
with `kind: "ok"` needs a `greeting`; `message` belongs to the password-failure
case. The `"usernameExists"` case has no extra required fields.

## Narrowing with `switch`

Check the discriminant before accessing a member-specific property:

```ts
function showMessage(msg: AccountCreationMessage): void {
  switch (msg.kind) {
    case "ok":
      console.log(msg.greeting);
      break;
    case "passwordComplexityFailure":
      console.log(msg.message);
      break;
    case "usernameExists":
      console.log("That username already exists");
      break;
  }
}

showMessage(ok);
showMessage(passwordTooShort);
showMessage(exists);
```

Inside each `case`, TypeScript narrows `msg` to the corresponding object
type. Therefore, `msg.greeting` is available in the `"ok"` case and
`msg.message` is available in the `"passwordComplexityFailure"` case. The
distinct literal values prevent accidentally treating one result as another.

## When to use a discriminated union

Use one when a value can have a small set of known variants, and each variant
may carry different data or require different handling. It keeps the variant
and its data together, makes branching clear, and lets TypeScript report
invalid combinations or access to fields that are not available on every
member.