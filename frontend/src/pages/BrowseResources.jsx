import { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
const BrowseResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await api.get('/resources');
        setResources(res.data);
      } catch (err) {
        console.error('Failed to fetch resources', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);
  const filteredResources = resources.filter(r => 
    r.resourceName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-6 min-h-[78vh]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Browse Resources</h1>
          <p className="text-gray-500">Find and book the equipment you need</p>
        </div>
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm"
            placeholder="Search by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <div key={resource._id} className="bg-white rounded-xl flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-2 hover:border hover:border-[#4F39F6]">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{resource.resourceName}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    resource.availability === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {resource.availability}
                  </span>
                </div>
                <div className="mb-4">
                  <span className="inline-block bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded font-medium mb-2">
                    {resource.category}
                  </span>
                  <p className="text-gray-600 text-sm">{resource.description}</p>
                </div>
                <div className="space-y-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                  <p>📍 <span className="font-medium text-gray-700">Location:</span> {resource.location}</p>
                  <p>✨ <span className="font-medium text-gray-700">Condition:</span> {resource.condition}</p>
                </div>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <Link 
                  to={`/student/book/${resource._id}`} 
                  className={`block text-center w-full py-2.5 rounded-lg font-medium transition ${
                    resource.availability === 'Available' 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
                  }`}
                >
                  {resource.availability === 'Available' ? 'Request Booking' : 'Currently Unavailable'}
                </Link>
              </div>
            </div>
          ))}
          {filteredResources.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">No resources found matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default BrowseResources;
