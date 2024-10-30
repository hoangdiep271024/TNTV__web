import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Auth from "./components/page/Auth";
import FilmDetail from "./components/film/FilmDetail";
import FilmTime from "./components/film/FilmTime";
import Lich_chieu from "./components/page/Lich_chieu";
import FilmComment from "./components/film/FilmComment";
import FilmBuy from "./components/film/FilmBuy";
import Cinema from "./components/page/Cinema";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/phim/:film_name" element={<FilmDetail />}/>
        <Route path="/lich_chieu/:film_name" element={<FilmTime />}/>
        <Route path="/lich_chieu" element={<Lich_chieu />}/>
        <Route path="/danh_gia/:film_name" element={<FilmComment/>}/>
        <Route path="/mua_ve/:film_name" element={<FilmBuy/>}/>
        <Route path="/rap" element={<Cinema/>}/>
      </Routes>
    </Router>);

}

export default App;

