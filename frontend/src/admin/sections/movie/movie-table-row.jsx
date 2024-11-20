import { Avatar, Box, Checkbox, IconButton, MenuItem, menuItemClasses, MenuList, Popover, TableCell, TableRow } from "@mui/material";
import { useCallback, useState } from "react";

import { Label } from '../../components/label';
import { Iconify } from '../../components/iconify'

/**
 * MovieTableRow Component
 *
 * This component renders a table row for a movie list. It includes features such as:
 * - Selectable rows with checkboxes.
 * - Displaying user data including avatar, name, email, phone number, role, and status.
 * - A popover menu with actions like Edit and Delete.
 *
 * @param {Object} row - The data for the current row, including the following fields:
 *   @param {string} row.name - The name of the user.
 *   @param {string} row.avatarUrl - The URL for the user's avatar image.
 *   @param {string} row.email - The user's email address.
 *   @param {string} row.phonenumber - The user's phone number.
 *   @param {string} row.role - The user's role (e.g., admin, user).
 *   @param {string} row.status - The status of the user (e.g., "active", "banned").
 * @param {boolean} selected - Indicates whether the current row is selected.
 * @param {Function} onSelectRow - Callback function triggered when the row is selected or deselected.
 *
 * @returns {JSX.Element} The rendered table row, including data cells, a checkbox for selection,
 * and a popover menu with action buttons (Edit and Delete).
 */

export function MovieTableRow({ row, selected, onSelectRow }) {
    const [openPopover, setOpenPopover] = useState(null);

    const handleOpenPopover = useCallback((event) => {
        setOpenPopover(event.currentTarget);
    }, []);

    const handleClosePopover = useCallback(() => {
        setOpenPopover(null);
    }, []);

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
                </TableCell>

                <TableCell component="th" scope="row">
                    <Box gap={2} display="flex" alignItems="center">
                        <Avatar alt={row.name} src={row.avatarUrl} />
                        {row.name}
                    </Box>
                </TableCell>

                <TableCell>{row.email}</TableCell>

                <TableCell>{row.phonenumber}</TableCell>

                <TableCell>{row.role}</TableCell>

                <TableCell>
                    <Label color={(row.status === "banned" && 'error') || 'success'}>{row.status}</Label>
                </TableCell>

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