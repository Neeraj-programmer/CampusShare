import { useState, useEffect } from 'react';
import api from '../api';
import { Calendar, Clock, Tag } from 'lucide-react';
const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings/my-bookings');
        setBookings(res.data);
      } catch (err) {
        console.error('Failed to fetch bookings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if(window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await api.delete(`/bookings/${id}`);
        setBookings(bookings.filter(b => b._id !== id));
      } catch (err) {
        alert('Failed to cancel booking');
      }
    }
  };
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Approved': return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Approved</span>;
      case 'Rejected': return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Rejected</span>;
      case 'Completed': return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Completed</span>;
      default: return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Pending</span>;
    }
  };
  return (
    <div className="space-y-6 min-h-[78vh]">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-500">Track the status of your resource requests</p>
      </div>
      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading...</div>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No bookings found</h3>
          <p className="text-gray-500">You haven't made any resource booking requests yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[#4F39F6] overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {bookings.map(booking => (
              <li key={booking._id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-indigo-600 mb-1">
                      {booking.resourceId?.resourceName || 'Unknown Resource'}
                    </h3>
                    <p className="text-gray-500 text-sm flex items-center gap-1 mb-2">
                      <Tag className="w-4 h-4" /> {booking.purpose}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1 font-medium"><Calendar className="w-4 h-4 text-gray-400" /> {booking.date}</span>
                      <span className="flex items-center gap-1 font-medium"><Clock className="w-4 h-4 text-gray-400" /> {booking.startTime} - {booking.endTime}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(booking.status)}
                    {(booking.status === 'Pending' || booking.status === 'Approved') && (
                      <button 
                        onClick={() => handleCancel(booking._id)}
                        className="text-xs text-red-600 hover:text-red-800 font-medium underline"
                      >
                        Cancel Request
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default MyBookings;
