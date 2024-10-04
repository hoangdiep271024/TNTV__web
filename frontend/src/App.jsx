import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Auth from "./components/page/Auth";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />}/>
        <Route path="/auth" element={<Auth />} />
        </Routes>
    </Router> );
  
}

export default App;
