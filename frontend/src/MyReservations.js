import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function MyReservations() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [reservations, setReservations] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return;
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch('/api/reservations/my', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          setReservations(await res.json());
        } else {
          setStatus('Greška pri učitavanju rezervacija.');
        }
      } catch (e) {
        setStatus('Greška pri učitavanju rezervacija.');
      }
    })();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (!isAuthenticated) return null;

  return (
    <div>
      <h2>Moje rezervacije</h2>
      {status && <p>{status}</p>}
      <table>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Lokacija</th>
            <th>Kancelarija</th>
            <th>Sto</th>
            <th>Stolica</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(r => (
            <tr key={r.id}>
              <td>{r.date}</td>
              <td>{r.Chair?.Desk?.Office?.Location?.name || '-'}</td>
              <td>{r.Chair?.Desk?.Office?.name || '-'}</td>
              <td>{r.Chair?.Desk?.number || '-'}</td>
              <td>{r.Chair?.number || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyReservations;
