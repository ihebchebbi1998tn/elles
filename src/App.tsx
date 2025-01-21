import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Cart from './pages/Cart';
import Devis from './pages/Devis';
import Metiers from './pages/Metiers';
import Marques from './pages/Marques';
import Personalization from './pages/Personalization';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/devis" element={<Devis />} />
        <Route path="/metiers" element={<Metiers />} />
        <Route path="/marques" element={<Marques />} />
        <Route path="/personalization" element={<Personalization />} />
      </Routes>
    </Router>
  );
}

export default App;