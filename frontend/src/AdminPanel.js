import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function AdminPanel() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return;
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [isAuthenticated]);

  const handleRoleChange = async (id, newRole) => {
    setStatus('');
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch(`/api/users/${id}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
        setStatus('Rola uspešno izmenjena!');
      } else {
        const err = await res.json();
        setStatus('Greška: ' + (err.error || 'Neuspešno'));
      }
    } catch (e) {
      setStatus('Greška pri slanju zahteva.');
    }
  };

  if (!isAuthenticated) return null;
  if (!user || user["https://officespace.example.com/roles"] !== 'Admin') return null;

  return (
    <div>
      <h2>Admin panel: Upravljanje korisničkim rolama</h2>
      {status && <p>{status}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Korisničko ime</th>
            <th>Rola</th>
            <th>Promeni rolu</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>
                <select value={u.role} onChange={e => handleRoleChange(u.id, e.target.value)}>
                  <option value="User">User</option>
                  <option value="OfficeManager">OfficeManager</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
