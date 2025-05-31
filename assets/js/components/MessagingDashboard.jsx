import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MessagingDashboard({ userId }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/wp-json/schoolms/v1/messages/list', { params: { user_id: userId } })
      .then(res => setMessages(res.data)).finally(() => setLoading(false));
  }, [userId]);

  const sendMessage = () => {
    setLoading(true);
    axios.post('/wp-json/schoolms/v1/messages/send', {
      user_id: userId,
      sender_id: userId, // For demo, sender is user
      content
    }).then(() => {
      setContent('');
      return axios.get('/wp-json/schoolms/v1/messages/list', { params: { user_id: userId } });
    }).then(res => setMessages(res.data)).finally(() => setLoading(false));
  };

  return (
    <div className="dashboard-widget messaging-dashboard">
      <h3>Messages</h3>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <ul>
            {messages.map((msg, i) => (
              <li key={i}><strong>{msg.sent_at}</strong>: {msg.content}</li>
            ))}
          </ul>
          <textarea value={content} onChange={e => setContent(e.target.value)} />
          <button onClick={sendMessage} disabled={!content}>Send</button>
        </>
      )}
    </div>
  );
}
