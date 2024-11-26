import { Helmet } from 'react-helmet-async';

import { DashboardContent } from '../layouts/dashboard';
import { Box, Typography, Button } from '@mui/material';

// ----------------------------------------------------------------------

export default function HomePage() {
    return (
        <>
            <Helmet>
                <title>{`Home | Trang quản trị website bán vé xem phim NHTT`}</title>
            </Helmet>

            <DashboardContent>
                <Box sx={{ padding: 4, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Chào mừng bạn đến với Bảng điều khiển!
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 3 }}>
                        Tại đây bạn có thể quản lý và xem các phân tích và thống kê về dữ liệu.
                    </Typography>
                    <Button variant="outlined" color="primary" href="/admin">
                        Bắt đầu ngay
                    </Button>
                </Box>
            </DashboardContent>
        </>
    );
}