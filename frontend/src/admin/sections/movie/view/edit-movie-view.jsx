import { useState } from "react";
import { DashboardContent } from "../../../layouts/dashboard";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export function EditMovieView({ movieId }) {
    // const [formData, setformData] = useState({
    //     name: "",
    //     img: "",
    //     trailer: "",
    //     description: "",
    //     release_date: "",
    //     age_limit: "",
    //     duration: "",
    //     film_type: "Đang chiếu",
    //     country: "",
    //     categories: "",
    //     directors: "",
    //     actors: "",
    // })
    // const [snackbarOpen, setSnackbarOpen] = useState(false);
    // const filmTypeOptions = ["Đang chiếu", "Sắp phát hành"];

    // const handleSnackbarClose = () => {
    //     setSnackbarOpen(false);
    // };

    return (
        <DashboardContent>
            <Card>
                <CardHeader
                    title={<Typography variant="h2">{'Chỉnh sửa thông tin phim'}</Typography>}
                />
                <CardContent>
                    <p>KKKKKKKKKKKKKKKKKKKKKKKKKKK.</p>
                </CardContent>
            </Card>
        </DashboardContent>
    );
}