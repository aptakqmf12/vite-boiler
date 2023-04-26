import { useState, useEffect } from "react";
import styled from "styled-components";
import { useWindowStore } from "../../store/window";
import { useTranslation } from "react-i18next";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { Chip, Avatar } from "@mui/material";

export default function Header() {
  const { i18n } = useTranslation();
  const { currentWindows, toggleShowWindow } = useWindowStore();
  const [language, setLanguage] = useState<string>("");

  useEffect(() => {
    setLanguage(localStorage.getItem("language") || "ko");
  }, []);

  const handleChange = (e: SelectChangeEvent) => {
    setLanguage(e.target.value as string);
  };

  return (
    <header.wrap>
      <Select value={language} onChange={handleChange}>
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
    </header.wrap>
  );
}

const header = {
  wrap: styled.header`
    display: flex;
    height: 30px;
    gap: 8px;
    position: absolute;
    left: 10px;
    top: 10px;
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
