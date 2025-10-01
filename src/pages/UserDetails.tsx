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
  const user = useSelector((state: RootState) =>
    state.users.users.find(u => u.id === Number(id))
  );

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch]);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const { name, value } = e.target;
      // Handle nested address object for editing
      if (name.startsWith('address.')) {
        const addressField = name.split('.')[1];
        setFormData({
          ...formData,
          address: { ...formData.address, [addressField]: value },
        });
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

  if (usersStatus === 'loading' || usersStatus === 'idle') {
    return <p className="text-center text-gray-500">Loading user details...</p>;
  }

  if (!user) {
    return (
      <div className="text-center">
        <p className="text-xl text-red-500">User not found.</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          &larr; Back to User List
        </Link>
      </div>
    );
  }

  const fullAddress = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      {!isEditing ? (
        <>
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold mb-4 text-slate-800">{user.name}</h2>
            <button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded">Edit</button>
          </div>
          <div className="space-y-3 text-gray-700">
            {/* Display Address instead of Email */}
            <p><strong>Address:</strong> {fullAddress}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{user.website}</a></p>
          </div>
        </>
      ) : (
        <form onSubmit={handleUpdate}>
          <h2 className="text-3xl font-bold mb-4 text-slate-800">Edit User</h2>
          <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input name="name" value={formData?.name || ''} onChange={handleInputChange} className="w-full p-2 border rounded mt-1" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Street</label>
                <input name="address.street" value={formData?.address.street || ''} onChange={handleInputChange} className="w-full p-2 border rounded mt-1" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input name="phone" value={formData?.phone || ''} onChange={handleInputChange} className="w-full p-2 border rounded mt-1" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Website</label>
                <input name="website" value={formData?.website || ''} onChange={handleInputChange} className="w-full p-2 border rounded mt-1" />
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Cancel</button>
          </div>
        </form>
      )}
      <div className="mt-6">
        <Link to="/" className="text-blue-600 hover:underline">
          &larr; Back to User List
        </Link>
      </div>
    </div>
  );
};

export default UserDetails;