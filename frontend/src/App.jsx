import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import BrowseResources from './pages/BrowseResources';
import BookResource from './pages/BookResource';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import ManageResources from './pages/ManageResources';
import BookingRequests from './pages/BookingRequests';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="flex justify-center mt-20">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} />;
  }
  return children;
};

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Navigate to={user ? (user.role === 'admin' ? '/admin' : '/student') : '/login'} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student" element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/browse" element={<ProtectedRoute allowedRole="student"><BrowseResources /></ProtectedRoute>} />
          <Route path="/student/book/:id" element={<ProtectedRoute allowedRole="student"><BookResource /></ProtectedRoute>} />
          <Route path="/student/my-bookings" element={<ProtectedRoute allowedRole="student"><MyBookings /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/manage-resources" element={<ProtectedRoute allowedRole="admin"><ManageResources /></ProtectedRoute>} />
          <Route path="/admin/booking-requests" element={<ProtectedRoute allowedRole="admin"><BookingRequests /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
