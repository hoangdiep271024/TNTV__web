import React from 'react'
import Shared from '../Shared'
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AreaList from '../showtime/AreaList';
export default function Lich_chieu() {
  return (
    <><Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Shared></Shared>
      <AreaList></AreaList>
      </Box>
    </>
  )
}
