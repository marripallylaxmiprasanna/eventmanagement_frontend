
import { useEffect, useState } from 'react';
import { getEvents, addEvent, deleteEvent } from './api';

function Dashboard({ role, onLogout }) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Load events from backend
  async function loadEvents() {
    setLoading(true);
    setError('');

    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      setError(
        'Unable to load events: ' +
          (err.message || 'Please check your backend.')
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  // Add a new event
  async function handleAddEvent() {
    const eventName = window.prompt('Enter event name:');
    if (!eventName || !eventName.trim()) return;

    const description =
      window.prompt('Enter event description:') || '';

    const venue = window.prompt('Enter event venue:');
    if (!venue || !venue.trim()) return;

    const eventDate = window.prompt(
      'Enter event date (YYYY-MM-DD):'
    );
    if (!eventDate || !eventDate.trim()) return;

    try {
      await addEvent({
        eventName: eventName.trim(),
        description: description.trim(),
        venue: venue.trim(),
        eventDate: eventDate.trim(),
      });

      await loadEvents();
      window.alert('Event added successfully!');
    } catch (err) {
      window.alert(
        'Unable to add event: ' +
          (err.message || 'Please check your backend.')
      );
    }
  }

  // Delete an event
  async function handleDeleteEvent(id) {
    const confirmed = window.confirm(
      'Do you want to delete this event?'
    );

    if (!confirmed) return;

    try {
      await deleteEvent(id);
      await loadEvents();
      window.alert('Event deleted successfully!');
    } catch (err) {
      window.alert(
        'Unable to delete event: ' +
          (err.message || 'Please check your backend.')
      );
    }
  }

  return (
    <div className="dashboard-page">
      <nav className="dashboard-nav">
        <div className="brand">
          <span className="brand-icon">✦</span>
          CampusEvents
        </div>

        <div className="nav-user">
          <span className="user-avatar">
            {role ? role[0] : 'U'}
          </span>
          <span>{role}</span>

          <button
            className="logout-button"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="dashboard-heading">
          <div>
            <span className="eyebrow">
              YOUR CAMPUS SPACE
            </span>

            <h1>{role} Dashboard</h1>

            <p>
              {role === 'Admin'
                ? 'Create and manage your college events.'
                : 'Explore the events happening on your campus.'}
            </p>
          </div>

          {role === 'Admin' && (
            <button
              className="primary-button add-button"
              onClick={handleAddEvent}
            >
              + Add Event
            </button>
          )}
        </div>

        <div className="event-section-heading">
          <h2>College Events</h2>

          <button
            className="refresh-button"
            onClick={loadEvents}
            disabled={loading}
          >
            ↻ Refresh
          </button>
        </div>

        {loading && (
          <p className="status-message">
            Loading events...
          </p>
        )}

        {error && (
          <p className="error-message">{error}</p>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📅</div>

            <h3>No events yet</h3>

            <p>
              {role === 'Admin'
                ? 'Add the first event to get started.'
                : 'Check back soon for upcoming college events.'}
            </p>

            {role === 'Admin' && (
              <button
                className="primary-button"
                onClick={handleAddEvent}
              >
                + Create First Event
              </button>
            )}
          </div>
        )}

        <div className="event-grid">
          {events.map((event) => (
            <article
              className="event-card"
              key={event.id}
            >
              <div className="event-card-banner">
                <span className="event-category">
                  CAMPUS EVENT
                </span>

                <span className="event-symbol">✦</span>
              </div>

              <div className="event-card-body">
                <h3>{event.eventName}</h3>

                <p className="event-description">
                  {event.description ||
                    'Join us for this college event.'}
                </p>

                <div className="event-detail">
                  <span>📅</span>
                  <span>
                    {event.eventDate ||
                      'Date to be announced'}
                  </span>
                </div>

                <div className="event-detail">
                  <span>📍</span>
                  <span>
                    {event.venue ||
                      'Venue to be announced'}
                  </span>
                </div>

                {role === 'Admin' && (
                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDeleteEvent(event.id)
                    }
                  >
                    Delete Event
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;


