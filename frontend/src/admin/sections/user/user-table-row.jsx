import { Avatar, Box, Checkbox, IconButton, MenuItem, menuItemClasses, MenuList, Popover, TableCell, TableRow, Typography } from "@mui/material";
import { useCallback, useState } from "react";

import { Label } from '../../components/label';
import { Iconify } from '../../components/iconify'
import { useNavigate } from "react-router-dom";

export function UserTableRow({ row, selected, onSelectRow }) {
    const [openPopover, setOpenPopover] = useState(null);
    const navigate = useNavigate();

    const handleOpenPopover = useCallback((event) => {
        setOpenPopover(event.currentTarget);
    }, []);

    const handleClosePopover = useCallback(() => {
        setOpenPopover(null);
    }, []);

    const handleEdit = () => {
        handleClosePopover();
        navigate('/admin/user/${row.id}')
    }

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
                </TableCell>

                <TableCell component="th" scope="row">
                    <Box gap={2} display="flex" alignItems="center">
                        <Avatar alt={row.name} src={row.avatarUrl} />
                        <Typography variant="body2" fontWeight="bold">
                            {row.name}
                        </Typography>
                    </Box>
                </TableCell>

                <TableCell>{row.email}</TableCell>

                <TableCell>{row.phonenumber}</TableCell>

                <TableCell>{row.role}</TableCell>

                <TableCell>
                    <Label color={(row.status === "inactive" && 'error') || 'success'}>{row.status}</Label>
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
                        <MenuItem onClick={handleEdit}>
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