import Link from "next/link";
import { ReactNode, ReactElement } from "react";
import { DarkLayout } from "@/components/layouts/DarkLayout";
import { MainLayout } from "@/components/layouts/MainLayout";
import { NextPage } from "next";

export default function AboutPage() {
  return (
    <>
      <h1>About Page</h1>
      <h1 className={"title"}>
        Ir a <Link href="/">Home</Link>
      </h1>
      <div className={"description"}>
        <p>
          Get started by editing&nbsp;
          <code className={"code"}>pages/about/index.tsx</code>
        </p>
      </div>
    </>
  );
}

AboutPage.getLayout = function getLayout(page : ReactElement): ReactElement {
  return (
    <MainLayout title="Contact">
      <DarkLayout>{page}</DarkLayout>
    </MainLayout>
  );
};


