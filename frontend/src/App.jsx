import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index.jsx';
import Terms from './pages/Terms.jsx';
import Dmca from './pages/Dmca.jsx';
import Privacy from './pages/Privacy.jsx';
import Sign_in from './pages/Sign_in.jsx';
import Sign_up from './pages/Sign_up.jsx';
import Code_up from './pages/Code_up.jsx';
import Categories from './pages/Categories.jsx';
import Code_in from './pages/Code_in.jsx';
import AdminRoute from './components/Admin_route.jsx';
import Add_novels from './pages/Add_novels.jsx';
import Novel from './pages/Novel.jsx';
import Chapter from './pages/Chapter.jsx';
import NovelsUpdated from './pages/NovelsUpdated';
import Tags from './pages/Tags.jsx';
import NovelsByTag from './pages/NovelByTags';
import './index.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/dmca" element={<Dmca />} />
      <Route path="/privacy-policy" element={<Privacy />} />
      <Route path="/sign-in" element={<Sign_in />} />
      <Route path="/sign-up" element={<Sign_up />} />
      <Route path="/code" element={<Code_up />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/code-in" element={<Code_in />} />
      <Route path="/novel/:novelId" element={<Novel />} />
      <Route path="/add_novels" element={
        <AdminRoute>
          <Add_novels />
        </AdminRoute>
      } />
      <Route path="/chapter/:chapterId" element={<Chapter />} />
      <Route path="/novelsUpdated" element={<NovelsUpdated />} />
      <Route path="/tags" element={<Tags/>} />
      <Route path="/tags/:tag" element={<NovelsByTag />} />
    </Routes>
  );
}

export default App;

