import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { DashboardContent } from "../../../layouts/dashboard";

export function CreateMovieView() {
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
                    title={<Typography variant="h2">{'Mẫu tạo phim mới'}</Typography>}
                />
                <CardContent>
                    <p>Love you is losing game.</p>
                </CardContent>
            </Card>
        </DashboardContent>
    );
}