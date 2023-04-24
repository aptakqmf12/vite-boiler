const validateStringByRegex = (str: string, regex: string) => {
  return new RegExp(regex).test(str);
};

export const emailRule = (email: string) => {
  return validateStringByRegex(
    email,
    "^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z-.]+$"
  );
};

export const passwordRule = (password: string) => {
  return validateStringByRegex(
    password,
    "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%])[a-zA-Z0-9!@#$%]{8,15}$"
  );
};
