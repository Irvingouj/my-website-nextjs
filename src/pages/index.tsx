import About from '@/components/About';
import Chatbox from '@/components/Chatbox';
import Contacts from '@/components/Contacts';
import GameWrapper from '@/components/GameWrapper';
import LinksWrapper from '@/components/LinksWrapper';
import Seo from '@/components/Seo';
import Layout from '@/components/layout/Layout';

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <main>
        <div
          className="flex flex-col items-center w-full px-4 sm:px-8"
          style={{ scrollBehavior: 'smooth' }}
        >
          <About />
          <GameWrapper />
          <Chatbox />
          <LinksWrapper />
          <Contacts />
        </div>
      </main>
    </Layout>
  );
}
