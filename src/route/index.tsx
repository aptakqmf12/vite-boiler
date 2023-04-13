import { Route, Routes } from "react-router-dom";
import MyHome from "../pages/home";

const RouterComponents = () => {
  return (
    <Routes>
      <Route path="/" element={<MyHome />} />
    </Routes>
  );
};

export default RouterComponents;
