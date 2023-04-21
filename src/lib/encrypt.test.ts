import { encrypt } from "./encrypt";

test(" 암호화 테스트", () => {
  expect(encrypt("aptakqmf12")).toBe("");
});
