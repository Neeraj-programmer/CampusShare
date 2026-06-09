import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { Clock, Calendar, Info, ArrowLeft } from 'lucide-react';
const BookResource = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    purpose: ''
  });
  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await api.get(`/resources/${id}`);
        setResource(res.data);
      } catch (err) {
        setError('Resource not found');
      } finally {
        setLoading(false);
      }
    };
    fetchResource();
  }, [id]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/bookings/create', {
        resourceId: id,
        ...formData
      });
      setSuccess('Booking request submitted successfully! Awaiting admin approval.');
      setTimeout(() => {
        navigate('/student/my-bookings');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit booking request');
    }
  };
  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!resource) return <div className="text-center mt-20 text-red-500">{error}</div>;
  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-500 hover:text-indigo-600 mb-6 transition">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-indigo-600 p-6 text-white">
          <h2 className="text-2xl font-bold">{resource.resourceName}</h2>
          <p className="text-indigo-100 mt-1">{resource.category}</p>
        </div>
        <div className="p-6">
          <div className="bg-indigo-50 text-indigo-800 p-4 rounded-lg mb-6 flex items-start gap-3">
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Resource Details</p>
              <p className="text-sm mt-1">{resource.description}</p>
              <p className="text-sm mt-1"><strong>Location:</strong> {resource.location} | <strong>Condition:</strong> {resource.condition}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm border border-red-100">{error}</div>}
            {success && <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm border border-green-100">{success}</div>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Calendar className="w-4 h-4" /> Date</label>
              <input type="date" name="date" required min={new Date().toISOString().split('T')[0]} className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Clock className="w-4 h-4" /> Start Time</label>
                <input type="time" name="startTime" required className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Clock className="w-4 h-4" /> End Time</label>
                <input type="time" name="endTime" required className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" onChange={handleChange} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purpose of Booking</label>
              <textarea name="purpose" required rows="3" placeholder="Explain briefly why you need this resource..." className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" onChange={handleChange}></textarea>
            </div>
            <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center h-5">
                <input id="terms" type="checkbox" required className="w-4 h-4 text-indigo-600 bg-white border-gray-300 rounded focus:ring-indigo-500" />
              </div>
              <div className="text-sm text-blue-900">
                <label htmlFor="terms" className="font-medium cursor-pointer">I accept full responsibility for this resource.</label>
                <p className="mt-0.5 text-blue-700/80">I agree to return it in the exact condition I received it. Any damage or loss will be penalized against my College ID.</p>
              </div>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Submit Booking Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default BookResource;
