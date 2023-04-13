import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Resizable } from "re-resizable";

interface ResizeTestProps {
  children: React.ReactNode;
}
export default function ResizeTest({ children }: ResizeTestProps) {
  return (
    <Resizable
      defaultSize={{ width: 320, height: 300 }}
      minWidth={"20%"}
      maxWidth={"80%"}
      enable={{
        top: false,
        right: true,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
      style={{ border: "1px black solid" }}
    >
      {children}
    </Resizable>
  );
}

const div = {
  wrap: styled.div`
    border: 1px black solid;
  `,
};
