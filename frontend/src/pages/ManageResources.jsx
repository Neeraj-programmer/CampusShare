import { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Trash2, Edit } from 'lucide-react';
const ManageResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    resourceName: '',
    category: '',
    location: '',
    description: '',
    condition: 'Good',
    availability: 'Available'
  });
  const [isAdding, setIsAdding] = useState(false);
  const fetchResources = async () => {
    try {
      const res = await api.get('/resources');
      setResources(res.data);
    } catch (err) {
      console.error('Failed to fetch', err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchResources();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/resources/add', formData);
      setIsAdding(false);
      setFormData({ resourceName: '', category: '', location: '', description: '', condition: 'Good', availability: 'Available' });
      fetchResources();
    } catch (err) {
      alert('Failed to add resource');
    }
  };
  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await api.delete(`/resources/${id}`);
        fetchResources();
      } catch (err) {
        alert('Failed to delete resource');
      }
    }
  };
  return (
    <div className="space-y-8 min-h-[78vh]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Resources</h1>
          <p className="text-gray-500">Add, view, or remove campus inventory</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)} 
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-700 transition"
        >
          {isAdding ? 'Cancel' : <><Plus className="w-5 h-5"/> Add Resource</>}
        </button>
      </div>
      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 mb-8">
          <h2 className="text-xl font-bold mb-4 text-indigo-900">Add New Resource</h2>
          <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="resourceName" required placeholder="Resource Name" className="border border-gray-300 rounded-lg px-3 py-2" value={formData.resourceName} onChange={handleChange} />
            <input type="text" name="category" required placeholder="Category (e.g. Electronics, Sports)" className="border border-gray-300 rounded-lg px-3 py-2" value={formData.category} onChange={handleChange} />
            <input type="text" name="location" required placeholder="Location" className="border border-gray-300 rounded-lg px-3 py-2" value={formData.location} onChange={handleChange} />
            <select name="condition" className="border border-gray-300 rounded-lg px-3 py-2" value={formData.condition} onChange={handleChange}>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Poor">Poor</option>
            </select>
            <select name="availability" className="border border-gray-300 rounded-lg px-3 py-2" value={formData.availability} onChange={handleChange}>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
            <div className="md:col-span-2">
              <textarea name="description" required placeholder="Description..." rows="2" className="border border-gray-300 rounded-lg px-3 py-2 w-full" value={formData.description} onChange={handleChange}></textarea>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition">Save Resource</button>
            </div>
          </form>
        </div>
      )}
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category & Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {resources.map(resource => (
                <tr key={resource._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{resource.resourceName}</div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">{resource.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{resource.category}</div>
                    <div className="text-sm text-gray-500">{resource.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      resource.availability === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {resource.availability}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">Condition: {resource.condition}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleDelete(resource._id)} className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {resources.length === 0 && <div className="text-center py-10 text-gray-500">No resources found.</div>}
        </div>
      )}
    </div>
  );
};
export default ManageResources;
