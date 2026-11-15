# Async and Await in TypeScript

`async` and `await` provide a readable way to work with promises. The example
in [`index.ts`](./index.ts) fetches a user and returns an object containing
the user's name.

## An async function returns a promise

```ts
async function fetchUserData(userId: number): Promise<{ name: string }> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );
  const data = await response.json();
  return { name: data.name };
}
```

An `async` function always returns a `Promise`. Here, the promise resolves to
an object with a `name` string. `await` waits for each promise to settle
before continuing this function: first the `fetch` promise, then the promise
from parsing the response as JSON. It does not block other JavaScript from
running while those operations are pending.

The function returns only `{ name: data.name }`, not the complete response
body. This example assumes the JSON contains a string `name`; `response.json()`
does not validate that shape for TypeScript. It also does not check
`response.ok`: `fetch` usually resolves even for HTTP error statuses such as
404. Production code should check the status and validate external data before
relying on its shape.

## Handle the resolved value with `await`

The first call site uses an immediately invoked async function so it can use
`await`:

```ts
(async () => {
  try {
    const userData = await fetchUserData(1);
    console.log(userData);
  } catch (error) {
    console.error(error);
  }
})();
```

The `try` block handles a rejection from `fetchUserData` (or an error thrown
while awaiting it). On success, the resolved object is logged. Catching an
error prevents it from becoming an unhandled rejection at this call site.

## Handle the same promise with `.then()` and `.catch()`

Promises can also be handled by chaining callbacks:

```ts
fetchUserData(1)
  .then((userData) => console.log(userData))
  .catch((error) => console.error(error));
```

The `.then()` callback receives the resolved value; `.catch()` handles a
rejection. This is an alternative to the `async`/`await` call-site style.

The source contains both call-site examples, and each invokes
`fetchUserData(1)` separately. Running the file therefore makes two requests
and logs the result twice. In a real program, use one of the two patterns for
a single request unless making two requests is intentional.