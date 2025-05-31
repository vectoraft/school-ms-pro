import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function NotificationDashboard({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/wp-json/schoolms/v1/notifications/list', { params: { user_id: userId } })
      .then(res => setNotifications(res.data)).finally(() => setLoading(false));
  }, [userId]);

  const sendNotification = () => {
    setLoading(true);
    axios.post('/wp-json/schoolms/v1/notifications/send', {
      user_id: userId,
      content
    }).then(() => {
      setContent('');
      return axios.get('/wp-json/schoolms/v1/notifications/list', { params: { user_id: userId } });
    }).then(res => setNotifications(res.data)).finally(() => setLoading(false));
  };

  return (
    <div className="dashboard-widget notification-dashboard">
      <h3>Notifications</h3>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <ul>
            {notifications.map((noti, i) => (
              <li key={i}><strong>{noti.sent_at}</strong>: {noti.content}</li>
            ))}
          </ul>
          <textarea value={content} onChange={e => setContent(e.target.value)} />
          <button onClick={sendNotification} disabled={!content}>Send Notification</button>
        </>
      )}
    </div>
  );
}
