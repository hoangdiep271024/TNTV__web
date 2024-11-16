import { useTheme } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import Shared from "../Shared";
import Ticket__film from "../film/Ticket__film";
import Footer from "../Footer/Footer";



export default function Auth() {
  const [isTicketLoaded, setIsTicketLoaded] = useState(false);
  const handleTicketLoad = () => {
    setIsTicketLoaded(true);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Shared />
      <Ticket__film onLoadComplete={handleTicketLoad} />
      {isTicketLoaded && <Footer />}
    </Box>
  );
}

