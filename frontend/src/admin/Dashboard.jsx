import * as React from 'react';

import { alpha, Experimental_CssVarsProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import AppTheme from '../theme/AppTheme';

export default function Dashboard(props) {
    return (
        <AppTheme {...props} >
            <Experimental_CssVarsProvider>
                <CssBaseline enableColorScheme />
                <Box sx={{ display: 'flex' }}>
                    <SideMenu />
                    <AppNavbar />
                    {/* Main content */}
                    <Box
                        component="main"
                        sx={(theme) => ({
                            flexGrow: 1,
                            backgroundColor: theme.vars
                                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                                : alpha(theme.palette.background.default, 1),
                            overflow: 'auto',
                        })}
                    >
                        <Header />
                    </Box>
                </Box>
            </Experimental_CssVarsProvider>
        </AppTheme>
    );
}