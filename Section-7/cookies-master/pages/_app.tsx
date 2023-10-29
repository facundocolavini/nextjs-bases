import "@/styles/globals.css";
import { customTheme, darkTheme, lightTheme } from "@/themes";

import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppContext, AppProps } from "next/app";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
interface MyAppProps extends AppProps {
  theme: string;
}
function App({ Component, pageProps, theme = "dark" }: MyAppProps) {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);
  
  useEffect(() => {
    // Para sincronizar con el servidor y el cliente el mismo valor de la cookie cuando se monta el componente App
    const cookieTheme = Cookies.get("theme") || "light";
    const selectedTheme =
      cookieTheme === "light"
        ? lightTheme
        : cookieTheme === "dark"
        ? darkTheme
        : customTheme;

        setCurrentTheme(selectedTheme);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline /> {/* Resetea el css */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

/* 
// No recomendable por que perdemos el get static generation actualizaciones estaticas
App.getInitialProps = async (appContext: AppContext) => {
  const { theme } = appContext.ctx.req
    ? (appContext.ctx.req as any).cookies
    : { theme: "light" };
  const validTheme = ["light", "dark", "custom"];

  return {
    theme: validTheme.includes(theme) ? theme : "dark",
  };
};

*/
export default App;
