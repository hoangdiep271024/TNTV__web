import React, { useState } from "react";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

export default function AreaList() {
  const [areas, setAreas] = useState(null);
  const [areaClick, setAreaClick] = useState(1);
  const [cinemas, setCinemas] = useState(null);
  const theme = useTheme();
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/lichChieu/khuVuc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        if (result) {
          console.log(result);
          setAreas(result);
        } else {
          console.log(`Truy cập: ${result.message}`);
        }
      } else {
        console.error("Lỗi khi truy cập:", response.statusText);
      }
    } catch (error) {
      console.error("Lỗi mạng:", error);
    }
  };
  const fetchCinema = async () => {
    try {
      const response = await fetch(
        `/api/lichChieu/khuVuc/khuVuc_id=${areaClick}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        if (result) {
          console.log(result);
          setCinemas(result);
        } else {
          console.log(`Truy cập: ${result.message}`);
        }
      } else {
        console.error("Lỗi khi truy cập:", response.statusText);
      }
    } catch (error) {
      console.error("Lỗi mạng:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchCinema();
  }, [areaClick]);

  const AreaClick = (id) => {
    if (areas) {
      setAreaClick(id);
    }
  };
  return (
    <Box
      sx={{ display: "flex", gap: '30px', justifyContent: "center", alignItems: "start", marginTop: "17vh" }}
    >
      <Box >
        <div
          style={{
            color: "white",
            width: "300px",
            height: "30px",
            backgroundColor: "#2096F3",
            border: `1px solid ${
              theme.palette.mode === "dark" ? "#c7c4c3" : "#c7c4c3"
            }`,
            cursor: "pointer",
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            fontSize: "18px",
            borderRadius: "5px 5px 0 0",
          }}
        >
          Khu vực
        </div>
        {areas &&
          areas.map((area, key) => {
            return (
              <Box
                key={area.region_id}
                sx={{
                  width: "300px",
                  height: "30px",
                  paddingRight: "10px",
                  display: "flex",
                  backgroundColor:
                    area.region_id === areaClick
                      ? theme.palette.mode === "dark"
                        ? "#14b5f5"
                        : "#e9eef0"
                      : "transparent",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: `1px solid ${
                    theme.palette.mode === "dark" ? "#c7c4c3" : "#c7c4c3"
                  }`,
                  cursor: "pointer",
                  paddingLeft: "10px",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#14b5f5" : "#e9eef0",
                  },
                }}
                onClick={() => AreaClick(area.region_id)}
              >
                {area.region_name}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "22px",
                    fontSize: "12px",
                    height: "22px",
                    borderRadius: "100%",
                    backgroundColor: "#42bdff",
                    color: "white",
                  }}
                >
                  {area["count(*)"]}
                </Box>
              </Box>
            );
          })}
      </Box>
      <Box>
      { cinemas && (
    Object.keys(cinemas).map((cinemaKey, key) => {
      return (
        <>
        <Box key={cinemaKey} sx={{
          width: '300px',
          height: '35px',
          paddingRight: '10px',
          display: 'flex',
          justifyContent: 'start',
          gap: '10px',
          alignItems: 'center',
          border: `1px solid ${theme.palette.mode === 'dark' ? '#c7c4c3' : '#c7c4c3'}`,
          paddingLeft: '10px',
          backgroundColor:
          theme.palette.mode === "dark" ? "#2096F3" : "#EDF2F9",

        }}>
          {cinemaKey === 'Beta Cinemas' && (
            <img src="/beta.jpg" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey === 'CGV Cinemas' && (
            <img src="/cgv.jpg" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey === 'Lotte Cinemas' && (
            <img src="/lotte.png" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey === 'Cinestar' && (
            <img src="/cinestar.png" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey === 'Mega GS Cinemas' && (
            <img src="/mega.png" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey === 'Dcine' && (
            <img src="/dcine.png" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey === 'Starlight' && (
            <img src="/starlight.jpeg" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey === 'Rio Cinemas' && (
            <img src="/riocinema.png" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey === 'Touch Cinema' && (
            <img src="/touch.jpeg" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey === 'Cinemax' && (
            <img src="/beta.jpg" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
            {cinemaKey === 'Đống Đa Cinema' && (
            <img src="/dongda.png" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey}</Box>

          {cinemas[cinemaKey].map((cineItem, key) => (
            <Box key ={cineItem.cinema_id} sx={{ width: '300px',
            height: '30px',
            paddingRight: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: `1px solid ${theme.palette.mode === 'dark' ? '#c7c4c3' : '#c7c4c3'}`,
            cursor: 'pointer',
            paddingLeft: '10px',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? '#14b5f5' : '#e9eef0',
            }}}>
              {cineItem.cinema_name ? cineItem.cinema_name : cineItem} 
            </Box>
          ))}
      </>
      )
    })
)}
      </Box>
    </Box>
  );
}
