import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import { RouterLink } from '../../routes/components';
import { Main, CompactContent } from './main';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';

import { Typography } from '@mui/material';
// ----------------------------------------------------------------------

export function SimpleLayout({ sx, children, header, content }) {
    const layoutQuery = 'md';

    return (
        <LayoutSection
            /** **************************************
             * Header
             *************************************** */
            headerSection={
                <HeaderSection
                    layoutQuery={layoutQuery}
                    slotProps={{ container: { maxWidth: false } }}
                    sx={header?.sx}
                    slots={{
                        topArea: (
                            <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                                This is an info Alert.
                            </Alert>
                        ),
                        leftArea: (
                            <Typography variant="h6" component={RouterLink} to="/admin" sx={{ textDecoration: 'none', color: 'inherit' }}>
                                Admin
                            </Typography>
                        ),
                        rightArea: (
                            <Link
                                href="#"
                                component={RouterLink}
                                color="inherit"
                                sx={{ typography: 'subtitle2' }}
                            >
                                Need help?
                            </Link>
                        ),
                    }}
                />
            }
            /** **************************************
             * Footer
             *************************************** */
            footerSection={null}
            /** **************************************
             * Style
             *************************************** */
            cssVars={{
                '--layout-simple-content-compact-width': '448px',
            }}
            sx={sx}
        >
            <Main>
                {content?.compact ? (
                    <CompactContent layoutQuery={layoutQuery}>{children}</CompactContent>
                ) : (
                    children
                )}
            </Main>
        </LayoutSection>
    );
}
