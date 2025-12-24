import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Booking() {
  const { user, isAuthenticated } = useAuth0();
  const [chairs, setChairs] = useState([]);
  const [date, setDate] = useState('');
  const [chairId, setChairId] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/chairs')
      .then(res => res.json())
      .then(data => setChairs(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    if (!date || !chairId) {
      setStatus('Izaberi datum i stolicu!');
      return;
    }
    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date,
        ChairId: chairId,
        UserId: user?.sub || 1 // fallback za test
      })
    });
    if (res.ok) {
      setStatus('Rezervacija uspešna!');
    } else {
      const err = await res.json();
      setStatus(err.error || 'Greška pri rezervaciji.');
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div>
      <h2>Rezerviši mesto</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <select value={chairId} onChange={e => setChairId(e.target.value)}>
          <option value="">Izaberi stolicu</option>
          {chairs.map(ch => (
            <option key={ch.id} value={ch.id}>{ch.number}</option>
          ))}
        </select>
        <button type="submit">Rezerviši</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default Booking;
