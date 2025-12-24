import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import App from "./App.jsx";
import Home from "./views/Home";
import Result from "./views/Result.jsx";
import MovieDetails from "./views/Detail.jsx";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="result/:type/:query" element={<Result />} />
          <Route path="movie/:id" element={<MovieDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
