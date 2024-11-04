import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { shadows, typography, components, colorSchemes } from './core';

// ----------------------------------------------------------------------

export function createTheme() {
    const initialTheme = {
        colorSchemes,
        shadows: shadows(),
        shape: { borderRadius: 8 },
        components,
        typography,
        cssVarPrefix: ''
    };

    const theme = extendTheme(initialTheme);
    return theme;
}

// ----------------------------------------------------------------------

