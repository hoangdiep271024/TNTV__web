import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from './app';
import './global.css';

createRoot(document.getElementById("admin-root")).render(
    <StrictMode>
        <AppRouter />
    </StrictMode>
);
