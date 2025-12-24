
import logo from './logo.svg';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import Locations from './Locations';
import Booking from './Booking';
import ManagerPanel from './ManagerPanel';
import AdminPanel from './AdminPanel';
import MyReservations from './MyReservations';

function App() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {!isAuthenticated ? (
          <button onClick={() => loginWithRedirect()}>Log in</button>
        ) : (
          <>
            <p>Prijavljen kao: {user?.email}</p>
            <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
            <Locations />
            <Booking />
            <ManagerPanel />
            <MyReservations />
            {user && user["https://officespace.example.com/roles"] === 'Admin' && <AdminPanel />}
          </>
        )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
