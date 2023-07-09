import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";

// API url and key to fetch movie data
const API_URL = "http://www.omdbapi.com?apikey=9692753d";

// Data of a movie {title, year, imdbID, type, poster}
// const movie = {
//   Title: "Spiderman in Cannes",
//   Year: "2016",
//   imdbID: "tt5978586",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BZDlmMGQwYmItNTNmOS00OTNkLTkxNTYtNDM3ZWVlMWUyZDIzXkEyXkFqcGdeQXVyMTA5Mzk5Mw@@._V1_SX300.jpg",
// };

// we want to fetch the movie data from the API as soon as the component loads so
// we need to use the useEffect hook to fetch the data

const App = () => {
  // This state will help map over all the movies in the database
  const [movies, setMovies] = useState([]);
  // This state is for the search bar
  const [searchTerm, setSearchTerm] = useState("");

  // asynchronous function means it takes some time to fetch the data
  // searchMovies accepts a title which is the title of the movie to search for
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`); // this will call the API
    const data = await response.json(); // fill the data object as a json object

    setMovies(data.Search);
  };

  {
    /* Inside the useEffect hook, we're going to call a function that will fetch the movies */
  }
  useEffect(() => {
    searchMovies("Spiderman");
  }, []);

  return (
    <div className="app">
      <h1>ScreenBox</h1>
      <div className="search">
        {/* Input is the search bar field and requires the following properties */}
        <input placeholder="Search for movies" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <img src={searchIcon} alt="search" onClick={() => searchMovies(searchTerm)} /> {/*takes the search term and searches movies*/}
      </div>

      {/* if the length of movies is greater than zero, then populate the container div with MovieCards */}
      {movies?.length > 0 ? (
        <div className="container">
          {/* map over all the movies in the database and render a MovieCard component for each movie */}
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
