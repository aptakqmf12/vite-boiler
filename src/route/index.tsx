import { Route, Routes } from "react-router-dom";
import MyHome from "../pages/home";
import Signin from "@components/pages/signin";
import SignUp from "@components/pages/signup";
import Mypage from "@components/pages/mypage";

const RouterComponents = () => {
  return (
    <Routes>
      <Route path="/" element={<MyHome />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  );
};

export default RouterComponents;
