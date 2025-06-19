import PopularNovels from '../components/PopularNovels';
import NewNovels from '../components/NewNovels';
import RecentlyUpdated from '../components/RecentlyUpdated';

export default function Index() {
  return (
    <>
      <main className="main" id="main" >
        <PopularNovels />
        <NewNovels />
        <RecentlyUpdated />
      </main>
    </>
  );
}  