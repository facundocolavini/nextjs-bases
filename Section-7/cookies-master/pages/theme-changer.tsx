import { Layout } from "@/components/layouts";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import { ChangeEvent, FC, useEffect, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { on } from "events";
import axios from "axios";

interface ThemeChangerPageProps {
  theme: string;
}
const ThemeChangerPage: FC<ThemeChangerPageProps> = ({theme}) => {
 
  const [currentTheme, setCurrentTheme] = useState(theme);

  const onChangeTheme = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentTheme(event.target.value);
    localStorage.setItem("theme", event.target.value);
    Cookies.set("theme", event.target.value);
  };

  const onClick = async() => {
    const {data} = await axios.get("/api/hello");
    console.log({data});

  }

  useEffect(() => {
    console.log(localStorage.getItem("theme"));
    console.log(Cookies.get("theme")); // Lee la cookie desde el cliente
  }, []);

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Tema:</FormLabel>
            <RadioGroup value={currentTheme} onChange={onChangeTheme}>
              <FormControlLabel
                value={"light"}
                control={<Radio />}
                label={"Light"}
              />
              <FormControlLabel
                value={"dark"}
                control={<Radio />}
                label={"Dark"}
              />
              <FormControlLabel
                value={"custom"}
                control={<Radio />}
                label={"Custom"}
              />
            </RadioGroup>
          </FormControl>
          <Button onClick={onClick}>Solicitud</Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // Leer cookies desde el servidor
  const { theme = "light"} = req.cookies;
  const validTheme = ["light", "dark", "custom"];

  return {
    props: {
      theme: validTheme.includes(theme) ? theme : "dark",

    },
  };
};

export default ThemeChangerPage;
