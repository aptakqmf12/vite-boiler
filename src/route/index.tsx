import { Route, Routes } from "react-router-dom";
import MyHome from "../pages/home";
import Signin from "@components/sign/signin";
import SignUp from "@components/sign/signup";

const RouterComponents = () => {
  return (
    <Routes>
      <Route path="/" element={<MyHome />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default RouterComponents;
