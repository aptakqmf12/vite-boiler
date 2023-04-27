import { useEffect, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { theme, muiTheme } from "./style/theme";

import useDisplay from "./hook/useDisplay";
import { useLoginStore } from "@store/login";
import RouterComponents from "./route";
import { GlobalStyle } from "./style/style";
import "./locale/i18n";

import { Button } from "@mui/material";

function App() {
  const { isLogin, setLogin } = useLoginStore();
  const display = useDisplay();
  const themes = { ...theme, ...display };

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      setLogin(true);
    }
  }, [isLogin]);

  return (
    <StyledThemeProvider theme={themes}>
      <MuiThemeProvider theme={muiTheme}>
        <GlobalStyle />

        <RouterComponents />
      </MuiThemeProvider>
    </StyledThemeProvider>
  );
}

export default App;
