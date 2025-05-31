import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EventsCalendarDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example: fetch events for this month
    axios.get('/wp-json/schoolms/v1/events/list', {
      params: { start: '2025-05-01', end: '2025-05-31' }
    }).then(res => setEvents(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard-widget events-calendar-dashboard">
      <h3>Events Calendar</h3>
      {loading && <div>Loading...</div>}
      {!loading && (
        <ul>
          {events.map((event, i) => (
            <li key={i}>
              <strong>{event.date}</strong>: {event.title} <br />
              <span>{event.description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
