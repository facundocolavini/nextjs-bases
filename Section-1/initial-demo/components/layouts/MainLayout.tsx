import Head from "next/head";

import styles from "@/components/layouts/MainLayout.module.css";
import Navbar from "../Navbar/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const MainLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={`${styles.main}`}>{children}</main>
    </div>
  );
};
