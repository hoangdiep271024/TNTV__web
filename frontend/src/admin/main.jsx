import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from './Router';
import './index.css';

createRoot(document.getElementById("admin-root")).render(
    <StrictMode>
        <AppRouter />
    </StrictMode>
);
