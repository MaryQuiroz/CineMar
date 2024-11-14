import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Ticket, 
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Users,
  CreditCard
} from 'lucide-react';
import { addDays, format } from 'date-fns';
import en from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';
import fr from 'date-fns/locale/fr';
import ca from 'date-fns/locale/ca';

const MovieSidebar = ({ 
  movie, 
  selectedDate, 
  selectedSession,
  onDateSelect,
  onSessionSelect 
}) => {
  const { t, i18n } = useTranslation(['movies']);
  const [ticketCount, setTicketCount] = useState(1);
  const [currentWeek, setCurrentWeek] = useState(0);

  const locales = {
    es,
    en,
    fr,
    ca
  };

  // Generate available dates (next 4 weeks)
  const getAvailableDates = (weekOffset = 0) => {
    const dates = [];
    const startDate = addDays(new Date(), weekOffset * 7);
    
    for (let i = 0; i < 7; i++) {
      const date = addDays(startDate, i);
      dates.push(date);
    }
    
    return dates;
  };

  const availableDates = getAvailableDates(currentWeek);

  // Mock session times - In a real app, these would come from an API
  const sessionTimes = [
    { id: 1, time: '15:30', room: 'Sala 1', price: 8.50 },
    { id: 2, time: '17:45', room: 'Sala 2', price: 8.50 },
    { id: 3, time: '19:15', room: 'Sala VIP', price: 12.00 },
    { id: 4, time: '20:30', room: 'Sala 1', price: 8.50 },
    { id: 5, time: '22:00', room: 'Sala 3', price: 8.50 },
    { id: 6, time: '23:15', room: 'Sala VIP', price: 12.00 },
  ];

  const handlePreviousWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek(prev => prev - 1);
      onDateSelect(null);
    }
  };

  const handleNextWeek = () => {
    if (currentWeek < 3) {
      setCurrentWeek(prev => prev + 1);
      onDateSelect(null);
    }
  };

  return (
    <div className="bg-cinema-gray/30 p-6 rounded-xl backdrop-blur-sm sticky top-8">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <Ticket className="w-6 h-6 text-cinema-red" />
        {t('movies:actions.buy_tickets')}
      </h2>

      {/* Date Selector */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cinema-red" />
            {t('movies:actions.select_date')}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={handlePreviousWeek}
              disabled={currentWeek === 0}
              className={`p-1 rounded-full transition-colors
                ${currentWeek === 0 
                  ? 'text-gray-600 cursor-not-allowed' 
                  : 'text-gray-400 hover:text-white'}`}
              aria-label={t('previous_week')}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextWeek}
              disabled={currentWeek === 3}
              className={`p-1 rounded-full transition-colors
                ${currentWeek === 3 
                  ? 'text-gray-600 cursor-not-allowed' 
                  : 'text-gray-400 hover:text-white'}`}
              aria-label={t('next_week')}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {availableDates.map((date) => (
            <button
              key={date.toISOString()}
              onClick={() => onDateSelect(date)}
              className={`
                flex flex-col items-center p-2 rounded-lg transition-all duration-300
                ${selectedDate?.toDateString() === date.toDateString()
                  ? 'bg-cinema-red text-white'
                  : 'bg-cinema-gray/30 text-gray-400 hover:bg-cinema-gray/50 hover:text-white'}
              `}
            >
              <span className="text-xs uppercase">
                {format(date, 'E', { locale: locales[i18n.language] })}
              </span>
              <span className="text-lg font-bold">
                {format(date, 'd')}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Session Times */}
      {selectedDate && (
        <section className="mb-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cinema-red" />
            {t('movies:actions.select_time')}
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {sessionTimes.map((session) => (
              <button
                key={session.id}
                onClick={() => onSessionSelect(session)}
                className={`
                  p-3 rounded-lg transition-all duration-300
                  ${selectedSession?.id === session.id
                    ? 'bg-cinema-red text-white'
                    : 'bg-cinema-gray/30 text-gray-400 hover:bg-cinema-gray/50 hover:text-white'}
                `}
              >
                <div className="text-lg font-bold">{session.time}</div>
                <div className="text-sm opacity-75">{session.room}</div>
                <div className="text-sm mt-1">
                  {session.price.toLocaleString(i18n.language, {
                    style: 'currency',
                    currency: 'EUR'
                  })}
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Ticket Counter */}
      {selectedSession && (
        <section className="mb-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-cinema-red" />
            {t('movies:actions.select_tickets')}
          </h3>

          <div className="flex items-center justify-between bg-cinema-gray/30 p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTicketCount(prev => Math.max(1, prev - 1))}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                disabled={ticketCount === 1}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xl font-bold text-white">{ticketCount}</span>
              <button
                onClick={() => setTicketCount(prev => Math.min(10, prev + 1))}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                disabled={ticketCount === 10}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">{t('total')}</div>
              <div className="text-xl font-bold text-white">
                {(selectedSession.price * ticketCount).toLocaleString(i18n.language, {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Checkout Button */}
      {selectedSession && (
        <button 
          className="w-full bg-cinema-red text-white py-4 rounded-lg
                   hover:bg-red-700 transition-all duration-300
                   transform hover:scale-105 font-semibold
                   flex items-center justify-center gap-2"
        >
          <CreditCard className="w-5 h-5" />
          {t('movies:actions.proceed_to_checkout')}
        </button>
      )}
    </div>
  );
};

export default MovieSidebar;