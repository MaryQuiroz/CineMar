import { useState, useEffect } from 'react';
import { fetchMovieSessions } from '../../services/movieService';

const SessionSelector = ({ movieId, selectedDate, onSelect, selectedSession }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSessions = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieSessions(movieId, selectedDate);
        setSessions(data.sessions);
      } catch (error) {
        console.error('Error al cargar sesiones:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSessions();
  }, [movieId, selectedDate]);

  if (loading) {
    return <div className="mt-6 text-white">Cargando sesiones...</div>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-white font-semibold mb-3">Selecciona una sesión</h3>
      <div className="grid grid-cols-2 gap-3">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => onSelect(session)}
            className={`p-3 rounded-lg transition-colors ${
              selectedSession?.id === session.id
                ? 'bg-cinema-red text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <div className="text-lg font-semibold">{session.time}</div>
            <div className="text-sm">
              {session.format} - {session.language}
            </div>
            <div className="text-xs mt-1">
              {session.seats} asientos disponibles
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SessionSelector;
