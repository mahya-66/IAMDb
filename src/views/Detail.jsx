import { useParams } from "react-router";
import { useEffect, useState } from "react";
import FavoriteButton from "../components/FavoriteButton";
import RatingPie from "../components/RatingPie";
import "../assets/styles/detail.css";
import ClockIcon from "../assets/images/clock-two 1.svg";
import BackButton from "../components/BackButton";

const API_URL = "https://moviesapi.codingfront.dev/api/v1/movies";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(API_URL)
      .then((res) => res.json())
      .then((result) => {
        const found = result.data.find((m) => String(m.id) === String(id));
        setMovie(found);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const DetailRow = ({ label, value }) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "start",
          gap: "250px",
          marginBottom: "12px",
          marginTop: "12px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          paddingBottom: "12px",
        }}
        className="detail-row"
      >
        <strong
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {label}
        </strong>
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: "0.5",
          }}
        >
          {Array.isArray(value) ? value.join(",") : value ? value : "-"}
        </span>
      </div>
    );
  };

  if (movie === null) return <p className="loading">Loading...</p>;
  if (!movie) return <p className="loading">Movie Not Found</p>;

  return (
    <div className="container">
      <div className="movie-wrapper">
        <BackButton />
        <div
          className="static-header"
          style={{ backgroundImage: `url(${movie.poster})` }}
        />
        <div className="movie-details">
          <div className="details-wrapper container">
            <div className="left-col">
              <div className="poster-wrapper">
                <img src={movie.poster} alt={movie.title} />
                <FavoriteButton className="heart-btn" movieId={movie.id} />

                <div className="rating-box">
                  <RatingPie score={Number(movie.imdb_rating) * 10} />
                  <div
                    className="rating-summary"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      marginTop: "12px",
                    }}
                  >
                    <p style={{ margin: 0 }}>
                      {Number(movie.imdb_votes).toLocaleString()} ratings on
                      IMDB
                    </p>
                    <p>
                      {movie.imdb_votes
                        ? `${Number(
                            movie.imdb_votes
                          ).toLocaleString()} ratings on IMDB`
                        : "No IMDb votes available"}
                    </p>
                    <p>
                      {movie.metascore
                        ? `${movie.metascore}/100 on Metacritic`
                        : "No Metacritic data"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="info">
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="genres">
                  {movie.genres?.map((g, i) => (
                    <span key={g}>
                      {g}
                      {i !== movie.genres.length - 1 && ", "}
                    </span>
                  ))}
                </div>
                <p className="plot">{movie.plot}</p>
              </div>
              <div className="meta">
                <div className="meta-badge">{movie.rated}</div>
                <div className="meta-badge">{movie.year}</div>
                <div className="meta-badge meta-badge_1">
                  <img src={ClockIcon} alt="run Time" />
                  {movie.runtime}
                </div>
              </div>

              <h3 className="details-title">Details</h3>
              <div className="details-table">
                <DetailRow label="Director" value={movie.director} />
                <DetailRow label="Writers" value={movie.writers} />
                <DetailRow label="Actors" value={movie.actors} />
                <DetailRow label="Country" value={movie.country} />
                <DetailRow label="Language" value={movie.languages || "-"} />
                <DetailRow label="Awards" value={movie.awards} />
              </div>
            </div>
          </div>
        </div>
        <FavoriteButton
          className="mobile-fav-btn"
          movieId={movie.id}
          isMobile={true}
        >
          Add to Favorites
        </FavoriteButton>
      </div>
    </div>
  );
};
export default MovieDetails;
