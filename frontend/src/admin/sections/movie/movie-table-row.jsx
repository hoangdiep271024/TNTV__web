import { Checkbox, IconButton, MenuItem, menuItemClasses, MenuList, Popover, Table, TableCell, TableRow, Typography } from "@mui/material";
import { useCallback, useState } from "react";

import { Iconify } from '../../components/iconify'

// edit button handle
// delete button handle
// click name to open movie details

export function MovieTableRow({ row, selected, onSelectRow }) {
    const [openPopover, setOpenPopover] = useState(null);
    const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

    const handleOpenPopover = useCallback((event) => {
        setOpenPopover(event.currentTarget);
    }, []);

    const handleClosePopover = useCallback(() => {
        setOpenPopover(null);
    }, []);

    const toggleDescription = () => {
        setDescriptionExpanded((prev) => !prev);
    };

    const truncateText = (text, length) => {
        if (text.length > length) {
            return `${text.substring(0, length)}...`;
        }
        return text;
    };

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
                </TableCell>

                <TableCell>
                    <Typography variant="body2" fontWeight="bold">
                        {row.name}
                    </Typography>
                </TableCell>

                <TableCell>
                    <Typography
                        sx={{
                            cursor: 'pointer',
                            textDecoration: 'underline',
                        }}
                        onClick={toggleDescription}
                    >
                        {isDescriptionExpanded ? row.description : truncateText(row.description, 20)}
                    </Typography>
                </TableCell>

                <TableCell>{row.film_type}</TableCell>

                <TableCell>{row.age_limit}</TableCell>

                <TableCell>{row.duration}</TableCell>

                <TableCell>{row.release_date}</TableCell>

                <TableCell align="right">
                    <IconButton onClick={handleOpenPopover}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>

                <Popover
                    open={Boolean(openPopover)}
                    anchorEl={openPopover}
                    onClose={handleClosePopover}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuList
                        disablePadding
                        sx={{
                            p: 0.5,
                            gap: 0.5,
                            width: 140,
                            display: 'flex',
                            flexDirection: 'column',
                            [`& .${menuItemClasses.root}`]: {
                                px: 1,
                                gap: 2,
                                borderRadius: 0.75,
                                [`&. ${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
                            },
                        }}
                    >
                        <MenuItem onClick={handleClosePopover}>
                            <Iconify icon="solar:pen-bold" />
                            Edit
                        </MenuItem>
                        <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
                            <Iconify icon="solar:trash-bin-trash-bold" />
                            Delete
                        </MenuItem>
                    </MenuList>
                </Popover>
            </TableRow>
        </>
    )
}