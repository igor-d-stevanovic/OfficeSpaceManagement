import React, { useEffect, useState } from 'react';

function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/locations')
      .then(res => res.json())
      .then(data => {
        setLocations(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Učitavanje lokacija...</p>;

  return (
    <div>
      <h2>Dostupne lokacije</h2>
      <ul>
        {locations.map(loc => (
          <li key={loc.id}>{loc.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Locations;
