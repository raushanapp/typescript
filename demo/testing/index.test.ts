// jest
import { concat, div, slowString, failedString } from "./index";

it('Should say "Hello, World!"', () => {
  expect(concat("Hello, ", "World")).toEqual("Hello, World");
});

it("Should divide numbers correctly", () => {
  expect(div(6, 2)).toEqual(3);
  expect(div(10, 2)).toEqual(5);
});
it("should fail to divide by zero", () => {
  expect(() => {
    div(10, 0);
  }).toThrow("Cannot divide by zero");
});

//  Aync Promise test

test("slow string fetches sample test", async () => {
  slowString()
    .then((result) => {
      expect(result).toEqual("sample");
    })
    .catch((error) => expect(error).toBeUndefined());
});

test("failed string fails with a whoops", async () => {
  failedString()
    .then((result) => {
      expect(result).toBeUndefined();
    })
    .catch((error) => expect(error).toEqual("whoops"));
});
