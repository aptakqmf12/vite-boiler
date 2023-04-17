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
import Spreadjs from "../../components/packages/spreadjs";
import Wijmo from "../../components/packages/wijmo";

export default function MyHome() {
  const { currentWindows, appendWindow } = useWindowStore();

  const iconSx = { width: 80, height: 80 };

  const FIXED_STATIONS = [
    {
      icon: <Home sx={iconSx} />,
      onclick: () =>
        appendWindow({
          component: <RiskEvaluate />,
          isFullScreen: false,
        }),
    },
    {
      icon: <People sx={iconSx} />,
      onclick: () =>
        appendWindow({
          component: <Spreadjs />,
          w: 1200,
          h: 800,
          isFullScreen: false,
        }),
    },
    {
      icon: <DocumentScanner sx={iconSx} />,
      onclick: () =>
        appendWindow({
          component: <Wijmo />,
          isFullScreen: false,
        }),
    },
  ];

  return (
    <div.wrap>
      <div.station className="station">
        <div.grid>
          {FIXED_STATIONS.map((station, i) => (
            <div onClick={station.onclick} key={i}>
              {station.icon}
            </div>
          ))}
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
