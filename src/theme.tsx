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
      fontFamily: "Plus Jakarta Sans",
      fontWeight: "400",
      fontSize: "1rem",
    },
  },
  Heading: {
    baseStyle: {
      fontFamily: "Plus Jakarta Sans",
    },
  },
  Button: {
    baseStyle: {
      fontFamily: "Plus Jakarta Sans",
    },
  },
  Input: {
    baseStyle: {
      fontFamily: "Plus Jakarta Sans",
    },
  },
  Select: {
    baseStyle: {
      fontFamily: "Plus Jakarta Sans",
    },
  },
};

const theme = extendTheme({
  colors,
  fonts,
  components,
  config,
});

export default theme;
