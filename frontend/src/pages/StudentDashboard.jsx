import { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Compass, CalendarDays, Zap } from 'lucide-react';
const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [idleResources, setIdleResources] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchIdleResources = async () => {
      try {
        const res = await api.get('/bookings/idle-resources');
        setIdleResources(res.data);
      } catch (err) {
        console.error('Failed to fetch idle resources', err);
      } finally {
        setLoading(false);
      }
    };
    fetchIdleResources();
  }, []);
  return (
    <div className="space-y-12">
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-[2rem] p-10 sm:p-14 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-500 opacity-20 blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
            Welcome back, <span className="text-indigo-300">{user?.name}</span>!
          </h1>
          <p className="text-indigo-100/80 text-lg sm:text-xl max-w-2xl font-light">
            Ready to build something amazing? Find and book the resources you need for your next big project.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/student/browse" className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
              <Compass className="w-5 h-5" /> Browse Resources
            </Link>
            <Link to="/student/my-bookings" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-white/20 transition-all shadow-lg hover:-translate-y-1">
              <CalendarDays className="w-5 h-5" /> My Bookings
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-800">Available Now (Idle Resources)</h2>
        </div>
        <p className="text-gray-500 mb-6">These resources have zero or very few bookings. Grab them quickly!</p>
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading resources...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {idleResources.map(resource => (
              <div key={resource._id} className="bg-white rounded-[1.5rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-1">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 p-6 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{resource.resourceName}</h3>
                    <span className="inline-block bg-indigo-100/80 text-indigo-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                      {resource.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-500 mb-6 line-clamp-2 text-sm leading-relaxed">{resource.description}</p>
                  <div className="flex justify-between items-center text-sm mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100/50">
                    <span className="text-gray-600 font-medium flex items-center gap-1">📍 {resource.location}</span>
                    <span className={`font-bold flex items-center gap-1 ${resource.availability === 'Available' ? 'text-green-600' : 'text-red-500'}`}>
                      <div className={`w-2 h-2 rounded-full ${resource.availability === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      {resource.availability}
                    </span>
                  </div>
                  <Link 
                    to={`/student/book/${resource._id}`} 
                    className={`block text-center w-full py-3.5 rounded-xl font-bold transition-all ${
                      resource.availability === 'Available' 
                        ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white hover:shadow-md' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
                    }`}
                  >
                    {resource.availability === 'Available' ? 'Book Now' : 'Not Available'}
                  </Link>
                </div>
              </div>
            ))}
            {idleResources.length === 0 && !loading && (
              <div className="col-span-full text-center py-10 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                No idle resources found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default StudentDashboard;
