import Head from "next/head";
import { FC } from "react";

interface Props {
  children: React.ReactNode;
  title?: string;
}

export const Layout: FC<Props> = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Facundo Colavini" />
        <meta
          name="description"
          content={`Información sobre el pokémon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Navbar */}
      <main>{children}</main>
    </>
  );
};
