
import { useState } from 'react';
import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [selectedRole, setSelectedRole] = useState('');
  const [loggedInRole, setLoggedInRole] = useState('');

  function handleLogout() {
    setLoggedInRole('');
    setSelectedRole('');
  }

  if (loggedInRole) {
    return (
      <Dashboard
        role={loggedInRole}
        onLogout={handleLogout}
      />
    );
  }

  if (selectedRole) {
    return (
      <Login
        role={selectedRole}
        onLogin={setLoggedInRole}
        onBack={() => setSelectedRole('')}
      />
    );
  }

  return <Home onSelectRole={setSelectedRole} />;
}

export default App;


