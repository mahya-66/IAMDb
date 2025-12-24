import { useEffect, useState } from "react";

const FavoriteButton = ({ movieId, className, isMobile }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setLiked(stored.includes(movieId));
  }, [movieId]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    let stored = JSON.parse(localStorage.getItem("favorites")) || [];

    if (stored.includes(movieId)) {
      stored = stored.filter((id) => id !== movieId);
      setLiked(false);
    } else {
      stored.push(movieId);
      setLiked(true);
    }

    localStorage.setItem("favorites", JSON.stringify(stored));
  };

  if (!isMobile) {
    return (
      <button
        className={`${className} ${liked ? "liked" : ""}`}
        onClick={toggleFavorite}
        aria-label="favorite"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <svg
          width="35"
          height="35"
          viewBox="0 0 24 24"
          fill={liked ? "#a855f7" : "none"}
          stroke={liked ? "#a855f7" : "white"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
    );
  }

  return (
    <button
      className={`${className} ${liked ? "liked" : ""}`}
      onClick={toggleFavorite}
      aria-label="favorite"
      style={{
        width: "100%",
        backgroundColor: liked ? "#222C4F" : "#724CF9",
        color: liked ? "#fff" : "#fff",
        padding: "12px 20px",
        borderRadius: "12px",
        border: "none",
        cursor: "pointer",
        transition: "0.2s",
      }}
    >
      {liked ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
