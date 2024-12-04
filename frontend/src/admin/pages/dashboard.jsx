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
        // Make the API call when the component mounts
        const fetchDashboardData = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Cookie", "connect.sid=s%3AAQRgftz8SKc9BZRR8ptWRb_kEAmCUpfV.3XBDxz2rML0agq2zBPleNwUY9FYrlcCB8k%2FdvCuHr7E");

                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow',
                    credential: "includes"
                };

                const response = await fetch("http://localhost:8888/api/admin/dashboard", requestOptions);
                const result = await response.json();

                // Update state with the fetched data
                setDashboardData(result);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []); // Empty dependency array to run the effect only once when the component mounts

    return (
        <>
            <Helmet>
                <title>{`Tổng quan | Trang quản trị website bán vé xem phim NHTT`}</title>
            </Helmet>

            <DashboardContent>
                <Box sx={{ p: 3 }}>
                    <Typography variant="h2" gutterBottom>
                        Tổng quan quản trị
                    </Typography>

                    {/* Dashboard Cards Section */}
                    <Grid container spacing={3}>
                        {/* Total Orders Card */}
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardHeader title="Tổng Đơn Hàng" />
                                <CardContent>
                                    <Typography variant="h3" component="div">
                                        {dashboardData.order}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Tổng số đơn hàng trong tháng này.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Total Revenue Card */}
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardHeader title="Doanh Thu" />
                                <CardContent>
                                    <Typography variant="h3" component="div">
                                        {dashboardData.revenue} VND
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Tổng doanh thu trong tháng này.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* New Users Card */}
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardHeader title="Người Dùng Mới" />
                                <CardContent>
                                    <Typography variant="h3" component="div">
                                        {dashboardData.newUser}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Tổng số người dùng mới trong tháng này.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Film Ticket Revenue Results */}
                    <Box sx={{ mt: 10 }}>

                        <Typography variant="h2" gutterBottom>
                            Tổng vé và doanh thu theo phim
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
                                                    <TableCell align="center">{film.total_tickets_sold}</TableCell>
                                                    <TableCell align="center">
                                                        {film.total_revenue
                                                            ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(film.total_revenue)
                                                            : 'Chưa có doanh thu'}                                                    </TableCell>
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
