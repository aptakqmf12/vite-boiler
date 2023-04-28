import { useState, useEffect } from "react";
import styled from "styled-components";
import { useWindowStore } from "../../store/window";
import { useLoginStore } from "@store/login";
import { useTranslation } from "react-i18next";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  Chip,
  Avatar,
  Button,
  Switch,
  styled as muiStyled,
} from "@mui/material";
import { Person, Logout, ExitToApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { requestLogout, testApi } from "@api/sign";

export default function Header() {
  const navigate = useNavigate();
  const { isLogin, setLogin } = useLoginStore();
  const { i18n } = useTranslation();
  const { currentWindows, toggleShowWindow } = useWindowStore();

  const [site, setSite] = useState<string>("A 현장");
  const [onWidget, setonWidget] = useState(false);

  const onSiteChange = (e: SelectChangeEvent) => {
    setSite(e.target.value as string);
  };

  const onLogout = () => {
    requestLogout();

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setLogin(false);
    navigate("/signin");
  };

  const onTestApi = () => {
    testApi();
  };

  return (
    <header.wrap>
      <div.user>
        <ul.nav>
          {currentWindows.map((window, i) => (
            <li onClick={() => toggleShowWindow(window.uuid)} key={i}>
              <Chip
                avatar={<Avatar>{window.name.slice(0, 1)}</Avatar>}
                label={window.name}
                variant="filled"
                color={window.isShow ? "primary" : "default"}
                style={{ cursor: "pointer" }}
              />
            </li>
          ))}
        </ul.nav>

        <>
          <Select
            value={site}
            onChange={onSiteChange}
            sx={{ width: 300, backgroundColor: "white", borderRadius: 10 }}
            size="small"
          >
            <MenuItem value={"A 현장"}>A 현장</MenuItem>
            <MenuItem value={"B 현장"}>B 현장</MenuItem>
          </Select>
        </>

        <div onClick={() => navigate("/mypage")}>
          <Person sx={{ width: 30, height: 30 }} style={{ color: "white" }} />
        </div>

        <div onClick={onLogout}>
          <ExitToApp
            sx={{ width: 30, height: 30 }}
            style={{ color: "white" }}
          />
        </div>
      </div.user>

      <div.switch>
        {/* <MaterialUISwitch
          value={onWidget}
          onChange={(e) => setonWidget(e.target.checked)}
        /> */}
        <Switch
          value={onWidget}
          onChange={(e) => setonWidget(e.target.checked)}
          size="medium"
        />
      </div.switch>
    </header.wrap>
  );
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",

      "& .MuiSwitch-thumb:before": {
        content: "'off'",
      },

      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#8796A5",
      },
    },
  },

  "& .MuiSwitch-thumb": {
    backgroundColor: "#003892",
    width: 32,
    height: 32,

    "&:before": {
      content: "'on'",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#4474c1",
    borderRadius: 20 / 2,
  },
}));

const header = {
  wrap: styled.header`
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;

    gap: 50px;

    border: 1px dashed black;
  `,
};

const div = {
  user: styled.div`
    display: flex;
    align-items: center;
    height: inherit;
    gap: 10px;

    div {
      display: flex;
      align-items: center;
      height: inherit;
    }
  `,
  switch: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
};

const ul = {
  nav: styled.ul`
    display: flex;
    gap: 10px;

    li {
      cursor: pointer;
    }
  `,
};

// language

// const [language, setLanguage] = useState<string>("");

// useEffect(() => {
//   setLanguage(localStorage.getItem("language") || "ko");
// }, []);

// const onLanguageChange = (e: SelectChangeEvent) => {
//   setLanguage(e.target.value as string);
// };

/* <div>
  <Select value={language} onChange={onLanguageChange}>
    <MenuItem
      value={"ko"}
      onClick={() => {
        i18n.changeLanguage("ko");
        localStorage.setItem("language", "ko");
      }}
    >
      ko
    </MenuItem>
    /
    <MenuItem
      value={"en"}
      onClick={() => {
        i18n.changeLanguage("en");
        localStorage.setItem("language", "en");
      }}
    >
      en
    </MenuItem>
  </Select>
</div> */
