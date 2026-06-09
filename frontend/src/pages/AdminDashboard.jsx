import { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Settings, Calendar, ShieldAlert } from 'lucide-react';
const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [idleResources, setIdleResources] = useState([]);
  useEffect(() => {
    const fetchIdleResources = async () => {
      try {
        const res = await api.get('/bookings/idle-resources');
        setIdleResources(res.data);
      } catch (err) {
        console.error('Failed to fetch idle resources', err);
      }
    };
    fetchIdleResources();
  }, []);
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white shadow-xl border-b-4 border-indigo-500">
        <h1 className="text-4xl font-extrabold mb-2">Admin Control Panel</h1>
        <p className="text-gray-300 text-lg">Welcome, {user?.name}. Manage campus resources and student requests.</p>
        <div className="mt-6 flex gap-4">
          <Link to="/admin/manage-resources" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-700 transition shadow-md">
            <Settings className="w-5 h-5" /> Manage Resources
          </Link>
          <Link to="/admin/booking-requests" className="bg-white text-gray-900 px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-100 transition shadow-md">
            <Calendar className="w-5 h-5" /> Booking Requests
          </Link>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-800">Underutilized Resources</h2>
        </div>
        <p className="text-gray-500 mb-6">These resources are rarely booked. Consider promoting them or re-evaluating their condition.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {idleResources.map(resource => (
            <div key={resource._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
              <div className="bg-red-50 p-3 rounded-lg text-red-500 font-bold text-xl">
                {resource.bookingCount}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{resource.resourceName}</h3>
                <p className="text-sm text-gray-500">{resource.category}</p>
                <p className="text-xs text-gray-400 mt-2">Total Bookings</p>
              </div>
            </div>
          ))}
          {idleResources.length === 0 && (
            <div className="col-span-full text-gray-500 p-8 border border-dashed border-gray-300 rounded-xl text-center">
              Loading or no data available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
