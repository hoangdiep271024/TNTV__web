import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardContent } from "../../../layouts/dashboard";
import { Card, CardContent, CardHeader, Typography, Stack, TextField, Box, Button, Snackbar, Alert, CircularProgress } from "@mui/material";

export function EditShowtimeView({ showtimeId }) {
    const [formData, setFormData] = useState({
        film_name: "",
        room_name: "",
        cinema_name: "",
        show_date: "",
        show_time: "",
    });

    const [originalData, setOriginalData] = useState(null);

    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const navigate = useNavigate();
    const handleSnackbarClose = () => setSnackbar((prev) => ({ ...prev, open: false }));

    useEffect(() => {
        const fetchShowtimeDetails = async () => {
            try {
                const jwt = localStorage.getItem('jwt');

                if (!jwt) {
                    console.error('JWT token is missing');
                    return;
                }

                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/showtimes/detail/${showtimeId}`, {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + jwt,
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch showtime details");
                }
                const data = await response.json();
                console.log(data);

                const showDate = data.showTime[0]?.show_date || "";
                const formattedShowDate = showDate ? new Date(showDate).toLocaleDateString("en-CA") : "";

                const initialData = {
                    film_name: data.film[0]?.film_name || "",
                    room_name: data.room[0]?.room_name || "",
                    cinema_name: data.cinema[0]?.cinema_name || "",
                    show_date: formattedShowDate,
                    show_time: data.showTime[0]?.show_time || "",
                };

                setFormData(initialData);
                setOriginalData(initialData);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setSnackbar({ open: true, message: "Lỗi khi tải thông tin suất chiếu", severity: "error" });
            }
        };

        fetchShowtimeDetails();
    }, [showtimeId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const jwt = localStorage.getItem('jwt');

            if (!jwt) {
                console.error('JWT token is missing');
                return;
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/showtimes/edit/${showtimeId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + jwt,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to update showtime");
            }

            const result = await response.json();
            console.log(result);

            setSnackbar({ open: true, message: "Suất chiếu phim đã được cập nhật thành công!", severity: "success" });
            setTimeout(() => navigate("/admin/showtime"), 1000);;
        } catch (error) {
            console.error(error);
            setSnackbar({ open: true, message: "Có lỗi xảy ra khi cập nhật suất chiếu!", severity: "error" });

            setFormData(originalData);
        }
    };

    return (
        <DashboardContent>
            <Card>
                <CardHeader title={<Typography variant="h2">{'Chỉnh sửa thông tin suất chiếu phim'}</Typography>} />
                <CardContent>
                    {loading ? (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="300px"
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
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
                                    label="Tên phòng chiếu"
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
                                    value={formData.show_date}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    name="show_time"
                                    label="Giờ chiếu"
                                    type="time"
                                    value={formData.show_time}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Stack>

                            <Box mt={3} display="flex" justifyContent="flex-end">
                                <Button type="submit" variant="contained" color="primary">
                                    Cập nhật
                                </Button>
                            </Box>
                        </form>
                    )}
                </CardContent>
            </Card>

            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </DashboardContent>
    );
}
