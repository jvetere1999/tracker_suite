import React, { useState, useEffect } from 'react';

function EventCheckInTable() {
  const [checkIns, setCheckIns] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/check-ins');
      const data = await response.json();
      setCheckIns(data);
    }
    fetchData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>UserID</th>
          <th>EventID</th>
          <th>CheckInTime</th>
        </tr>
      </thead>
      <tbody>
        {checkIns.map((checkIn) => (
          <tr key={checkIn.id}>
            <td>{checkIn.userId}</td>
            <td>{checkIn.eventId}</td>
            <td>{checkIn.checkInTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EventCheckInTable;
