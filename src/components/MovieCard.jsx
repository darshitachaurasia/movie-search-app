import React from "react";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function MovieCard({ movie, addToFavourites, isFavourite }) {
  return (
    <div className="max-w-xs rounded-lg shadow-lg bg-gray-900 text-white overflow-hidden">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : `http://img.omdbapi.com/?apikey=${API_KEY}`}
        alt={movie.Title}
        className="w-full h-72 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold truncate">{movie.Title}</h2>
        <p className="text-gray-400">Year: {movie.Year}</p>
        <button
          onClick={() => addToFavourites(movie)}
          className={`mt-3 w-full py-2 px-4 rounded-md font-semibold transition ${
    isFavourite ? "bg-red-500 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;