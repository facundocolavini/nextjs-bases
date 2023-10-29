import Head from "next/head";
import { FC } from "react";
import { Navbar } from "../ui";

interface Props {
    children : React.ReactNode 
}
export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>Layout</Head>   
      <Navbar />
      <main style={{ padding: "20px 50px" }}>{children}</main>
    </>
  );
};
