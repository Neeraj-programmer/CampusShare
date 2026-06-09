import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Book, User, Settings, Calendar, LayoutDashboard } from 'lucide-react';
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm text-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to={user ? (user.role === 'admin' ? '/admin' : '/student') : '/'} className="flex items-center gap-2 text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              <Book className="w-7 h-7 text-indigo-600" />
              CampusShare
            </Link>
          </div>
          <div className="flex items-center gap-6 font-medium text-sm">
            {user ? (
              <>
                <span className="text-gray-500 hidden md:block">Hi, <span className="text-gray-900 font-bold">{user.name}</span></span>
                {user.role === 'student' && (
                  <>
                    <Link to="/student" className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 transition-colors">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link to="/student/browse" className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 transition-colors">
                       Browse
                    </Link>
                    <Link to="/student/my-bookings" className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 transition-colors">
                      <Calendar className="w-4 h-4" /> My Bookings
                    </Link>
                  </>
                )}
                {user.role === 'admin' && (
                  <>
                    <Link to="/admin" className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 transition-colors">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link to="/admin/manage-resources" className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 transition-colors">
                      <Settings className="w-4 h-4" /> Resources
                    </Link>
                    <Link to="/admin/booking-requests" className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 transition-colors">
                      <Calendar className="w-4 h-4" /> Requests
                    </Link>
                  </>
                )}
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-indigo-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 transition-colors">Login</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-6 py-2.5 rounded-full hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
