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

  useEffect(() => {
    // Only fetch users if the list is empty.
    // This prevents overwriting our locally saved data on every refresh.
    if (status === 'idle' && users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [status, dispatch, users.length]);

  // ... the rest of the file remains the same ...

  const handleAddUser = (newUser: Omit<User, 'id' | 'address' | 'phone' | 'website'>) => {
    const userWithId: User = {
      ...newUser,
      id: Date.now(),
      address: { street: '', suite: '', city: '', zipcode: '' },
      phone: '',
      website: '',
    };
    dispatch(addUser(userWithId));
  };

  const sortedAndFilteredUsers = useMemo(() => {
    const result = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortOption) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'email-asc':
        result.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case 'email-desc':
        result.sort((a, b) => b.email.localeCompare(a.email));
        break;
      default:
        break;
    }
    return result;
  }, [users, searchTerm, sortOption]);

  if (status === 'loading') return <p className="text-center text-gray-500">Loading users...</p>;
  if (status === 'failed') return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div>
      <AddUserForm onAddUser={handleAddUser} />
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          className="w-full md:w-auto p-3 border border-gray-300 rounded-lg bg-white"
        >
          <option value="default">Sort By...</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="email-asc">Email (A-Z)</option>
          <option value="email-desc">Email (Z-A)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAndFilteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;