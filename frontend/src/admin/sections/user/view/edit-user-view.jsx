import { useState, useEffect } from "react";
import { DashboardContent } from "../../../layouts/dashboard";
import { Card, Typography, Grid, Button, CardHeader, CardContent, TextField, MenuItem, Snackbar, Alert, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function EditUserView({ userId }) {
    const [formData, setFormData] = useState({
        username: "",
        user_img: "",
        email: "",
        phone_number: "",
        role: 0,
        status: 0,
    });

    const roleOptions = [
        { label: "Người dùng", value: 0 },
        { label: "Quản trị viên", value: 1 },
    ];
    const statusOptions = [
        { label: "Đang hoạt động", value: 1 },
        { label: "Không hoạt động", value: 0 },
    ];

    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const navigate = useNavigate();
    const handleSnackbarClose = () => setSnackbar((prev) => ({ ...prev, open: false }));

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8888/api/admin/users/detail/${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user details");
                }
                const data = await response.json();
                // console.log(data);
                // {"user":[{"user_id":2,"username":"nhdiep123","password":"$2a$11$2Mk7v/irDoraeg.tgA4z6O4iVU/rkTbZ1Z9WmXVD/TEw9Jxr.y6eu",
                // "user_img":null,"email":"nguyenhoangdiep2710@gmail.com","phone_number":"0971234568","full_name":"Nguyen Hoang Diep","sex":1,
                // "date_of_birth":"2004-10-26T17:00:00.000Z","role":0,"reset_token":null,"reset_token_expire":null,"date":null,"status":1}],
                // "order":[]}

                const user = data.user[0] || {};

                setFormData({
                    username: user.username || "",
                    user_img: user.user_img || "",
                    email: user.email || "",
                    phone_number: user.phone_number || "",
                    role: user.role || 0,
                    status: user.status || 0,
                });

                setLoading(false);
            } catch (error) {
                console.error(error);
                setSnackbar({ open: true, message: "Lỗi khi tải thông tin người dùng", severity: "error" });
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8888/api/admin/users/edit/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to update user");
            }

            const result = await response.json();
            // console.log(result);
            setSnackbar({ open: true, message: "Thông tin người dùng đã được cập nhật thành công!", severity: "success" });

            setTimeout(() => navigate(-1), 1000);
        } catch (error) {
            // console.error(error);
            setSnackbar({ open: true, message: "Có lỗi xảy ra khi cập nhật thông tin người dùng!", severity: "error" });
        }
    };

    return (
        <DashboardContent>
            <Card>
                <CardHeader title="Chỉnh sửa thông tin người dùng" />
                <CardContent>
                    {loading ? (
                        <Typography variant="body1">Đang tải thông tin người dùng...</Typography>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Tên người dùng"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Ảnh đại diện"
                                        name="user_img"
                                        value={formData.user_img}
                                        onChange={handleInputChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Số điện thoại"
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Vai trò"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                    >
                                        {roleOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Trạng thái"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                    >
                                        {statusOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>

                            <Box mt={3} display="flex" justifyContent="flex-end">
                                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                                    {loading ? "Đang cập nhật..." : "Cập nhật"}
                                </Button>
                            </Box>

                        </form>
                    )}
                </CardContent>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Card>
        </DashboardContent>
    )
}