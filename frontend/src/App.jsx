import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Navbar from './components/navbar.jsx';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('signup');
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/auth/me', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user) {
          setUser(data.user);
        }
      })
      .catch((err) => console.log('Auth check error:', err));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/api/auth/logout', { credentials: 'include' });
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

  const handleRegisterSuccess = (userData) => {
    setUser(userData);
    setCurrentView('login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {currentView !== 'dashboard' && (
        <Navbar 
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
          user={user}
          onLogout={handleLogout}
        />
      )}

      {currentView === 'signup' && (
        <Register
          onSwitchToLogin={() => setCurrentView('login')}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}

      {currentView === 'login' && (
        <Login
          onSwitchToRegister={() => setCurrentView('signup')}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentView === 'dashboard' && (
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
