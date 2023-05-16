import Seo from '@/components/Seo';
import Layout from '@/components/layout/Layout';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [health, setHealth] = useState<string>('not checked');

  useEffect(() => {
    const checkHelthy = async () => {
      const res = await fetch('/api/healthcheck');
      if (res.ok) {
        setHealth('ok');
      } else {
        setHealth('not ok');
      }
    };
    checkHelthy();
  }, []);
  return (
    <Layout>
      <Seo />
      <main>
        <div
          className="flex flex-col items-center w-full px-4 sm:px-8"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div>
            <h1>health check page</h1>
            <p>{health}</p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
