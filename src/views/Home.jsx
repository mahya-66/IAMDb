import { useEffect, useState } from "react";
import HomeSkeleton from "../components/HomeSkeleton";
import "../assets/styles/home.css";
import { useNavigate } from "react-router";
import searchIcon from "../assets/images/Search.svg";
import SearchBar from "../components/SearchBar";
// import micIcon from "../assets/images/Mic (2).svg";

const API_URL = "https://moviesapi.codingfront.dev/api/v1/genres";

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/result/search/${query}`);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <HomeSkeleton />;

  return (
    <div className="home">
      <div className="container">
        <h1 className="logo">IAMDb</h1>
        <SearchBar />

        <div className="categories">
          {categories.slice(0, visibleCount).map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/result/genre/${cat.name}`)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {visibleCount < categories.length && (
          <button
            className="show-more"
            onClick={() => setVisibleCount((prev) => prev + 4)}
          >
            <span className="unicode">{"\u02C3"}</span>
            <span>Show More</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
