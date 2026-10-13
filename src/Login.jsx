
import { useState } from 'react';

function Login({ role, onLogin, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const user = username.trim();
    const pass = password.trim();

    const validAdmin =
      role === 'Admin' && user === 'admin' && pass === 'admin123';

    const validStudent =
      role === 'Student' && user === 'student' && pass === 'student123';

    if (validAdmin || validStudent) {
      setError('');
      onLogin(role);
    } else {
      setError('Invalid username or password.');
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <button className="back-link" onClick={onBack}>
          ← Back to home
        </button>

        <div className="login-logo">✦</div>

        <h1>{role} Login</h1>
        <p className="subtitle">
          Sign in to your CampusEvents account
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="primary-button login-submit">
            Login as {role}
          </button>
        </form>

        <p className="login-footnote">
          College Event Management System
        </p>
      </div>
    </div>
  );
}

export default Login;

