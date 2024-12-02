import { Helmet } from 'react-helmet-async';
import { DashboardContent } from '../layouts/dashboard';
import { Box, Typography, Button } from '@mui/material';

// ----------------------------------------------------------------------
export default function HomePage() {
    return (
        <>
            <Helmet>
                <title>{`Trang chủ | Trang quản trị website bán vé xem phim NHTT`}</title>
            </Helmet>

            <DashboardContent>
                <Box sx={{ padding: 4, textAlign: 'center' }}>
                    <Typography variant="h2" gutterBottom>
                        Chào mừng bạn đến với bảng điều khiển!
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 3 }}>
                        Tại đây bạn có thể quản lý và xem các phân tích và thống kê về dữ liệu của trang web.
                    </Typography>
                    <Button variant="outlined" color="primary" href="/admin/dashboard">
                        Bắt đầu ngay
                    </Button>
                </Box>
            </DashboardContent>
        </>
    );
}