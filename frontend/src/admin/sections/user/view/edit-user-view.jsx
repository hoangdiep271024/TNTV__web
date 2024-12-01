import { useState } from "react";
import { DashboardContent } from "../../../layouts/dashboard";
import { Card, Grid, Button, CardHeader, CardContent, TextField, MenuItem, Snackbar, Alert } from "@mui/material";

export function EditUserView({ userId }) {

    const [formData, setFormData] = useState({
        username: "",
        avatar: "",
        email: "",
        phoneNumber: "",
        role: "user",
        status: "active"
    });

    const roleOptions = ["user", "admin"];
    const statusOptions = ["active", "inactive"];

    //     // Fetch user data based on userId
    //     useEffect(() => {
    //     if (userId) {
    //         // Fetch user data using userId (e.g., from an API or database)
    //         const fetchUserData = async () => {
    //             try {
    //                 const response = await fetch(`/api/users/${userId}`);
    //                 const data = await response.json();
    //                 setFormData({
    //                     username: data.username,
    //                     avatar: data.avatar,
    //                     email: data.email, 
    //                     phoneNumber: data.phoneNumber,
    //                     role: data.role,
    //                     status: data.status,
    //                 });
    //             } catch (error) {
    //                 console.error("Error fetching user data:", error);
    //             }
    //         };

    //         fetchUserData();
    //     }
    // }, [userId]); // Re-fetch when userId changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
    }

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleCancel = () => {
        setFormData({
            username: "",
            email: "",
            avatar: "",
            phoneNumber: "",
            role: "user",
            status: "active",
        });

        setSnackbarOpen(true);
        window.location.reload();
    }

    return (
        <DashboardContent>
            <Card>
                <CardHeader title="Chỉnh sửa thông tin người dùng" />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>

                            {/* Username */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Tên người dùng"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>

                            {/* Email */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>

                            {/* Avatar */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Ảnh đại diện"
                                    name="avatar"
                                    value={formData.avatar}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>

                            {/* Phone Number */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Số điện thoại"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>

                            {/* Role */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Vai trò"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    {roleOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* Status */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Trạng thái"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    {statusOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} mt={2}>
                            <Grid item>
                                <Button type="submit" variant="contained" color="primary">
                                    Lưu
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="error" onClick={handleCancel}>
                                    Hủy bỏ
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: "100%" }}>
                        Các thay đổi chưa được lưu
                    </Alert>
                </Snackbar>
            </Card>
        </DashboardContent>
    )
}