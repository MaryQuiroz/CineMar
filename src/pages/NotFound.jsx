import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-cinema-red mb-4">404</h1>
      <p className="text-xl text-white mb-8">Página no encontrada</p>
      <Link 
        to="/" 
        className="px-6 py-2 bg-cinema-red text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
