import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const fonts = { main: `'Plus Jakarta Sans', sans-serif` };

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const colors = {
  darkOne: "#151515",
  darkTwo: "#1B1B1D",
  lightOne: "#fff",
  lightTwo: "#f6f6f6",
};

const components = {
  Text: {
    baseStyle: {
      fontFamily: "main",
      fontWeight: "400",
      fontSize: "1rem",
    },
  },
  Heading: {
    baseStyle: {
      fontFamily: "main",
    },
  },
  Button: {
    baseStyle: {
      fontFamily: "main",
    },
  },
  Input: {
    baseStyle: {
      fontFamily: "main",
    },
  },
  Select: {
    baseStyle: {
      fontFamily: "main",
    },
  },
};

const theme = extendTheme({
  colors,
  fonts,
  components,
  config,
  styles: {
    global: {
      body: {
        fontFamily: "main",
      },
    },
  },
});

export default theme;
