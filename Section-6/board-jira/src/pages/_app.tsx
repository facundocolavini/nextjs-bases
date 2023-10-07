import "@/styles/globals.css";
import { darkTheme, lightTheme } from "@/themes";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import type { AppProps } from "next/app";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />  {/* Resetea el css */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
