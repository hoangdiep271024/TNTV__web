import React from "react";
import Home from "./components/page/Home";
import Auth from "./components/page/Auth";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />}/>
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        </Routes>
    </Router> );
  
}

export default App;
