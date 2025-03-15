import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

// Function to fetch movies based on search term
export const fetchMovies = async (searchTerm) => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return null;
  }
};
