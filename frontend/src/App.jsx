import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Auth from "./components/page/Auth";
import FilmDetail from "./components/film/FilmDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />}/>
        <Route path="/auth" element={<Auth/>} />
        <Route path="/auth/:film_name" element={<FilmDetail/>} />
        </Routes>
    </Router> );
  
}

export default App;

