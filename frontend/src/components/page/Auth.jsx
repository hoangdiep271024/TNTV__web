import { useTheme } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import React from "react";
import Shared from "../Shared";
import Ticket__film from "../film/Ticket__film"
export default function Auth() {
  return (
    <><Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Shared></Shared>
      <Ticket__film></Ticket__film>
      </Box>
    </>
  );
}