import CryptoJS from "crypto-js";

const secretKey = "secretKey";

export const encrypt = (value: string) => {
  return CryptoJS.AES.encrypt(value, secretKey).toString();
};
export const decrypt = (encrypted: any) => {
  return CryptoJS.AES.decrypt(encrypted, secretKey).toString(CryptoJS.enc.Utf8);
};
