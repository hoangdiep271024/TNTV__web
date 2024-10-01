
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Routes, Route } from "react-router-dom";
import Navbar from "./scenes/global/Navbar";
import SideBar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Navbar />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;