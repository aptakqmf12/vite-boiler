const validateStringByRegex = (str: string, regex: string) => {
  return new RegExp(regex).test(str);
};

export const emailRule = (email: string) => {
  return validateStringByRegex(
    email,
    "^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z-.]+$"
  );
};

export const passwordRule = (password: string) => {
  return validateStringByRegex(
    password,
    "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%])[a-zA-Z0-9!@#$%]{8,15}$"
  );
};

//TODO: substr deprecated 라 대체필요
export const generatePhoneNumber = (value: any) => {
  value = value.replace(/-/g, "");
  const { length } = value;

  if (length < 4) {
    value = value;
  } else if (length < 7) {
    value = value.substr(0, 3) + "-" + value.substr(3);
  } else if (length < 11) {
    value =
      value.substr(0, 3) + "-" + value.substr(3, 3) + "-" + value.substr(6);
  } else {
    value =
      value.substr(0, 3) + "-" + value.substr(3, 4) + "-" + value.substr(7);
  }

  return value;
};
