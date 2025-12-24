import React from "react";
import { useNavigate } from "react-router";
import "../assets/styles/backbutton.css";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="back-btn" onClick={() => navigate(-1)}>
      {"<"}
    </button>
  );
};

export default BackButton;
