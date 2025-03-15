import { useState, useEffect } from "react";
import axios from "axios";
import { MovieCard } from "../components";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function Home({ addToFavourites, favourites }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      if (!search) return;
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(
          `/api/?s=${searchQuery}&apikey=${API_KEY}`
        );
        
        console.log("Fetched Movies:", response.data); // Debugging
        setMovies(response.data.Search || []);
        setLoading(false);
      } catch (error) {
        console.error("API Error:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [search]);

  return (
    <div className="container mx-auto p-4">
      
      <h1 className="text-xl font-semibold">No. of Movies: {movies.length}</h1>
      {loading && <h1 className="text-center text-blue-500">Loading...</h1>}
      {error && <h1 className="text-center text-red-500">Something went wrong</h1>}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            addToFavourites={addToFavourites}
            isFavourite={favourites.some((fav) => fav.imdbID === movie.imdbID)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
