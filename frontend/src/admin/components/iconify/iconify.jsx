import { forwardRef } from 'react';
import { Icon, disableCache } from '@iconify/react';

import Box from '@mui/material/Box';

import { iconifyClasses } from './classes';

export const Iconify = forwardRef(function Iconify(
    { className, width = 20, sx, ...other },
    ref
) {
    return (
        <Box
            ssr
            ref={ref}
            component={Icon}
            className={`${iconifyClasses.root}${className ? ` ${className}` : ''}`}
            sx={{
                width,
                height: width,
                flexShrink: 0,
                display: 'inline-flex',
                ...sx,
            }}
            {...other}
        />
    );
})

// https://iconify.design/docs/iconify-icon/disable-cache.html
disableCache('local');
