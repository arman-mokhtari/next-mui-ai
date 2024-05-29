"use client";

import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
    background: {
      default: "#F1F1F1",
    },
  },
  typography: {
    fontFamily: "inherit",
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export const darkTheme = createTheme({
  direction: "rtl",
  palette: {
    mode: "dark",
    background: {
      default: "#22273b",
    },
  },
  typography: {
    fontFamily: "inherit",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1C2331",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});
