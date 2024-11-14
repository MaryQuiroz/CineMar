// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import MovieList from './pages/MovieList';
import ComingSoon from './pages/ComingSoon';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import MovieDetail from './pages/MovieDetail';
import { ToastProvider } from './components/common/Toast';

function App() {
  return (
    <ToastProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cartelera" element={<MovieList />} />
          <Route path="pelicula/:id" element={<MovieDetail />} />
          <Route path="proximos-estrenos" element={<ComingSoon />} />
          <Route path="contacto" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
    </ToastProvider>
  );
}

export default App;