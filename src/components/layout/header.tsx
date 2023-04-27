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
} from "@mui/material";
import { Person, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { requestLogout, testApi } from "@api/sign";

export default function Header() {
  const navigate = useNavigate();
  const { isLogin, setLogin } = useLoginStore();
  const { i18n } = useTranslation();
  const { currentWindows, toggleShowWindow } = useWindowStore();
  const [language, setLanguage] = useState<string>("");

  useEffect(() => {
    setLanguage(localStorage.getItem("language") || "ko");
  }, []);

  const onLanguageChange = (e: SelectChangeEvent) => {
    setLanguage(e.target.value as string);
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
      <div>
        <h1>Riskzero3.0 서울민정공사</h1>
      </div>
      <div>
        <Button variant="contained" onClick={onTestApi}>
          test
        </Button>
      </div>

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

        {/* <div>
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
        </div> */}

        <div>
          <Person sx={{ width: 30, height: 30 }} />
        </div>
        <div onClick={onLogout}>
          <Logout sx={{ width: 30, height: 30 }} />
        </div>
      </div.user>
    </header.wrap>
  );
}

const header = {
  wrap: styled.header`
    display: flex;
    justify-content: space-between;
    height: 50px;
    gap: 8px;
    padding: 0 10px;
  `,
};

const div = {
  logo: styled.div``,
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
