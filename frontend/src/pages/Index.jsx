import PopularNovels from '../components/PopularNovels';
import NewNovels from '../components/NewNovels';
import RecentlyUpdated from '../components/RecentlyUpdated';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Index() {
  return (
    <>
      <Header />
      <main className="main" id="main" >
        <PopularNovels />
        <NewNovels />
        <RecentlyUpdated />
      </main>
      <Footer />
    </>
  );
}  