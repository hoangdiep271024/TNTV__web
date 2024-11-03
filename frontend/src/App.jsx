import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FilmBuy from "./components/film/FilmBuy";
import FilmComment from "./components/film/FilmComment";
import FilmDetail from "./components/page/FilmDetail";
import FilmTime from "./components/film/FilmTime";
import BookingTicket from "./components/Mua_ve/index";
import Auth from "./components/page/Auth";
import Cinema from "./components/page/Cinema";
import Lich_chieu from "./components/page/Lich_chieu";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/phim/:film_name" element={<FilmDetail />}/>
        <Route path="/lich_chieu/:film_name" element={<FilmTime />}/>
        <Route path="/lich_chieu" element={<Lich_chieu />}/>
        <Route path="/dat_ve/:showtime_id" element = {<BookingTicket/>}/>
        <Route path="/danh_gia/:film_name" element={<FilmComment/>}/>
        <Route path="/mua_ve/:film_name" element={<FilmBuy/>}/>
        <Route path="/rap" element={<Cinema/>}/>
      </Routes>
    </Router>);

}

export default App;

