import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { deleteUser } from '../redux/usersSlice';
import type { User } from '../types/user';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent navigation when delete button is clicked
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      dispatch(deleteUser(user.id)); // Dispatch delete user action
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 flex flex-col justify-between">
      <Link to={`/user/${user.id}`} className="block">
        <h3 className="text-xl font-bold text-slate-800 truncate">{user.name}</h3>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-500 mt-2">{user.company.name}</p>
      </Link>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleDelete}
          className="text-sm bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;