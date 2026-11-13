/* eslint-disable */
import { strict as assert } from "assert";

interface Userprofile {
  userName: string;
  email?: string;
}

const propfile: Userprofile = {
  userName: "Bob",
};

const propfile1: Userprofile = {
  userName: "Bob",
  email: "bob@example.com",
};

function logUser(user: Userprofile) {
  //  nullish coalescing operator will provide a default value if user.email is null or undefined
  const eamil = user.email ?? "Not provided";
  console.log(`User: ${user.userName}, Email: ${eamil}`);
}
logUser(propfile);
logUser(propfile1);
