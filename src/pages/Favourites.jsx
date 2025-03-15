import React from "react";
import { MovieCard } from "../components";

function Favourites({ favourites, removeFromFavourites }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-4 text-white">Favourites</h1>
      {favourites.length === 0 ? (
        <p className="text-center text-gray-400">No favourite movies added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {favourites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              addToFavourites={removeFromFavourites}
              isFavourite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;



