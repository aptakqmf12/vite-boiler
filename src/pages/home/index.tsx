import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Window from "../../components/layout/windowLib";
import WindowCustom from "../../components/layout/windowCustom";
import WindowTemplate from "../../components/hoc/windowTemplate";
import { TabStatus, TemplateProps } from "../../components/layout/template";

export default function Home() {
  const TAB1: TemplateProps[] = [
    {
      name: "위험성평가1",
      status: TabStatus.ONE,
      component: <div>위험성평가1</div>,
    },
    {
      name: "위험성평가2",
      status: TabStatus.TWO,
      component: <div>위험성평가2</div>,
    },
    {
      name: "위험성평가3",
      status: TabStatus.THREE,
      component: <div>위험성평가3</div>,
    },
  ];
  const TAB2: TemplateProps[] = [
    {
      name: "게시판1",
      status: TabStatus.ONE,
      component: <div>게시판1</div>,
    },
    {
      name: "게시판2",
      status: TabStatus.TWO,
      component: <div>게시판2</div>,
    },
    {
      name: "게시판3",
      status: TabStatus.THREE,
      component: <div>게시판3</div>,
    },
  ];
  return (
    <div.wrap>
      <WindowTemplate data={TAB1} />
      {/* <WindowTemplate data={TAB2} /> */}
      {/* <AnimatePresence></AnimatePresence>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        transition={{ type: "spring" }}
        animate={{ opacity: 1 }}
        drag
        dragConstraints={{
          top: -10,
          right: -10,
          bottom: -10,
          left: -10,
        }}
        style={{ width: 100, height: 100, border: "1px red solid" }}
      ></motion.div> */}
    </div.wrap>
  );
}

const div = {
  wrap: styled.div`
    padding: 20px;
    /* color: ${({ theme: { isDesktop } }) => (isDesktop ? "red" : "blue")}; */
  `,

  box: styled.div`
    width: 200px;
    height: 200px;
    border: 1px red dashed;
  `,
};
