import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Auth from "./components/page/Auth";
import Home from "./components/page/Home";

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
