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

  const initials = user.name.split(' ').map(n => n[0]).join('');

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      dispatch(deleteUser(user.id));
    }
  };

  return (
    <div className="group relative bg-white p-5 rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <div className="flex-grow">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-2xl">
            {initials}
          </div>
          <div className="overflow-hidden">
            <h3 className="text-lg font-bold text-slate-800 truncate">{user.name}</h3>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded-md">{user.company.name}</p>
      </div>
      
      <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Link to={`/user/${user.id}`} className="p-2 bg-gray-200 rounded-full hover:bg-blue-500 hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
        </Link>
        <button
          onClick={handleDelete}
          className="p-2 bg-gray-200 rounded-full hover:bg-red-500 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default UserCard;