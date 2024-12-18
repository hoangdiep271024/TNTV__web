import { Card, CardHeader, CardContent, Typography, Stack, TextField, Snackbar, Alert, Box, Button } from "@mui/material";
import { DashboardContent } from "../../../layouts/dashboard";
import { useState } from "react";

export function CreateCinemaView() {
    const [formData, setFormData] = useState({
        cinema_name: "",
        cluster_name: "",
        region_name: "",
        address: "",
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const handleSnackbarClose = () => setSnackbar((prev) => ({ ...prev, open: false }));

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/cinemas/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to create cinema");
            }

            const result = await response.json();
            // console.log(result);

            setFormData({
                cinema_name: "",
                address: "",
                cluster_name: "",
                region_name: "",
            });

            setSnackbar({ open: true, message: "Rạp chiếu phim đã được tạo thành công!", severity: "success" });
        } catch (error) {
            // console.error(error);
            setSnackbar({ open: true, message: "Có lỗi xảy ra khi tạo rạp chiếu phim!", severity: "error" });
        }
    };

    return (
        <DashboardContent>
            <Card>
                <CardHeader
                    title={<Typography variant="h2">{'Mẫu tạo rạp chiếu phim mới'}</Typography>}
                />
                <CardContent>
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
                                label="Tên cụm rạp"
                                value={formData.cluster_name}
                                onChange={handleInputChange}
                                required
                                fullWidth
                            />
                            <TextField
                                name="region_name"
                                label="Khu vực"
                                value={formData.region_name}
                                onChange={handleInputChange}
                                required
                                fullWidth
                            />
                        </Stack>

                        <Box mt={3} display="flex" justifyContent="flex-end">
                            <Button type="submit" variant="contained" color="primary">
                                Tạo rạp chiếu
                            </Button>
                        </Box>
                    </form>
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
