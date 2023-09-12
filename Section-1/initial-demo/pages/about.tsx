import Navbar from "@/components/Navbar";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="About Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>About Page</h1>
        <h1 className={styles.title}>
          Ir a <Link href="/">Home</Link>{" "}
        </h1>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.tsx</code>
          </p>
        </div>
      </main>
    </>
  );
}
