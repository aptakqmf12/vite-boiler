//import { emailRule, passwordRule } from './inputRule';
const { emailRule, passwordRule } = require("./inputRule");

test("email validation fail", () => {
  expect(emailRule("aptakqmf12")).toBe(false);
});
test("email validation fail", () => {
  expect(emailRule("aptakqmf12@gmail")).toBe(false);
});
test("email validation fail", () => {
  expect(emailRule("aptakqmf12@gmail.")).toBe(false);
});
test("email validation success", () => {
  expect(emailRule("aptakqmf12@gmail.com")).toBe(true);
});

test("password validation fail - under 8", () => {
  expect(passwordRule("abcdefg")).toBe(false);
});
test("password validation success", () => {
  expect(passwordRule("abcdefg12")).toBe(true);
});
