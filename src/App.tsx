import { Routes, Route } from 'react-router-dom';
import UserList from './pages/UserList';
import UserDetails from './pages/UserDetails';

function App() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-slate-800">User Management App</h1>
        </nav>
      </header>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<UserList/>} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;