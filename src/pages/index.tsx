import Chatbox from '@/components/Chatbox';
import Contacts from '@/components/Contacts';
import About from '@/components/Game/About';
import LinksWrapper from '@/components/LinksWrapper';
import Seo from '@/components/Seo';
import GameWrapper from '@/components/gameWrapper';
import Layout from '@/components/layout/Layout';

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <main>
        <div className="App" style={{ scrollBehavior: 'smooth' }}>
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
