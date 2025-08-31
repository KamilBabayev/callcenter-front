import React, { useEffect, useState } from 'react';

function CallsList({ token }) {
  const [calls, setCalls] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const callsPerPage = 10;

  useEffect(() => {
    fetch('http://localhost:8080/api/calls', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCalls(data));
  }, [token]);

  // Filter calls by search term (searches caller, callee, status)
  const filteredCalls = calls.filter(call =>
    call.caller.toLowerCase().includes(search.toLowerCase()) ||
    (call.callee && call.callee.toLowerCase().includes(search.toLowerCase())) ||
    call.status.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCalls.length / callsPerPage);
  const startIdx = (page - 1) * callsPerPage;
  const currentCalls = filteredCalls.slice(startIdx, startIdx + callsPerPage);

  // Reset to first page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div>
      <h2>Calls</h2>
      <input
        type="text"
        placeholder="Search by caller, callee, or status"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          marginBottom: '16px',
          padding: '8px',
          width: '100%',
          maxWidth: '300px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />
      {currentCalls.length === 0 ? (
        <p>No calls found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Timestamp</th>
              <th>Caller</th>
              <th>User ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentCalls.map(call => (
              <tr key={call.id}>
                <td>{call.id}</td>
                <td>{call.timestamp.split('.')[0].replace('T', ' ')}</td>
                <td>{call.caller}</td>
                <td>{call.user_id}</td>
                <td>{call.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Pagination controls */}
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CallsList;