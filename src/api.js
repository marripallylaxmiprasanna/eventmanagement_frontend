
const API_URL = 'http://localhost:8080/api/events';

// Get all events
export async function getEvents() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Error: ${response.status}`);
  }

  return response.json();
}

// Add a new event
export async function addEvent(event) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Error: ${response.status}`);
  }

  return response.json();
}

// Delete an event
export async function deleteEvent(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Error: ${response.status}`);
  }
}

