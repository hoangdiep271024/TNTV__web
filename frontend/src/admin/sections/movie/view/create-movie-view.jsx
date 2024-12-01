import { Card, CardHeader, CardContent } from "@mui/material";
import { DashboardContent } from "../../../layouts/dashboard";

export function CreateMovieView() {
    const [formData, setformData] = useState({
        name: "",
        img: "",
        trailer: "",
        description: "",
        release_date: "",
        age_limit: "",
        duration: "",
        film_type: "Đang chiếu",
        country: "",
        categories: "",
        directors: "",
        actors: "",
    })
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const filmTypeOptions = ["Đang chiếu", "Sắp phát hành"];

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <DashboardContent>
            <Card>
                <CardHeader title="Tạo phim mới" />
                <CardContent>

                </CardContent>
            </Card>
        </DashboardContent>
    );
}