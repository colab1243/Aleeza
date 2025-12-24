import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { GuestbookEntry } from '../types';
import './Guestbook.css';

const Guestbook = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [message, setMessage] = useState('');
  const [emoji, setEmoji] = useState('💕');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const emojis = ['💕', '❤️', '💖', '💗', '💝', '💘', '😍', '🥰', '😘', '💋', '🌹', '✨'];

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) throw error;

      const entriesData = data.map(item => ({
        id: item.id,
        message: item.message,
        emoji: item.emoji,
        timestamp: new Date(item.timestamp)
      })) as GuestbookEntry[];

      setEntries(entriesData);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('guestbook')
        .insert({
          message: message.trim(),
          emoji
        });

      if (error) throw error;

      setMessage('');
      await fetchEntries();
    } catch (error) {
      console.error('Error adding entry:', error);
      alert('Failed to add message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="guestbook-container">
      <div className="guestbook-header">
        <h2 className="section-title">Your Messages</h2>
        <p className="section-subtitle">The sweetest words from you... 💌</p>
      </div>

      <div className="guestbook-content">
        <form className="message-form" onSubmit={handleSubmit}>
          <div className="emoji-selector">
            {emojis.map((e) => (
              <button
                key={e}
                type="button"
                className={emoji === e ? 'active' : ''}
                onClick={() => setEmoji(e)}
              >
                {e}
              </button>
            ))}
          </div>
          
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here... ❤️"
            rows={4}
            maxLength={500}
            disabled={submitting}
          />
          
          <div className="form-footer">
            <span className="char-count">{message.length}/500</span>
            <button type="submit" disabled={submitting || !message.trim()}>
              {submitting ? 'Sending...' : 'Send Message 💝'}
            </button>
          </div>
        </form>

        <div className="entries-list">
          {loading ? (
            <div className="loading">Loading messages...</div>
          ) : entries.length === 0 ? (
            <div className="no-entries">No messages yet. Be the first! 💕</div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="entry-card">
                <div className="entry-emoji">{entry.emoji}</div>
                <div className="entry-content">
                  <p className="entry-message">{entry.message}</p>
                  <p className="entry-date">
                    {new Date(entry.timestamp).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Guestbook;

