import Link from "next/link";
import { CSSProperties } from "react";
import { useRouter } from "next/router";

interface Props {
  hrefPath: string;
  text: string;
}
const style: CSSProperties = {
  color: "#0070f3",
  textDecoration: "underline",
};

export const ActiveLink = ({ hrefPath, text }: Props) => {
  const { asPath } = useRouter();

  return (
    <Link href={hrefPath} style={asPath === hrefPath ? style : undefined}>
      {text}
    </Link>
  );
};
