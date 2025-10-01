import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { updateUser, fetchUsers } from '../redux/usersSlice';
import type { User } from '../types/user';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const usersStatus = useSelector((state: RootState) => state.users.status);
  const user = useSelector((state: RootState) => state.users.users.find(u => u.id === Number(id)));

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch]);

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const { name, value } = e.target;
      if (name.startsWith('address.')) {
        const addressField = name.split('.')[1];
        setFormData({ ...formData, address: { ...formData.address, [addressField]: value } });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      dispatch(updateUser(formData));
      setIsEditing(false);
    }
  };

  if (usersStatus === 'loading' || usersStatus === 'idle') return <p className="text-center py-10 text-gray-500">Loading user details...</p>;
  if (!user) return <div className="text-center py-10"><p className="text-xl text-red-500">User not found.</p><Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">&larr; Back to User List</Link></div>;

  const fullAddress = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
  const initials = user.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="bg-white rounded-2xl shadow-xl max-w-4xl mx-auto">
      <div className="p-8 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold text-4xl">
            {initials}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-4xl font-extrabold text-slate-800">{user.name}</h2>
            <p className="text-lg text-gray-500">{user.company.name}</p>
          </div>
          <div className="sm:ml-auto">
             {!isEditing && <button onClick={() => setIsEditing(true)} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">Edit Profile</button>}
          </div>
        </div>
      </div>
      
      <div className="p-8">
        {!isEditing ? (
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="col-span-1"><dt className="font-semibold text-gray-700">Address</dt><dd className="mt-1 text-gray-900">{fullAddress}</dd></div> {/* [cite: 1] */}
            <div className="col-span-1"><dt className="font-semibold text-gray-700">Phone</dt><dd className="mt-1 text-gray-900">{user.phone}</dd></div> {/* [cite: 1] */}
            <div className="col-span-1"><dt className="font-semibold text-gray-700">Website</dt><dd className="mt-1 text-blue-600 hover:underline"><a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></dd></div> {/* [cite: 1] */}
          </dl>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-6">
            <h3 className="text-xl font-bold text-slate-700">Edit Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium text-gray-700">Name</label><input name="name" value={formData?.name || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md"/></div>
              <div><label className="block text-sm font-medium text-gray-700">Phone</label><input name="phone" value={formData?.phone || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md"/></div>
              <div><label className="block text-sm font-medium text-gray-700">Website</label><input name="website" value={formData?.website || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md"/></div>
              <div><label className="block text-sm font-medium text-gray-700">Street</label><input name="address.street" value={formData?.address.street || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md"/></div>
            </div>
            <div className="flex justify-end gap-4">
              <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">Save Changes</button>
            </div>
          </form>
        )}
      </div>
       <div className="p-8 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
        <Link to="/" className="text-blue-600 hover:underline font-semibold">&larr; Back to User List</Link>
      </div>
    </div>
  );
};

export default UserDetails;