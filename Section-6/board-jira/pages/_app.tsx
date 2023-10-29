
import "../styles/globals.css";

import { CssBaseline, ThemeProvider } from "@mui/material";

import type { AppProps } from "next/app";
import { EntriesProvider } from "../context/entries";
import { UIProvider } from "../context/ui";
import { darkTheme } from "../themes";
import { SnackbarProvider } from "notistack";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline /> {/* Resetea el css */}
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
    </SnackbarProvider>
  );
}
