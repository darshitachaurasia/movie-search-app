import React from "react";

function MovieCard({ movie, addToFavourites, removeFromFavourites, isFavourite }) {
  return (
    <div className="max-w-xs rounded-lg shadow-2xl bg-[#F1F0EB] text-black overflow-hidden">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
        alt={movie.Title}
        className="w-full h-72 object-cover p-2"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold truncate">{movie.Title}</h2>
        <p className="text-gray-400">Year: {movie.Year}</p>
        <button
          onClick={() => (isFavourite ? removeFromFavourites(movie.imdbID) : addToFavourites(movie))}
          className={`mt-3 w-full py-2 px-4 rounded-md text-white font-semibold transition ${
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
