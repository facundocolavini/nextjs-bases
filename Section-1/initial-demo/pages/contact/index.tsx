import { MainLayout } from "@/components/layouts/MainLayout";
import styles from "@/components/layouts/MainLayout.module.css";

import Link from "next/link";

export default function ContactPage() {
  return (
    <MainLayout title="Contact">
      <h1>Contact Page</h1>
      <h1 className={'title'}>
        Ir a <Link href="/">Home</Link>
      </h1>
      <div className={'description'}>
        <p>
          Get started by editing&nbsp;
          <code className={'code'}>pages/contact/index.tsx</code>
        </p>
      </div>
    </MainLayout>
  );
}
