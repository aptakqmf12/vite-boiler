import Header from "./components/layout/header";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme";
import useDisplay from "./hook/useDisplay";
import RouterComponents from "./route";
import { GlobalStyle } from "./style/style";

function App() {
  const display = useDisplay();
  const themes = { ...theme, ...display };

  return (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      <Header />
      <RouterComponents />
    </ThemeProvider>
  );
}

export default App;
