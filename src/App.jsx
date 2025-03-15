import { login, logout } from './store/authSlice';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import authService from './appwrite/auth';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components';

function App() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return !loading ? (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header onSearch={setSearchQuery} /> {/* 🔍 Pass search function to Header */}
      
      <main className="flex-grow">
        <Outlet context={{ searchQuery }} /> {/* 🔍 Pass searchQuery to all pages */}
      </main>

      <Footer />
    </div>
  ) : null;
}

export default App;
