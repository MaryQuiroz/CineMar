// src/pages/Booking.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, TicketIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';
import SeatSelector from '../components/booking/SeatSelector';
import { movieService } from '../services/movieService';
import { useNotification } from '../components/common/Notification/NotificationContext';

const BookingSteps = {
  SEATS: 'seats',
  PAYMENT: 'payment',
  CONFIRMATION: 'confirmation',
};

const Booking = () => {
  const { movieId, sessionId } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  
  const [currentStep, setCurrentStep] = useState(BookingSteps.SEATS);
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session] = useState({
    // Mock session data - Replace with API call
    id: sessionId,
    date: new Date(),
    time: '19:30',
    format: 'Digital',
    room: 'Sala 1'
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await movieService.getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
        addNotification({
          type: 'error',
          title: 'Error',
          message: 'No se pudo cargar la información de la película'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId, addNotification]);

  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats);
  };

  const handleBookingConfirm = async () => {
    try {
      // Mock API call - Replace with actual booking
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addNotification({
        type: 'success',
        title: '¡Reserva confirmada!',
        message: 'Te hemos enviado un email con los detalles de tu reserva.'
      });
      
      navigate('/booking/confirmation');
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'No se pudo completar la reserva. Por favor, inténtalo de nuevo.'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cinema-red" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Película no encontrada</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-cinema-red hover:text-red-400 transition-colors"
        >
          Volver
        </button>
      </div>
    );
  }

  const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="min-h-screen bg-cinema-dark">
      {/* Header */}
      <header className="bg-cinema-gray shadow-lg">
        <div className="container-custom py-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            Volver
          </button>
          
          <div className="mt-4">
            <h1 className="text-2xl font-bold">{movie.title}</h1>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                <span>{new Date(session.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5" />
                <span>{session.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <TicketIcon className="h-5 w-5" />
                <span>{session.room} - {session.format}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Seat Selection */}
          <div className="flex-grow">
            <div className="bg-cinema-gray rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Selección de asientos</h2>
              <SeatSelector
                sessionId={sessionId}
                onSeatSelection={handleSeatSelection}
              />
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:w-80">
            <div className="bg-cinema-gray rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Resumen</h2>
              
              {selectedSeats.length > 0 ? (
                <>
                  <div className="space-y-3 mb-6">
                    {selectedSeats.map(seat => (
                      <div key={seat.id} className="flex justify-between text-sm">
                        <span className="text-gray-300">
                          Asiento {seat.row}{seat.number} ({seat.type === 'vip' ? 'VIP' : 'Estándar'})
                        </span>
                        <span className="font-medium">{seat.price.toFixed(2)}€</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-700 pt-4 mb-6">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{total.toFixed(2)}€</span>
                    </div>
                  </div>

                  <button
                    onClick={handleBookingConfirm}
                    className="w-full btn-primary"
                  >
                    Continuar
                  </button>
                </>
              ) : (
                <p className="text-gray-400 text-center">
                  Selecciona al menos un asiento para continuar
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Booking;