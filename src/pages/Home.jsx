import { useState, useEffect } from "react";
import { fetchMovies } from "../utils/api";
import { MovieCard } from "../components";
import { useOutletContext } from "react-router-dom";

function Home() {
  const { addToFavourites, removeFromFavourites, favourites } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!search) return;
      setLoading(true);

      const data = await fetchMovies(search);
      setMovies(data?.Search || []);

      setLoading(false);
    };

    fetchMovieData();
  }, [search]);

  return (
    <div className="container mx-auto p-4">
      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 mr-2 rounded-md w-2/3"
        />
        <button className="bg-blue-500 text-white p-2 rounded-md w-1/6">
          Search
        </button>
      </div>

      {/* Display Movies */}
      {loading && <h1 className="text-center text-blue-500">Loading...</h1>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            addToFavourites={addToFavourites}
            removeFromFavourites={removeFromFavourites}
            isFavourite={favourites.some((fav) => fav.imdbID === movie.imdbID)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
