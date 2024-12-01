import { Checkbox, IconButton, MenuItem, menuItemClasses, MenuList, Popover, Table, TableCell, TableRow, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { Iconify } from '../../components/iconify'

// edit button handler
// delete button handler
// click name to open showtime details

export function ShowtimeTableRow({ row, selected, onSelectRow }) {
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

                <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                        {row.id}
                    </Typography>
                </TableCell>

                <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.primary' }} noWrap>
                        {row.movie_name}
                    </Typography>
                </TableCell>

                <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.secondary' }} noWrap>
                        {row.cinema_name}
                    </Typography>
                </TableCell>

                <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.secondary' }} noWrap>
                        {row.room_name}
                    </Typography>
                </TableCell>

                <TableCell>
                    <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 'medium' }}>
                        {new Date(row.date).toLocaleDateString()}
                    </Typography>
                </TableCell>

                <TableCell>
                    <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 'medium' }}>
                        {row.showtime}
                    </Typography>
                </TableCell>

                <TableCell align="right">
                    <IconButton onClick={handleOpenPopover} size="small">
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
                        <MenuItem onClick={handleClosePopover} sx={{ color: 'primary.main' }}>
                            <Iconify icon="solar:pen-bold" />
                            Chỉnh sửa
                        </MenuItem>
                        <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
                            <Iconify icon="solar:trash-bin-trash-bold" />
                            Xóa
                        </MenuItem>
                    </MenuList>
                </Popover>
            </TableRow>
        </>
    )
}