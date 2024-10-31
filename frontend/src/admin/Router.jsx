import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;