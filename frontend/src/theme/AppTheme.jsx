import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme } from "@mui/material";
import { colorSchemes, typography, shadows, shape } from './themePrimitives';
import { ThemeProvider } from 'styled-components';


function AppTheme({ children, disableCustomTheme, themeComponents }) {
    const theme = React.useMemo(() => {
        return disableCustomTheme
            ? {}
            : createTheme({
                cssVariables: {
                    colorSchemeSelector: 'data-mui-color-scheme',
                    cssVarPrefix: '',
                },
                colorSchemes,
                typography,
                shadows,
                shape,
                components: {

                },
            });
    }, [disableCustomTheme, themeComponents]);
    if (disableCustomTheme) {
        return <React.Fragment>{children}</React.Fragment>;
    }
    return (
        <ThemeProvider theme={theme} disableTransitionOnChange>
            {children}
        </ThemeProvider>
    );
}

AppTheme.propTypes = {
    children: PropTypes.node,
    disableCustomTheme: PropTypes.bool,
    themeComponents: PropTypes.object,
};

export default AppTheme;