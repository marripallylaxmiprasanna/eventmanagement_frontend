
function Home({ onSelectRole }) {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>CampusEvents</h1>
        <p className="subtitle">
          College Event Management System
        </p>

        <h2>Welcome!</h2>
        <p>Please select your login type</p>

        <button
          className="role-button admin-button"
          onClick={() => onSelectRole('Admin')}
        >
          Admin Login
        </button>

        <button
          className="role-button student-button"
          onClick={() => onSelectRole('Student')}
        >
          Student Login
        </button>
      </div>
    </div>
  );
}

export default Home;
