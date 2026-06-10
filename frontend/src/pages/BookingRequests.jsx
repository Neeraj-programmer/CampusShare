import { useState, useEffect } from 'react';
import api from '../api';
import { AlertTriangle, Check, X, User } from 'lucide-react';
const BookingRequests = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [warnings, setWarnings] = useState({});
  const fetchBookings = async () => {
    try {
      const res = await api.get('/bookings/all');
      setBookings(res.data);
      res.data.forEach(booking => {
        if (booking.status === 'Pending') {
          checkWarning(booking._id);
        }
      });
    } catch (err) {
      console.error('Failed to fetch bookings', err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);
  const checkWarning = async (bookingId) => {
    try {
      const res = await api.get(`/bookings/fair-warning/${bookingId}`);
      if (res.data.warning) {
        setWarnings(prev => ({ ...prev, [bookingId]: res.data.message }));
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleStatusChange = async (id, action) => {
    try {
      await api.put(`/bookings/${id}/${action}`);
      fetchBookings();
    } catch (err) {
      alert(`Failed to ${action} booking`);
    }
  };
  return (
    <div className="space-y-6 min-h-[78vh]">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Booking Requests</h1>
        <p className="text-gray-500">Review and manage student resource bookings</p>
      </div>
      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
        <div className="space-y-6">
          {bookings.map(booking => (
            <div key={booking._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className={`p-1 ${
                booking.status === 'Pending' ? 'bg-yellow-400' : 
                booking.status === 'Approved' ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{booking.resourceId?.resourceName || 'Unknown Resource'}</h3>
                        <p className="text-sm font-medium text-indigo-600 bg-indigo-50 inline-block px-2 py-0.5 rounded mt-1">Status: {booking.status}</p>
                      </div>
                      <div className="text-right text-sm text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-100">
                        <p className="font-bold text-gray-700">{booking.date}</p>
                        <p>{booking.startTime} - {booking.endTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <User className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{booking.userId?.name || 'Unknown Student'}</p>
                        <p className="text-gray-500">{booking.userId?.email}</p>
                        {booking.userId?.rollNumber && (
                          <p className="text-indigo-600 font-bold mt-1 text-xs uppercase tracking-wider">
                            Roll No: {booking.userId.rollNumber}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">Purpose:</p>
                      <p className="text-gray-700 italic border-l-4 border-indigo-200 pl-3 py-1">"{booking.purpose}"</p>
                    </div>
                    {warnings[booking._id] && booking.status === 'Pending' && (
                      <div className="bg-red-50 text-red-700 border border-red-200 p-3 rounded-lg flex items-start gap-2 text-sm mt-4">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p className="font-medium">{warnings[booking._id]}</p>
                      </div>
                    )}
                  </div>
                  {booking.status === 'Pending' && (
                    <div className="flex md:flex-col gap-3 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                      <button 
                        onClick={() => handleStatusChange(booking._id, 'approve')}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition"
                      >
                        <Check className="w-4 h-4" /> Approve
                      </button>
                      <button 
                        onClick={() => handleStatusChange(booking._id, 'reject')}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg font-bold hover:bg-red-200 transition"
                      >
                        <X className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {bookings.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">No booking requests found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default BookingRequests;
