import PopularNovels from '../components/PopularNovels';
import NewNovels from '../components/NewNovels';
import RecentlyUpdated from '../components/RecentlyUpdated';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Admin() {
  return (
    <>
      <Header />
      <main className="bg-[#f7f7f7]" id="main">
        <PopularNovels />
        <NewNovels />
        <RecentlyUpdated />
      </main>
      <Footer />
    </>
  );
} 