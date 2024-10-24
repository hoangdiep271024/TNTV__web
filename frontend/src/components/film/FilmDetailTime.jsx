import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilmDetailTime({ onAreaChange }) { 
  const [areas, setAreas] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedArea(selected); 
    onAreaChange(selected); 
  };

  return (
    <>
      {areas && (
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
          <InputLabel id="demo-select-small-label">Tỉnh/Thành phố</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={selectedArea || ''} 
            label="Tỉnh/Thành phố"
            onChange={handleChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 220, 
                  overflowY: 'auto',
                },
              },
            }}
          >
            {areas.map((area) => (
              <MenuItem key={area.region_id} value={area}>
                {area.region_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
}
