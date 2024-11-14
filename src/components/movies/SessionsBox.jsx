import { useState } from 'react';
import DateSelector from './DateSelector';
import SessionSelector from './SessionSelector';

const SessionsBox = ({ movieId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessions] = useState([
    // Mock data - Replace with API call
    {
      id: 1,
      time: '16:30',
      availableSeats: 45,
      format: 'Digital'
    },
    {
      id: 2,
      time: '19:00',
      availableSeats: 0,
      format: '3D'
    },
    {
      id: 3,
      time: '22:15',
      availableSeats: 28,
      format: 'VOSE'
    },
  ]);

  return (
    <div className="space-y-6">
      <DateSelector
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
      <SessionSelector
        sessions={sessions}
        selectedSession={selectedSession}
        onSessionSelect={setSelectedSession}
      />
    </div>
  );
};

export default SessionsBox;