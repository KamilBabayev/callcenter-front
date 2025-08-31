import React, { useState, useEffect } from 'react';
import Login from './Login';
import UsersList from './UsersList';
import CallsList from './CallsList';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token')); // <-- read from localStorage
  const [user, setUser] = useState(null);
  const [view, setView] = useState('main'); // default to main

  useEffect(() => {
    if (token) {
      fetch('http://localhost:8080/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setUser(data));
    }
  }, [token]);

  // When logging out, clear localStorage
  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setView('main');
    localStorage.removeItem('token');
  };

  if (!token) {
    return <Login onLogin={t => {
      setToken(t);
      localStorage.setItem('token', t);
    }} />;
  }

  return (
    <div className="App" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar menu on the top left */}
      <aside style={{
        width: '200px',
        background: '#282c34',
        color: 'white',
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      }}>
        <div>
          <nav>
            <button
              style={{ display: 'block', margin: '10px 20px', width: '140px' }}
              onClick={() => setView('main')}
            >
              Main
            </button>
            {user && user.role === 'admin' && (
              <>
                <button
                  style={{ display: 'block', margin: '10px 20px', width: '140px' }}
                  onClick={() => setView('users')}
                >
                  Users
                </button>
                <button
                  style={{ display: 'block', margin: '10px 20px', width: '140px' }}
                  onClick={() => setView('calls')}
                >
                  Calls
                </button>
              </>
            )}
          </nav>
        </div>
        <div>
          <button
            style={{ display: 'block', margin: '10px 20px', width: '140px' }}
            onClick={() => setView('profile')}
          >
            Profile
          </button>
        </div>
      </aside>
      {/* Main content area */}
      <main style={{ flex: 1, padding: '40px' }}>
        <div className="subwindow">
          {view === 'main' && user && (
            <div>
              <h2>Welcome</h2>
              <p><strong>User:</strong> {user.username}</p>
            </div>
          )}
          {view === 'profile' && user && (
            <div>
              <h2>Profile</h2>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Status:</strong> {user.status}</p>
              <button
                style={{
                  marginTop: '20px',
                  padding: '8px 16px',
                  background: '#d32f2f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
          {user && user.role === 'admin' && view === 'users' && <UsersList token={token} />}
          {user && user.role === 'admin' && view === 'calls' && <CallsList token={token} />}
        </div>
      </main>
    </div>
  );
}

export default App;
