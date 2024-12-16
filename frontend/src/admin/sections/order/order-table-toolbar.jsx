import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Iconify } from '../../components/iconify';
import { Box, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

function FilterIconMenu({ selectedFilter, onFilterChange, filterOptions }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleSelect = (value) => {
        onFilterChange(value);
        handleClose();
    }

    return (
        <>
            <Tooltip title="Bộ lọc">
                <IconButton onClick={handleOpen}>
                    <Iconify icon="solar:filter-bold" />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {filterOptions.map((option) => (
                    <MenuItem
                        key={option.value}
                        selected={selectedFilter === option.value}
                        onClick={() => handleSelect(option.value)}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export function OrderTableToolbar({ numSelected, filterName, onFilterName, selectedFilter, onFilterChange, onDeleteSelected }) {
    const filterOptions = [
        { value: 'username', label: 'Tên người dùng' },
        { value: 'film_name', label: 'Tên phim' },
    ]

    return (
        <Toolbar
            sx={{
                height: 96,
                display: 'flex',
                justifyContent: 'space-between',
                p: (theme) => theme.spacing(0, 1, 0, 3),
                ...(numSelected > 0 && {
                    color: 'primary.main',
                    bgcolor: 'primary.lighter',
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography component="div" variant="subtitle1">
                    {numSelected} đã chọn
                </Typography>
            ) : (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>

                    <OutlinedInput
                        fullWidth
                        value={filterName}
                        onChange={onFilterName}
                        placeholder="Tìm kiếm..."
                        startAdornment={
                            <InputAdornment position="start">
                                <Iconify icon="solar:card-search-bold" />
                            </InputAdornment>
                        }
                    />

                    <FilterIconMenu
                        selectedFilter={selectedFilter}
                        onFilterChange={onFilterChange}
                        filterOptions={filterOptions}
                    />
                </Box>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Xóa">
                    <IconButton
                        onClick={onDeleteSelected}
                        sx={{
                            color: 'error.main',
                            '&:hover': { backgroundColor: 'action.hover' },
                        }}
                    >
                        <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                </Tooltip>
            ) : null}
        </Toolbar>
    );
}
