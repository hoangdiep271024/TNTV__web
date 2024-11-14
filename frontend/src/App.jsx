import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FilmBuy from "./components/film/FilmBuy";
import FilmComment from "./components/film/FilmComment";
import FilmTime from "./components/film/FilmTime";
import BookingTicket from "./components/Mua_ve/index";
import Thong_tin_ve from "./components/Mua_ve/Thong_tin_ve";
import Auth from "./components/page/Auth";
import Cinema from "./components/page/Cinema";
import FilmDetail from "./components/page/FilmDetail";
import Lich_chieu from "./components/page/Lich_chieu";
import CinemaTime from "./components/page/CinemaTime";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/phim/:film_name" element={<FilmDetail />}/>
        <Route path="/lich_chieu/:film_name" element={<FilmTime />}/>
        <Route path="/lich_chieu" element={<Lich_chieu />}/>
        <Route path="/dat_ve/:film_name" element = {<BookingTicket/>}/>
        <Route path="/thong_tin_ve" element = {<Thong_tin_ve/>}/>
        <Route path="/danh_gia/:film_name" element={<FilmComment/>}/>
        <Route path="/mua_ve/:film_name" element={<FilmBuy/>}/>
        <Route path="/rap" element={<Cinema/>}/>
        <Route path="/rap/:cinema_name" element={<CinemaTime/>}/>
        
      </Routes>
    </Router>);

}

export default App;

