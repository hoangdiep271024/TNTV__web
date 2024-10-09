import { createContext, useState } from 'react';
import { ColorModeContext, useMode } from '../theme/AppTheme';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Navbar from '../scenes/layout/Navbar';
import SideBar from '../scenes/layout/Sidebar';
import { Outlet } from 'react-router-dom';

export const ToggledContext = createContext(null);

function AdminPanel() {
    const [theme, colorMode] = useMode();
    const [toggled, setToggled] = useState(false);
    const values = { toggled, setToggled };

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ToggledContext.Provider value={values}>
                    <Box sx={{ display: "flex", height: "100", maxWidth: "100%" }}>
                        <SideBar />
                        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", height: "100%", maxWidth: "100%" }}>
                            <Navbar />
                            <Box sx={{ overflowY: "auto", flex: 1, maxWidth: "100%" }}>
                                <Outlet />
                            </Box>
                        </Box>
                    </Box>
                </ToggledContext.Provider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
};

export default AdminPanel;
