import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function ManagerPanel() {
  const { user, isAuthenticated } = useAuth0();
  const [reservations, setReservations] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/reservations')
      .then(res => res.json())
      .then(data => setReservations(data));
  }, []);

  const handleDelete = async (id) => {
    setStatus('');
    const res = await fetch(`/api/reservations/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    });
    if (res.status === 204) {
      setReservations(reservations.filter(r => r.id !== id));
      setStatus('Rezervacija obrisana!');
    } else {
      setStatus('Greška pri brisanju.');
    }
  };

  if (!isAuthenticated) return null;
  // Prikaz samo za OfficeManager/Admin (pojednostavljeno)
  if (!user || !user["https://officespace.example.com/roles"] || !['OfficeManager', 'Admin'].includes(user["https://officespace.example.com/roles"])) return null;

  return (
    <div>
      <h2>Upravljanje rezervacijama</h2>
      {status && <p>{status}</p>}
      <ul>
        {reservations.map(r => (
          <li key={r.id}>
            {r.date} - korisnik #{r.UserId} - stolica #{r.ChairId}
            <button onClick={() => handleDelete(r.id)}>Obriši</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManagerPanel;
