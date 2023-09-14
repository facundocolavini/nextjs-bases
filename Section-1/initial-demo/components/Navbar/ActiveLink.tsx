import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  hrefPath: string;
  text: string;
}
const style = {
  color:'#0070f3',
  textDecoration: 'underline'
};

export const ActiveLink = ({ hrefPath, text }: Props) => {
  const { asPath } = useRouter();

  return (
    <Link href={hrefPath} style={asPath === hrefPath ? style : {}}>
            {text}
        </Link >
  );
};
