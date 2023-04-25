import { createTheme } from "@mui/material/styles";

const colors = {
  primary: "#f0f",
  second: "#3b6fdf",
};

export const theme = { colors };
export type ColorsType = typeof colors;

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#f00",
    },
    secondary: {
      main: "#ff8400",
    },
    success: {
      main: "#42a5f5",
    },
    error: {
      main: "#ef5350",
    },
    info: {
      main: "#4caf50",
    },
    warning: {
      main: "#ff9800",
    },
  },
  typography: {},
});
