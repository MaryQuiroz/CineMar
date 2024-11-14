// src/pages/BookingConfirmation.jsx
import { Link } from 'react-router-dom';
import { CheckCircleIcon, TicketIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const BookingConfirmation = () => {
  const booking = {
    // Mock booking data - Replace with actual data from your state management
    id: 'BOK-2024-001',
    movie: {
      title: 'Título de la película',
      poster: '/images/movie-poster.jpg'
    },
    session: {
      date: new Date(),
      time: '19:30',
      room: 'Sala 1'
    },
    seats: [
      { id: 'A1', type: 'standard', price: 8.50 },
      { id: 'A2', type: 'standard', price: 8.50 }
    ],
    total: 17.00,
    qrCode: 'data:image/png;base64,...' // Replace with actual QR code
  };

  return (
    <div className="min-h-screen bg-cinema-dark py-12">
      <div className="container-custom max-w-2xl">
        {/* Success Message */}
        <div className="text-center mb-8">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">¡Reserva confirmada!</h1>
          <p className="text-gray-300">
            Te hemos enviado un email con los detalles de tu reserva
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-cinema-gray rounded-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400 mb-1">Número de reserva</p>
                <p className="text-lg font-bold">{booking.id}</p>
              </div>
              <button
                className="flex items-center gap-2 text-cinema-red hover:text-red-400 transition-colors"
                onClick={() => window.print()}
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                <span>Descargar PDF</span>
              </button>
            </div>
          </div>

          {/* Movie Info */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex gap-4">
              <img
                src={booking.movie.poster}
                alt={booking.movie.title}
                className="w-24 h-36 rounded object-cover"
              />
              <div>
                <h2 className="text-xl font-bold mb-2">{booking.movie.title}</h2>
                <div className="space-y-1 text-gray-300">
                  <p>{new Date(booking.session.date).toLocaleDateString()}</p>
                  <p>{booking.session.time} - {booking.session.room}</p>
                  <p>
                    Asientos: {booking.seats.map(seat => seat.id).join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex flex-col items-center">
              <img
                src={booking.qrCode}
                alt="QR Code"
                className="w-48 h-48 mb-4"
              />
              <p className="text-sm text-gray-400">
                Presenta este código QR en el cine
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="p-6">
            <div className="space-y-2 mb-6">
              {booking.seats.map(seat => (
                <div key={seat.id} className="flex justify-between text-sm">
                  <span className="text-gray-300">
                    Asiento {seat.id} ({seat.type === 'vip' ? 'VIP' : 'Estándar'})
                  </span>
                  <span>{seat.price.toFixed(2)}€</span>
                </div>
              ))}
              <div className="border-t border-gray-700 pt-2 mt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{booking.total.toFixed(2)}€</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            to="/"
            className="flex-1 btn-primary text-center"
          >
            Volver a inicio
          </Link>
          <Link
            to="/cartelera"
            className="flex-1 bg-cinema-gray text-white px-4 py-2 rounded-md 
                     hover:bg-cinema-gray/80 transition-colors text-center"
          >
            Ver más películas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;