import { useState } from "react";
import { DashboardContent } from "../../../layouts/dashboard";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export function EditShowtimeView({ showtimeId }) {
    return (
        <DashboardContent>
            <Card>
                <CardHeader
                    title={<Typography variant="h2">{'Chỉnh sửa thông tin suất chiếu phim'}</Typography>}
                />
                <CardContent>
                    <p>Love you is losing game.</p>
                </CardContent>
            </Card>
        </DashboardContent>
    );
}