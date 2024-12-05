import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Iconify } from '../../components/iconify';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

/**
 * MovieTableToolbar Component
 *
 * This component renders a toolbar for the movie table. It supports:
 * - Displaying the number of selected rows and providing an action (e.g., delete) for those rows.
 * - A search input field to filter the table rows by a name or keyword.
 * - A filter dropdown to select the property to search by (e.g., film name, director).
 *
 * @param {number} numSelected - The number of currently selected rows in the table.
 * @param {string} filterName - The current value of the search input field for filtering rows.
 * @param {string} selectedFilter - The selected filter property (e.g., 'film_name').
 * @param {Function} onFilterName - Callback function triggered when the search input value changes.
 *   It passes the updated filter string to the parent component.
 * @param {Function} onFilterChange - Callback function triggered when the filter property changes.
 *   It passes the updated filter property to the parent component.
 * @returns {JSX.Element} The rendered toolbar, displaying the selected row count or a search input field.
 */
export function MovieTableToolbar({ numSelected, filterName, selectedFilter, onFilterName, onFilterChange }) {
    const filterOptions = [
        { value: 'film_name', label: 'Tên phim' },
        { value: 'film_describe', label: 'Mô tả' },
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
                <Box sx={{ display: 'flex', alignItems: 'cneter' }}>
                    <FormControl sx={{ minWidth: 150, mr: 2 }}>
                        <InputLabel>Thuộc tính</InputLabel>
                        <Select
                            value={selectedFilter}
                            onChange={(e) => onFilterChange(e.target.value)}
                            label="Thuộc tính"
                            fullWidth
                        >
                            {filterOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <OutlinedInput
                        fullWidth
                        value={filterName}
                        onChange={onFilterName}
                        placeholder="Tìm kiếm..."
                        startAdornment={
                            <InputAdornment position="start">
                                <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                            </InputAdornment>
                        }
                        sx={{ maxWidth: 320 }}
                    />
                </Box>

            )}

            {numSelected > 0 ? (
                <Tooltip title="Xóa">
                    <IconButton>
                        <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                </Tooltip>
            ) : null}
            {/* delete all selected or filter list (optional) */}
        </Toolbar>
    );
}
