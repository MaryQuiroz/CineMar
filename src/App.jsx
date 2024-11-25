// src/App.jsx
import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider 
} from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import MovieList from './pages/MovieList';
import ComingSoon from './pages/ComingSoon';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import MovieDetail from './pages/MovieDetail';
import { ToastProvider } from './components/common/Toast';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="cartelera" element={<MovieList />} />
      <Route path="pelicula/:id" element={<MovieDetail />} />
      <Route path="proximos-estrenos" element={<ComingSoon />} />
      <Route path="contacto" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}

export default App;
