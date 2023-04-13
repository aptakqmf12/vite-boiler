import { useState } from "react";
import styled from "styled-components";
import Window from "../../components/layout/window";
import WindowLib from "../../components/layout/windowLib";
import Template, {
  TabStatus,
  TemplateProps,
} from "../../components/layout/template";
import {
  Home,
  People,
  DocumentScanner,
  Backpack,
  MobileFriendly,
  WindowOutlined,
} from "@mui/icons-material";
import { useWindowStore } from "../../store";

import RiskEvaluate from "../../components/packages/riskEvaluate";

export default function MyHome() {
  const { currentWindows, appendWindow } = useWindowStore();

  const iconSx = { width: 80, height: 80 };
  return (
    <div.wrap>
      <div.station className="station">
        <div.grid>
          <div onClick={() => appendWindow({ component: <RiskEvaluate /> })}>
            <Home sx={iconSx} />
          </div>
          <People sx={iconSx} />
          <DocumentScanner sx={iconSx} />
          <Backpack sx={iconSx} />
          <MobileFriendly sx={iconSx} />
          <WindowOutlined sx={iconSx} />
        </div.grid>
      </div.station>

      {currentWindows.map((window, i) => (
        <WindowLib {...window} key={i} />
      ))}
    </div.wrap>
  );
}

const div = {
  wrap: styled.div``,

  station: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #ddd7e6;
  `,

  grid: styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  `,
};
