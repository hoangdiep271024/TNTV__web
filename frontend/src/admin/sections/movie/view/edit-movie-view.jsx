import { useState, useEffect } from "react";
import { DashboardContent } from "../../../layouts/dashboard";
import { Card, CardContent, CardHeader, Typography, Box, Button, Stack, TextField, Snackbar, Alert, MenuItem } from "@mui/material";

export function EditMovieView({ movieId }) {
    const [formData, setFormData] = useState({
        film_name: "",
        film_img: "",
        film_trailer: "",
        Release_date: "",
        film_describe: "",
        age_limit: "",
        duration: "",
        film_type: "1",
        categories: "",
        directors: "",
        actors: "",
    });

    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const filmTypeOptions = [
        { value: "1", label: "Đang chiếu" },
        { value: "0", label: "Sắp chiếu" },
    ];

    const handleSnackbarClose = () => setSnackbar((prev) => ({ ...prev, open: false }));

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8888/api/admin/films/detail/${movieId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch movie details");
                }
                const data = await response.json();

                const filmImages = Array.isArray(data.film[0]?.film_img)
                    ? data.film[0].film_img
                    : [data.film[0]?.film_img || ""];

                const formattedDate = data.film[0]?.Release_date
                    ? new Date(data.film[0].Release_date).toISOString().split("T")[0]
                    : "";

                setFormData({
                    film_name: data.film[0]?.film_name || "",
                    film_img: filmImages.join(", "), // Convert array to comma-separated string
                    film_trailer: data.film[0]?.film_trailer || "",
                    Release_date: formattedDate,
                    film_describe: data.film[0]?.film_describe || "",
                    age_limit: data.film[0]?.age_limit || "",
                    duration: data.film[0]?.duration || "",
                    film_type: data.film[0]?.film_type.toString() || "1",
                    categories: data.categories?.map((cat) => cat.category_name).join(", ") || "",
                    directors: data.directors?.map((dir) => dir.director_name).join(", ") || "",
                    actors: data.actors?.map((actor) => actor.actor_name).join(", ") || "",
                });

                setLoading(false);
            } catch (error) {
                console.error(error);
                setSnackbar({ open: true, message: "Lỗi khi tải thông tin phim", severity: "error" });

                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            ...formData,
            film_img: formData.film_img.split(",").map((url) => url.trim()),
            categories: formData.categories.split(",").map((category) => category.trim()),
            directors: formData.directors.split(",").map((director) => director.trim()),
            actors: formData.actors.split(",").map((actor) => actor.trim()),
        };

        try {
            const response = await fetch(`http://localhost:8888/api/admin/films/edit/${movieId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to update movie");
            }

            const result = await response.json();
            // console.log(result);
            setSnackbar({ open: true, message: "Phim đã được cập nhật thành công!", severity: "success" });
        } catch (error) {
            // console.error(error);
            setSnackbar({ open: true, message: "Có lỗi xảy ra khi cập nhật phim!", severity: "error" });
        }
    };

    return (
        <DashboardContent>
            <Card>
                <CardHeader
                    title={<Typography variant="h2">{'Chỉnh sửa thông tin phim'}</Typography>}
                />
                <CardContent>
                    {loading ? (
                        <Typography variant="body1">Đang tải thông tin phim...</Typography>
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
                                    name="film_img"
                                    label="URL hình ảnh (cách nhau bởi dấu phẩy)"
                                    value={formData.film_img}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="film_trailer"
                                    label="URL trailer"
                                    value={formData.film_trailer}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="Release_date"
                                    label="Ngày phát hành"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={formData.Release_date}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="film_describe"
                                    label="Mô tả"
                                    value={formData.film_describe}
                                    onChange={handleInputChange}
                                    multiline
                                    rows={4}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="age_limit"
                                    label="Giới hạn độ tuổi"
                                    type="number"
                                    value={formData.age_limit}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="duration"
                                    label="Thời lượng (phút)"
                                    type="number"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="film_type"
                                    label="Trạng thái phim"
                                    select
                                    value={formData.film_type}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                >
                                    {filmTypeOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    name="categories"
                                    label="Thể loại (cách nhau bởi dấu phẩy)"
                                    value={formData.categories}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                                <TextField
                                    name="directors"
                                    label="Đạo diễn (cách nhau bởi dấu phẩy)"
                                    value={formData.directors}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                                <TextField
                                    name="actors"
                                    label="Diễn viên (cách nhau bởi dấu phẩy)"
                                    value={formData.actors}
                                    onChange={handleInputChange}
                                    fullWidth
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

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </DashboardContent>
    );
}