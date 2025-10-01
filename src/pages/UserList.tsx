import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { fetchUsers, addUser } from '../redux/usersSlice';
import type { User } from '../types/user';
import UserCard from '../components/UserCard';
import AddUserForm from '../components/AddUserForm';

type SortOption = 'name-asc' | 'name-desc' | 'email-asc' | 'email-desc' | 'default';

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, error } = useSelector((state: RootState) => state.users);
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (status === 'idle' && users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [status, dispatch, users.length]);

  const handleAddUser = (newUser: Omit<User, 'id' | 'address' | 'phone' | 'website'>) => {
    const userWithId: User = {
      ...newUser, id: Date.now(), address: { street: '', suite: '', city: '', zipcode: '' }, phone: '', website: '',
    };
    dispatch(addUser(userWithId));
  };

  const sortedAndFilteredUsers = useMemo(() => {
    const result = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    switch (sortOption) {
      case 'name-asc': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': result.sort((a, b) => b.name.localeCompare(a.name)); break;
      case 'email-asc': result.sort((a, b) => a.email.localeCompare(b.email)); break;
      case 'email-desc': result.sort((a, b) => b.email.localeCompare(a.email)); break;
      default: break;
    }
    return result;
  }, [users, searchTerm, sortOption]);

  if (status === 'loading') return <div className="text-center py-10 text-gray-500">Loading users...</div>;
  if (status === 'failed') return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-8">
      {isFormVisible && (
        <AddUserForm 
          onAddUser={handleAddUser} 
          onClose={() => setIsFormVisible(false)}
        />
      )}
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-md">
        <div className="relative w-full md:w-1/3">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </span>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="default">Sort By</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="email-asc">Email (A-Z)</option>
            <option value="email-desc">Email (Z-A)</option>
          </select>
          <button 
            onClick={() => setIsFormVisible(true)}
            className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            Add User
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedAndFilteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;