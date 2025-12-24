import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../assets/styles/result.css";
import SearchBar from "../components/SearchBar";
import HomeSkeleton from "../components/HomeSkeleton";
import FavoriteButton from "../components/FavoriteButton";
import BackButton from "../components/BackButton";

const Result = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const toggleFavorite = (movie) => {
    let updated;
    if (favorites.find((f) => f.id === movie.id)) {
      updated = favorites.filter((f) => f.id !== movie.id);
    } else {
      updated = [...favorites, movie];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };
  const { query, type } = useParams();

  const [movies, setMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query || !type) return;

    setLoading(true);
    setMovies([]);
    setVisibleCount(5);

    fetch("https://moviesapi.codingfront.dev/api/v1/movies")
      .then((res) => res.json())
      .then((result) => {
        let data = result.data || [];

        if (type === "genre") {
          data = data.filter(
            (movie) =>
              Array.isArray(movie.genres) &&
              movie.genres
                .map((g) => g.toLowerCase())
                .includes(query.toLowerCase())
          );
        }

        if (type === "search") {
          data = data.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase())
          );
        }

        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [query, type]);

  const navigate = useNavigate();

  if (loading) return <HomeSkeleton />;

  return (
    <div className="container">
      <div className="result-page">
        <BackButton />
        <div className="result-header">
          <h2 className="query-title">Results</h2>
          <p className="query-text"> for "{`${query} Query`}"</p>
        </div>
        {movies.length === 0 && <p className="empty">No Results Found</p>}
        <SearchBar />
        <div className="movie-list">
          {movies.slice(0, visibleCount).map((movie) => (
            <div
              className="movie-card"
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <img src={movie.poster} alt={movie.title} className="poster" />

              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="genre">{movie.genres.join(", ")}</p>
                <p className="meta">
                  {movie.year} • {movie.country} • ⭐ {movie.imdb_rating}
                </p>
              </div>

              <FavoriteButton movieId={movie.id} />
            </div>
          ))}
        </div>
      </div>

      {visibleCount < movies.length && (
        <button
          className="show-more"
          onClick={() => setVisibleCount((prev) => prev + 5)}
        >
          Show More
        </button>
      )}
    </div>
  );
};
export default Result;
