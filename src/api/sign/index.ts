import axios from "axios";

export const requestLogin = async (email: string, password: string) => {
  return await axios
    .post(`BASE_URL/login`, { email, password })
    .then((res) => {
      // access_token을 공통헤더에 저장
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.access_token}`;

      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return "아이디 비밀번호가 틀렸습니다";
    });
};

export const requestAccessToken = async (refreshToken: string) => {
  // expire
};
