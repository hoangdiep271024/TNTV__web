import { useState, useEffect } from "react";
import { DashboardContent } from "../../../layouts/dashboard";
import { Card, CardContent, CardHeader, Typography, Box, Button, Stack, TextField, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function EditCinemaView({ cinemaId }) {
    const [formData, setFormData] = useState({
        cinema_name: "",
        address: "",
        cluster_name: "",
        region_name: "",
    });

    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const navigate = useNavigate();
    const handleSnackbarClose = () => setSnackbar((prev) => ({ ...prev, open: false }));

    useEffect(() => {
        const fetchCinemaDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/cinemas/detail/${cinemaId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch cinema details");
                }
                const data = await response.json();
                // console.log(data);

                const cinema = data.cinema[0] || {};
                const cluster = data.clusters[0] || {};
                const region = data.regions[0] || {};

                setFormData({
                    cinema_name: cinema.cinema_name || "",
                    address: cinema.address || "",
                    cluster_name: cluster.cluster_name || "",
                    region_name: region.region_name || "",
                });

                setLoading(false);
            } catch (error) {
                console.error(error);
                setSnackbar({ open: true, message: "Lỗi khi tải thông tin rạp", severity: "error" });
                setLoading(false);
            }
        };

        fetchCinemaDetails();
    }, [cinemaId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/cinemas/edit/${cinemaId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to update cinema");
            }

            const result = await response.json();
            // console.log(result);
            setSnackbar({ open: true, message: "Rạp chiếu phim đã được cập nhật thành công!", severity: "success" });

            setTimeout(() => navigate(-1), 1000);
        } catch (error) {
            // console.error(error);
            setSnackbar({ open: true, message: "Có lỗi xảy ra khi cập nhật rạp!", severity: "error" });
        }
    };

    return (
        <DashboardContent>
            <Card>
                <CardHeader
                    title={<Typography variant="h2">{'Chỉnh sửa thông tin rạp'}</Typography>}
                />
                <CardContent>
                    {loading ? (
                        <Typography variant="body1">Đang tải thông tin rạp...</Typography>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                <TextField
                                    name="cinema_name"
                                    label="Tên rạp"
                                    value={formData.cinema_name}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="address"
                                    label="Địa chỉ"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="cluster_name"
                                    label="Tên cụm"
                                    value={formData.cluster_name}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="region_name"
                                    label="Tên khu vực"
                                    value={formData.region_name}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                            </Stack>

                            <Box mt={3} display="flex" justifyContent="flex-end">
                                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                                    Cập nhật
                                </Button>
                            </Box>
                        </form>
                    )}
                </CardContent>
            </Card>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </DashboardContent>
    );
}
