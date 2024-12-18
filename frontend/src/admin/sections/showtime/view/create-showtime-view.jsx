import { Card, CardHeader, CardContent, Typography, Stack, TextField, Snackbar, Alert, MenuItem, Box, Button } from "@mui/material";
import { DashboardContent } from "../../../layouts/dashboard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateShowtimeView() {
    const [formData, setFormData] = useState({
        film_name: "",
        room_name: "",
        cinema_name: "",
        show_date: "",
        show_time: "",
    });

    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const navigate = useNavigate();

    const handleSnackbarClose = () => setSnackbar((prev) => ({ ...prev, open: false }));

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            ...formData,
            show_date: formData.show_date,
            show_time: formData.show_time,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/showtimes/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to create showtime");
            }

            // const result = await response.json();
            // console.log(result);
            setSnackbar({ open: true, message: "Suất chiếu phim đã được tạo thành công!", severity: "success" });
            setTimeout(() => navigate("/admin/showtime"), 1000);
        } catch (error) {
            // console.error(error);
            setSnackbar({ open: true, message: "Có lỗi xảy ra khi tạo suất chiếu!", severity: "error" });
            setFormData({
                film_name: "",
                room_name: "",
                cinema_name: "",
                show_date: "",
                show_time: "",
            });
        }
    };

    return (
        <DashboardContent>
            <Card>
                <CardHeader
                    title={<Typography variant="h2">{'Mẫu tạo suất chiếu phim mới'}</Typography>}
                />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <TextField
                                name="film_name"
                                label="Tên phim"
                                value={formData.film_name}
                                onChange={handleInputChange}
                                required
                                fullWidth
                            />
                            <TextField
                                name="room_name"
                                label="Tên phòng"
                                value={formData.room_name}
                                onChange={handleInputChange}
                                required
                                fullWidth
                            />
                            <TextField
                                name="cinema_name"
                                label="Tên rạp"
                                value={formData.cinema_name}
                                onChange={handleInputChange}
                                required
                                fullWidth
                            />
                            <TextField
                                name="show_date"
                                label="Ngày chiếu"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={formData.show_date}
                                onChange={handleInputChange}
                                required
                                fullWidth
                            />
                            <TextField
                                name="show_time"
                                label="Giờ chiếu"
                                type="time"
                                InputLabelProps={{ shrink: true }}
                                value={formData.show_time}
                                onChange={handleInputChange}
                                required
                                fullWidth
                            />
                        </Stack>

                        <Box mt={3} display="flex" justifyContent="flex-end">
                            <Button type="submit" variant="contained" color="primary">
                                Tạo suất chiếu
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
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </DashboardContent>
    );
}
