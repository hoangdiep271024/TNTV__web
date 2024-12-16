import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { DashboardContent } from '../layouts/dashboard';
import { Box, Typography, Grid, Card, CardContent, CardHeader, Table, TableContainer, TableHead, TableRow, TableCell, Paper, TableBody } from '@mui/material';

export default function DashboardPage() {
    const [dashboardData, setDashboardData] = useState({
        order: 0,
        revenue: 0,
        newUser: 0,
        filmResult: []
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow',
                    // credentials: 'include'
                };

                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/dashboard`, requestOptions);
                const result = await response.json();

                setDashboardData(result);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <>
            <Helmet>
                <title>{`Tổng quan | Trang quản trị website bán vé xem phim NHTT`}</title>
            </Helmet>

            <DashboardContent>
                <Box>
                    <Typography variant="h2" gutterBottom>
                        Tổng quan quản trị
                    </Typography>

                    {/* Phần thẻ thống kê */}
                    <Grid container spacing={3}>

                        {/* Tổng đơn hàng */}
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardHeader title="Tổng Đơn Hàng" />
                                <CardContent>
                                    <Typography variant="h3">
                                        {dashboardData.order ? dashboardData.order : null}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Tổng số đơn hàng trong tháng này.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Tổng doanh thu */}
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardHeader title="Doanh Thu" />
                                <CardContent>
                                    <Typography variant="h3">
                                        {dashboardData.revenue ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dashboardData.revenue) : null}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Tổng doanh thu trong tháng này.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Số lượng người dùng mới */}
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardHeader title="Người Dùng Mới" />
                                <CardContent>
                                    <Typography variant="h3">
                                        {dashboardData.newUser ? dashboardData.user : null}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Tổng số người dùng mới trong tháng này.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Doanh thu theo phim */}
                    <Box sx={{ mt: 10 }}>

                        <Typography variant="h2" gutterBottom>
                            Doanh thu phim theo tháng
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="films table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Tên phim</TableCell>
                                                <TableCell align="center">Số vé đã bán</TableCell>
                                                <TableCell align="center">Doanh thu</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {dashboardData.filmResult.map((film) => (
                                                <TableRow key={film.film_id}>

                                                    <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                                                        {film.film_name}
                                                    </TableCell>

                                                    <TableCell
                                                        align="center"
                                                        sx={{ color: film.total_tickets_sold ? 'inherit' : 'red' }}
                                                    >
                                                        {film.total_tickets_sold}
                                                    </TableCell>

                                                    <TableCell
                                                        align="center"
                                                        sx={{ color: film.total_revenue ? 'inherit' : 'red' }}
                                                    >
                                                        {film.total_revenue
                                                            ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(film.total_revenue)
                                                            : 'Chưa có doanh thu'}
                                                    </TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
            </DashboardContent>
        </>
    );
}
