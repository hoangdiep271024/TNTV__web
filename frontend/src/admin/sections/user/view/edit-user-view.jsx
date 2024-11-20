import { useState } from "react";
import { DashboardContent } from "../../../layouts/dashboard";
import { Card, Grid, Button, CardHeader, CardContent, TextField, MenuItem } from "@mui/material";

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
    const statusOptions = ["active", "banned"];

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

    const handleCancel = () => {
        setFormData({
            username: "",
            email: "",
            avatar: "",
            phoneNumber: "",
            role: "user",
            status: "active",
        });

        alert("Changes were not saved.");
        window.location.reload();
    }

    return (
        <DashboardContent>
            <Card>
                <CardHeader title="Edit User Details" />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>

                            {/* Username */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Username"
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
                                    label="Avatar URL"
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
                                    label="Phone Number"
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
                                    label="Role"
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
                                    label="Status"
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
                                    Save
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="error" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </DashboardContent>
    )
}