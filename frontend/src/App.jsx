import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index.jsx'; // Certifique-se que o caminho está certo
import Terms from './pages/Terms.jsx';
import Dmca from './pages/Dmca.jsx';
import Privacy from './pages/Privacy.jsx';
import Sign_in from './pages/Sign_in.jsx';
import Sign_up from './pages/Sign_up.jsx';
import Code_up from './pages/Code_up.jsx';
import Admin from './pages/Admin.jsx';
import Categories from './pages/Categories.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/dmca" element={<Dmca />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/sign-in" element={<Sign_in />} />
        <Route path="/sign-up" element={<Sign_up />} />
        <Route path="/code" element={<Code_up />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

