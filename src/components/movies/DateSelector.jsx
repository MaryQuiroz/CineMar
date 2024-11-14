import { useState, useEffect } from 'react';

const DateSelector = ({ onSelect, selectedDate }) => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    // Generar fechas para los próximos 7 días
    const generateDates = () => {
      const today = new Date();
      const nextDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() + i);
        return date;
      });
      setDates(nextDates);
    };

    generateDates();
  }, []);

  const formatDay = (date) => {
    return date.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase();
  };

  const formatDate = (date) => {
    return date.getDate();
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="mb-6">
      <h3 className="text-white font-semibold mb-3">Selecciona una fecha</h3>
      <div className="grid grid-cols-7 gap-2">
        {dates.map((date) => (
          <button
            key={date.toISOString()}
            onClick={() => onSelect(date)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              selectedDate?.toDateString() === date.toDateString()
                ? 'bg-cinema-red text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="text-xs mb-1">{formatDay(date)}</span>
            <span className="text-lg font-semibold">{formatDate(date)}</span>
            {isToday(date) && (
              <span className="text-xs mt-1 text-cinema-red">HOY</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DateSelector;
