import { Helmet } from 'react-helmet-async';

import { DashboardContent } from '../layouts/dashboard';
import { Box, Typography, Button } from '@mui/material';

// ----------------------------------------------------------------------

export default function HomePage() {
    return (
        <>
            <Helmet>
                <title>{`Home`}</title>
            </Helmet>

            {/* <DashboardContent>
                <Box sx={{ padding: 4, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Welcome to the Dashboard!
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 3 }}>
                        Here you can manage your data and view analytics.
                    </Typography>
                    <Button variant="contained" color="primary" href="/some-route">
                        Get Started
                    </Button>
                </Box>
            </DashboardContent> */}
        </>
    );
}