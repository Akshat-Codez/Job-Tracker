import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Navbar from './components/navbar.jsx';
import { API_BASE_URL } from './config.js';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/auth/me`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user) {
          setUser(data.user);
          setCurrentView('dashboard');
        }
      })
      .catch((err) => console.log('Auth check error:', err));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, { credentials: 'include' });
      setUser(null);
      setCurrentView('login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleRegisterSuccess = () => {
    setCurrentView('login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {(!user || currentView !== 'dashboard') && (
        <Navbar 
          currentView={currentView}
          onNavigate={(view) => {
            if (!user && view === 'dashboard') {
              setCurrentView('login');
            } else {
              setCurrentView(view);
            }
          }}
          user={user}
          onLogout={handleLogout}
        />
      )}

      {!user && currentView === 'signup' && (
        <Register
          onSwitchToLogin={() => setCurrentView('login')}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}

      {!user && currentView !== 'signup' && (
        <Login
          onSwitchToRegister={() => setCurrentView('signup')}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {user && currentView === 'dashboard' && (
        <Dashboard
          user={user}
          onLogout={handleLogout}
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
        />
      )}
    </div>
  );
}

export default App;
