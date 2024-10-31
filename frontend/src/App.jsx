import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FilmDetail from "./components/film/FilmDetail";
import FilmTime from "./components/film/FilmTime";
import BookingTicket from "./components/Mua_ve/index";
import Auth from "./components/page/Auth";
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
        <Route path="/mua_ve/:showtime_id" element = {<BookingTicket/>}/>
      </Routes>
    </Router>);

}

export default App;

