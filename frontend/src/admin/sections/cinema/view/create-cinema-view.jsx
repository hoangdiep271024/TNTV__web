import { useState } from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { DashboardContent } from "../../../layouts/dashboard";

export function CreateCinemaView() {
    return (
        <DashboardContent>
            <Card>
                <CardHeader
                    title={<Typography variant="h2">{'Mẫu tạo rạp chiếu mới'}</Typography>}
                />
                <CardContent>
                    <p>Love you is losing game.</p>
                </CardContent>
            </Card>
        </DashboardContent>
    );
}