import { useTheme } from "@emotion/react";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React from "react";
import ChangeMode from "../ChangeMode";
import { useState, useEffect } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Header = ({ onLoginClick, onSignupClick, onProfileClick }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
    onProfileClick();
  };
  const theme = useTheme();
  const [login, setLogin] = useState('');
  const [userInfor, setUserInfor] = useState([]);

  useEffect(() => {
    fetch('/api/userInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.success) {
          setLogin(true)
          setUserInfor(responseData.userInfo[0])
        }
        else {
          setLogin(false)
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);
  const logOutClick = async (e) => {
    try {
      const response = await fetch('/api/logOut', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

      });

      if (response.ok) {
        // Xử lý thành công
        const data = await response.json();

        // Kiểm tra success
        if (data.success) {
          window.location.reload();
        } else {
          const error__alert = `Đăng ký thất bại:, ${data.message}`;
          console.log(error__alert);

          // <Alert severity="error" style={{top:'0', left: '0', zIndex: '20', width:'25vh', height:'30px'}}>{error__alert}</Alert>
        }
      } else {

        console.error('Lỗi khi đăng ký:', response.statusText);
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div
      style={{
        height: "70px",
        width: "100vw",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          marginLeft: "5px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <LiveTvIcon />
        <Typography
          variant="span"
          style={{ marginTop: "4px", fontSize: "20px" }}
        >
          TNTV Movie Tickets
        </Typography>
      </Box>


      <Box sx={{ alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Search Button */}
          <TextField
            id="outlined-search"
            label="Search..."
            type="search"
            InputLabelProps={{
              style: {
                fontFamily: "Arial",
                fontSize: "14px",
                textAlign: "center",
                top: "-6.5px",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ cursor: "pointer" }} />
                </InputAdornment>
              ),
              sx: {
                height: '40px',
              },
            }}
            sx={{
              width: '230px',
              '& .MuiOutlinedInput-root': {
                height: '40px',
              },
              '& .MuiInputBase-input': {
                padding: '10px',
              },
            }}
          />

          {/* Register Button */}
          {!login && (<Button
            sx={{
              textTransform: "none",
              color: theme.palette.mode === "light" ? "black" : "white",
              border: `1px solid ${theme.palette.mode === "light" ? "black" : "white"
                }`,
              width: '100px',
              height: '37px'
            }}
            onClick={onSignupClick}
          >
            Đăng ký
          </Button>)}

          {/* Login Button */}
          {!login && (<Button
            sx={{
              textTransform: "none",
              color: theme.palette.mode === "light" ? "black" : "white",
              backgroundColor:
                theme.palette.mode === "light" ? "#a0ba50" : "#0184FA",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "light" ? "grey" : "#005bb5", // Màu nền khi hover
              },
              width: '100px'
            }}
            onClick={onLoginClick}
          >
            Đăng nhập
          </Button>)}

          {/* Account Button */}
          {login && (
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ textTransform: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', width: 'auto', whiteSpace: 'nowrap', color: theme.palette.mode === "light" ? "black" : "white" }}
              ><AccountCircleIcon style={{ width: '40px', height: '40px' }} />
                {userInfor.full_name}
              </Button>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleCloseProfile}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
            // <div style={{cursor: 'pointer',marginLeft: '15px',display:'flex', alignItems: 'center', justifyContent:'center', gap :'5px', width:'auto', whiteSpace: 'nowrap', fontSize: '17px'}}>
            // <AccountCircleIcon style={{width: '40px', height: '40px'}}/>
            // <div>{userInfor.full_name}</div>
            // </div>
          )}

          {/* Change Mode Button */}
          <ChangeMode />

          {/* Logout Button */}
          {login && (
            <Button
              sx={{
                marginRight: '15px',
                textTransform: "none",
                color: theme.palette.mode === "light" ? "black" : "white",
                border: `1px solid ${theme.palette.mode === "light" ? "black" : "white"
                  }`,
                width: '100px',
                height: '37px'
              }}

              onClick={logOutClick}
            >
              Đăng xuất
            </Button>
          )}

        </Box>
      </Box>
    </div>
  );
};

export default Header;
