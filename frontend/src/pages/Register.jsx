import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    department: '',
    semester: 1,
    rollNumber: '',
    adminSecret: ''
  });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(formData);
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">Join CampusShare today</p>
        </div>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 font-medium">{error}</div>}
          <div className="space-y-4">
            <input name="name" type="text" required className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm bg-gray-50 hover:bg-white" placeholder="Full Name" onChange={handleChange} />
            <input name="email" type="email" required className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm bg-gray-50 hover:bg-white" placeholder="College Email address" onChange={handleChange} />
            <input name="password" type="password" required className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm bg-gray-50 hover:bg-white" placeholder="Password" onChange={handleChange} />
            <div className="grid grid-cols-2 gap-4">
              <input name="department" type="text" required className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm bg-gray-50 hover:bg-white" placeholder="Department (e.g. CSE)" onChange={handleChange} />
              <input name="semester" type="number" min="1" max="8" required className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm bg-gray-50 hover:bg-white" placeholder="Semester (1-8)" onChange={handleChange} />
            </div>
            <select name="role" className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm bg-gray-50 hover:bg-white cursor-pointer font-medium" onChange={handleChange}>
              <option value="student">Register as Student</option>
              <option value="admin">Register as Admin</option>
            </select>
            {formData.role === 'student' && (
              <input name="rollNumber" type="text" required className="appearance-none block w-full px-4 py-3 border-2 border-indigo-100 rounded-xl text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm bg-indigo-50 placeholder-indigo-400" placeholder="College ID / Roll Number" onChange={handleChange} />
            )}
            {formData.role === 'admin' && (
              <input name="adminSecret" type="password" required className="appearance-none block w-full px-4 py-3 border-2 border-red-100 rounded-xl text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all sm:text-sm bg-red-50 placeholder-red-400" placeholder="Admin Secret Key (ADMIN123)" onChange={handleChange} />
            )}
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Register
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Register;
