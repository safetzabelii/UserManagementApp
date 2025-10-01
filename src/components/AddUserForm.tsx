import React, { useState } from 'react';

interface AddUserFormProps {
  onAddUser: (user: { name: string; email: string; company: { name: string } }) => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onAddUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form with validation (name and email required) 
    if (!name.trim() || !email.trim()) {
      setError('Name and Email are required.');
      return;
    }
    setError('');
    onAddUser({ name, email, company: { name: companyName } });
    // Reset form fields
    setName('');
    setEmail('');
    setCompanyName('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Add a New User</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name (Required)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email (Required)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700">
          Add User
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;