import { MainLayout } from "@/components/layouts/MainLayout";

import Link from "next/link";

export default function HomePage() {
  return (
    <MainLayout title="Pricing">
      <h1>Pricing Page</h1>
      <h1 className={'title'}>
        Ir a <Link href="/">Home</Link>{" "}
      </h1>
      <div className={'description'}>
        <p>
          Get started by editing&nbsp;
          <code className={'code'}>pages/pricing/index.tsx</code>
        </p>
      </div>
    </MainLayout>
  );
}
