export default function Navbar({ onAddJob, currentView, onNavigate, user, onLogout }) {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-gray-100 shadow-md">
      <div 
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => onNavigate && onNavigate('dashboard')}
      >
        <i className="fa-solid fa-briefcase text-blue-400 text-xl"></i>
        <h3 className="font-bold font-sans text-gray-800">My Job Tracker</h3>
      </div>

      <div className="flex space-x-8 items-center">
        <button 
          onClick={() => onNavigate && onNavigate('dashboard')}
          className={`font-semibold flex items-center space-x-2 bg-transparent border-0 cursor-pointer ${
            currentView === 'dashboard' ? 'text-blue-400' : 'text-gray-600 hover:text-blue-400'
          }`}
        >
          <i className="fa-solid fa-house"></i>
          <span>Dashboard</span>
        </button>
        
        <button 
          onClick={() => onNavigate && onNavigate('dashboard')}
          className="font-semibold flex items-center space-x-2 text-gray-600 hover:text-blue-400 bg-transparent border-0 cursor-pointer"
        >
          <i className="fa-solid fa-file"></i>
          <span>My Applications</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        {currentView === 'dashboard' && onAddJob && (
          <button
            onClick={onAddJob}
            className="px-4 py-2 bg-blue-400 rounded-full shadow-sm text-white font-medium hover:bg-blue-600 transition flex items-center space-x-2 cursor-pointer"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Add Job</span>
          </button>
        )}

        {user ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700 flex items-center space-x-1">
              <i className="fa-solid fa-user-circle text-blue-400 text-lg"></i>
              <span>{user.name || 'User'}</span>
            </span>
            <button
              onClick={onLogout}
              className="px-3 py-1.5 border border-red-400 text-red-500 rounded-full text-xs font-semibold hover:bg-red-50 transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigate && onNavigate('login')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition cursor-pointer ${
                currentView === 'login'
                  ? 'bg-blue-400 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => onNavigate && onNavigate('signup')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition cursor-pointer ${
                currentView === 'signup'
                  ? 'bg-blue-400 text-white'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
