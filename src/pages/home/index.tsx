import { useState, useEffect } from "react";
import styled from "styled-components";
import { Home, People, DocumentScanner, Backpack } from "@mui/icons-material";
import { useWindowStore } from "@store/window";

import RiskEvaluate from "@components/packages/riskEvaluate";
import Spreadjs from "@components/packages/spreadjs";
import Wijmo from "@components/packages/wijmo";

// import Window from "../../components/layout/window/window";
import Window from "@components/layout/window";
import Header from "@components/layout/header";

import { useNavigate } from "react-router-dom";
import { useLoginStore } from "@store/login";

export default function MyHome() {
  const { currentWindows, appendWindow } = useWindowStore();
  const { isLogin } = useLoginStore();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isLogin === false) {
  //     navigate("/signin");
  //   }
  // }, [isLogin]);

  const iconSx = { width: 80, height: 80 };
  const FIXED_STATIONS = [
    {
      icon: <Home sx={iconSx} />,
      onclick: () =>
        appendWindow({ name: "위험성 평가", component: <RiskEvaluate /> }),
    },
    // {
    //   icon: <Backpack sx={iconSx} />,
    //   onclick: () =>
    //     appendWindow({
    //       name: "엑셀 시트",
    //       component: <Spreadjs />,
    //       w: 1200,
    //       h: 800,
    //     }),
    // },
    {
      icon: <DocumentScanner sx={iconSx} />,
      onclick: () => appendWindow({ name: "위즈모", component: <Wijmo /> }),
    },
  ];

  return (
    <div.wrap>
      <Header />

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
        <Window {...window} key={window.uuid} />
      ))}
    </div.wrap>
  );
}

const div = {
  wrap: styled.div`
    width: 100vw;
    height: 100vh;
  `,
  station: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: calc(100% - 50px);

    background-color: #ddd7e6;
  `,

  grid: styled.div`
    ul {
      /* display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px; */
      li {
        cursor: pointer;
      }
    }
  `,
};
