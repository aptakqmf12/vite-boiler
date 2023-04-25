import Header from "./components/layout/header";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { theme, muiTheme } from "./style/theme";

import useDisplay from "./hook/useDisplay";
import RouterComponents from "./route";
import { GlobalStyle } from "./style/style";
import "./locale/i18n";

function App() {
  const display = useDisplay();
  const themes = { ...theme, ...display };

  return (
    <StyledThemeProvider theme={themes}>
      <MuiThemeProvider theme={muiTheme}>
        <GlobalStyle />
        <Header />
        <RouterComponents />
      </MuiThemeProvider>
    </StyledThemeProvider>
  );
}

export default App;
