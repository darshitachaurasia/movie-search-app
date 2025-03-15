import { login, logout } from "./store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import authService from "./appwrite/auth";
import service from "./appwrite/config";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";

function App() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [favourites, setFavourites] = useState([]);
  const userData = useSelector((state) => state.auth.userData); 
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((user) => {
        if (user) {
          dispatch(login(user));
          fetchFavourites(user.$id);
        } else {
          dispatch(logout());
        }
      }).finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  // ✅ Fetch Favourites from Appwrite
  const fetchFavourites = async (userId) => {
    if (!userId) return;
    try {
      const favs = await service.getFavorites(userId);
      setFavourites(favs);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  // ✅ Add movie to favourites
  const addToFavourites = async (movie) => {
    if (!userData?.$id) {
      alert("Login to add favourites!");
      return;
    }
    try {
      await service.addFavorite(movie, userData.$id);
      fetchFavourites(userData.$id);
    } catch (error) {
      console.error("Error adding favourite:", error);
    }
  };

  // ✅ Remove movie from favourites
  const removeFromFavourites = async (movieId) => {
    if (!userData?.$id) return;
    try {
      await service.removeFavorite(movieId);
      fetchFavourites(userData.$id);
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  };

  return !loading ? (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header onSearch={setSearchQuery} />
      <main className="flex-grow">
        <Outlet context={{ searchQuery, favourites, addToFavourites, removeFromFavourites }} />
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;
