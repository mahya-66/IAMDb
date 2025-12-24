import { useState } from "react";
import { useNavigate } from "react-router";
import searchIcon from "../assets/images/search 1.svg";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/result/search/${SearchValue}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-box">
      <button className="search" onClick={handleSearch}>
        <img src={searchIcon} alt="search" />
      </button>
      <input
        placeholder="Search Query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
