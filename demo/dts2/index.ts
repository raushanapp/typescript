/* eslint-disable */
import { strict as assert } from "assert";

// Useful links:
// https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html
//

import { apiResponse } from "./mylib";

const response = apiResponse();

if (response !== undefined) {
  if (response.status === "success") {
    // Handle success case
    console.log(response.data.items[0].name);
  } else {
    // Handle failure case
  }
}
assert(response !== undefined);
assert(response.status === "success" || response.status === "failure");
