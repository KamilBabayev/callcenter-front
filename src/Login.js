import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      onLogin(data.token);
      if (rememberMe) {
        localStorage.setItem('token', data.token);
      }
    } else {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#f5f5f5'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'white',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          minWidth: '320px'
        }}
      >
        <h2 style={{ marginBottom: '24px', color: '#282c34' }}>Callcenter Portal</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          Remember me
        </label>
        {error && <div style={{ color: '#d32f2f', marginBottom: '16px' }}>{error}</div>}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            background: '#282c34',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;