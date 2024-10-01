import { ColorModeContext, tokens } from "../../theme";
import { useContext } from "react";
import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined, NotificationsOutlined, PersonOutlined, SearchOutlined, SettingsOutlined } from "@mui/icons-material";

const Navbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);


    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box display="flex" alignItems="center" bgcolor={colors.primary[400]} borderRadius="3px">
                <InputBase placeholder="Search" sx={{ ml: 2, flex: 1 }} />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchOutlined />
                </IconButton>
            </Box>

            {/** ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ?
                        (
                            <DarkModeOutlined />
                        ) : (
                            <LightModeOutlined />
                        )}
                </IconButton>
                <IconButton>
                    <NotificationsOutlined />
                </IconButton>
                <IconButton>
                    <SettingsOutlined />
                </IconButton>
                <IconButton>
                    <PersonOutlined />
                </IconButton>

            </Box>
        </Box>
    );
};

export default Navbar;