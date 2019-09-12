export default {
  palette: {
    common: {
      black: "#000000",
      white: "#ffffff"
    },
    background: {
      paper: "#27002f",
      default: "#110013"
    },
    primary: {
      light: "#cf70af",
      main: "#bd10ff",
      dark: "#9013fe",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#cf70af",
      main: "rgb(239, 196, 255)",
      dark: "#9013fe",
      contrastText: "#ffffff"
    },
    error: {
      light: "#e57373",
      main: "#ff0000",
      dark: "#d32f2f",
      contrastText: "#ffffff"
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffc7e391",
      disabled: "rgba(189, 16, 255, 0.16)",
      hint: "#7ed321"
    }
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: 14,
        color: "#ffffff",
        backgroundColor: "#bd10e0"
      }
    }
  },
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  visibleSeparator: {
    borderBottom: "1px solid #ffc7e391",
    width: "100%",
    marginBottom: 15
  }
};
