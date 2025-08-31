import React, { useEffect, useState } from 'react';

function UsersList({ token }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [token]);

  return (
    <div>
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Is Agent</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id || u.username}>
                <td>{u.username}</td>
                <td>{u.role}</td>
                <td>{u.status}</td>
                <td>{u.is_agent ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsersList;