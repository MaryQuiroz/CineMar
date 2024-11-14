// src/components/booking/SeatSelector.jsx
import { useState } from 'react';

const SEAT_TYPES = {
  STANDARD: 'standard',
  VIP: 'vip',
  DISABLED: 'disabled',
  TAKEN: 'taken',
};

const SEAT_PRICES = {
  [SEAT_TYPES.STANDARD]: 8.50,
  [SEAT_TYPES.VIP]: 12.00,
};

const SeatSelector = ({ sessionId, onSeatSelection }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);

  // Mock data - Replace with API call
  const seatMap = {
    rows: 10,
    seatsPerRow: 15,
    takenSeats: ['A5', 'A6', 'B7', 'C4', 'C5'],
    vipSeats: ['E7', 'E8', 'E9', 'F7', 'F8', 'F9'],
    disabledSeats: ['A1', 'A2'],
  };

  const getSeatType = (rowIndex, seatIndex) => {
    const seatId = `${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`;
    
    if (seatMap.takenSeats.includes(seatId)) return SEAT_TYPES.TAKEN;
    if (seatMap.vipSeats.includes(seatId)) return SEAT_TYPES.VIP;
    if (seatMap.disabledSeats.includes(seatId)) return SEAT_TYPES.DISABLED;
    return SEAT_TYPES.STANDARD;
  };

  const handleSeatClick = (rowIndex, seatIndex) => {
    const seatId = `${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`;
    const seatType = getSeatType(rowIndex, seatIndex);
    
    if (seatType === SEAT_TYPES.TAKEN || seatType === SEAT_TYPES.DISABLED) {
      return;
    }

    setSelectedSeats(prev => {
      const isSelected = prev.some(seat => seat.id === seatId);
      if (isSelected) {
        return prev.filter(seat => seat.id !== seatId);
      } else {
        return [...prev, { 
          id: seatId, 
          type: seatType,
          price: SEAT_PRICES[seatType],
          row: String.fromCharCode(65 + rowIndex),
          number: seatIndex + 1
        }];
      }
    });
  };

  const getSeatClassName = (rowIndex, seatIndex) => {
    const seatId = `${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`;
    const seatType = getSeatType(rowIndex, seatIndex);
    const isSelected = selectedSeats.some(seat => seat.id === seatId);
    const isHovered = hoveredSeat === seatId;

    return `
      w-8 h-8 rounded-t-lg cursor-pointer transition-all
      ${seatType === SEAT_TYPES.TAKEN ? 'bg-gray-600 cursor-not-allowed' : ''}
      ${seatType === SEAT_TYPES.VIP && !isSelected ? 'bg-purple-600 hover:bg-purple-500' : ''}
      ${seatType === SEAT_TYPES.DISABLED ? 'bg-gray-600 cursor-not-allowed' : ''}
      ${seatType === SEAT_TYPES.STANDARD && !isSelected ? 'bg-cinema-red hover:bg-red-500' : ''}
      ${isSelected ? 'bg-green-500 scale-110' : ''}
      ${isHovered ? 'scale-110' : ''}
      ${seatType === SEAT_TYPES.TAKEN || seatType === SEAT_TYPES.DISABLED ? 'opacity-50' : ''}
    `;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Screen */}
      <div className="relative mb-12">
        <div className="h-2 bg-gray-300 rounded-lg mb-2 w-full transform -skew-y-2" />
        <div className="text-center text-sm text-gray-400">PANTALLA</div>
      </div>

      {/* Seat Map */}
      <div className="overflow-x-auto pb-6">
        <div className="w-fit mx-auto">
          {Array.from({ length: seatMap.rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-2 mb-2">
              {/* Row Label */}
              <div className="w-6 text-center text-gray-400">
                {String.fromCharCode(65 + rowIndex)}
              </div>

              {/* Seats */}
              <div className="flex gap-2">
                {Array.from({ length: seatMap.seatsPerRow }).map((_, seatIndex) => (
                  <button
                    key={seatIndex}
                    onClick={() => handleSeatClick(rowIndex, seatIndex)}
                    onMouseEnter={() => setHoveredSeat(`${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`)}
                    onMouseLeave={() => setHoveredSeat(null)}
                    className={getSeatClassName(rowIndex, seatIndex)}
                    disabled={getSeatType(rowIndex, seatIndex) === SEAT_TYPES.TAKEN}
                  />
                ))}
              </div>

              {/* Row Label (right) */}
              <div className="w-6 text-center text-gray-400">
                {String.fromCharCode(65 + rowIndex)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-8 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t-sm bg-cinema-red" />
          <span className="text-sm text-gray-300">Estándar ({SEAT_PRICES[SEAT_TYPES.STANDARD]}€)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t-sm bg-purple-600" />
          <span className="text-sm text-gray-300">VIP ({SEAT_PRICES[SEAT_TYPES.VIP]}€)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t-sm bg-green-500" />
          <span className="text-sm text-gray-300">Seleccionado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t-sm bg-gray-600 opacity-50" />
          <span className="text-sm text-gray-300">No disponible</span>
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;