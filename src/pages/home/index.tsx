import { useState } from "react";
import styled from "styled-components";
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
  TableBar,
} from "@mui/icons-material";
import { useWindowStore } from "../../store";

import RiskEvaluate from "../../components/packages/riskEvaluate";
import Spreadjs from "../../components/packages/spreadjs";
import Wijmo from "../../components/packages/wijmo";
import Signin from "../../components/sign/signin";

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
      icon: <Backpack sx={iconSx} />,
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
    {
      icon: <People sx={iconSx} />,
      onclick: () =>
        appendWindow({
          component: <Signin />,
          isFullScreen: false,
        }),
    },
  ];

  return (
    <div.wrap>
      <div>env.MODE : {import.meta.env.MODE}</div>
      <div>env.BASE_URL : {import.meta.env.BASE_URL}</div>
      <div>env.PROD : {String(import.meta.env.PROD)}</div>
      <div>env.DEV : {String(import.meta.env.DEV)}</div>
      <div>env.VITE_API_URL : {import.meta.env.VITE_API_URL}</div>
      <div.station className="station">
        <div.grid>
          <ul>
            {FIXED_STATIONS.map((station, i) => (
              <li onClick={station.onclick} key={i}>
                {station.icon}
              </li>
            ))}
          </ul>
        </div.grid>
      </div.station>

      {currentWindows.map((window, i) => (
        <WindowLib {...window} key={window.uuid} />
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
    ul {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      li {
        cursor: pointer;
      }
    }
  `,
};
