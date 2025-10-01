import { Routes, Route } from 'react-router-dom';
import UserDetails from './pages/UserDetails';
import UserList from './pages/UserList';


function App() {
  return (
    <div className="bg-slate-100 min-h-screen font-sans">
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-20">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            User Management Dashboard
          </h1>
        </nav>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;