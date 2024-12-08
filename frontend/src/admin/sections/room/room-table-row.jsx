import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Link, IconButton, MenuItem, Popover, Table, TableCell, TableRow, Typography, TextField, MenuList, menuItemClasses, Snackbar } from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import { Iconify } from '../../components/iconify';

const deleteRoom = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/rooms/delete/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            // credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to delete room');
        }

        return true;
    } catch (error) {
        console.error("Error deleting room:", error);
        return false;
    }
}

const fetchRoomDetails = async (roomId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/rooms/detail/${roomId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch room details');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching room details:", error);
        return null;
    }
}

const editRoom = async (roomId, roomName, cinemaName) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/rooms/edit/${roomId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ room_name: roomName, cinema_name: cinemaName }),
        });

        if (!response.ok) {
            throw new Error('Failed to edit room');
        }

        return true;
    } catch (error) {
        console.error("Error editing room:", error);
        return false;
    }
}
export function RoomTableRow({ row, selected, onSelectRow, onDelete }) {
    const [openPopover, setOpenPopover] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [cinemaName, setCinemaName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOpenPopover = useCallback((event) => {
        setOpenPopover(event.currentTarget);
    }, []);

    const handleClosePopover = useCallback(() => {
        setOpenPopover(null);
    }, []);

    const handleDeleteButton = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    }

    const handleEditClick = async () => {
        setLoading(true);
        const roomDetails = await fetchRoomDetails(row.room_id);
        if (roomDetails) {
            setRoomName(roomDetails.room[0].room_name);
            setCinemaName(roomDetails.cinema[0].cinema_name);
        }
        setLoading(false);
        setOpenEditDialog(true);
    }

    const handleConfirmDelete = async () => {
        const success = await deleteRoom(row.room_id);
        if (success) {
            onDelete(row.room_id);
        }
        setOpenDialog(false);
    }

    const handleSubmitEdit = async () => {
        const success = await editRoom(row.room_id, roomName, cinemaName);
        if (success) {

        }
        setOpenEditDialog(false);
    }

    // console.log(row);

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
                </TableCell>

                <TableCell>
                    <Typography variant="body2" fontWeight="bold" noWrap>
                        <Link onClick={handleEditClick} sx={{ cursor: 'pointer' }}>
                            {row.room_name}
                        </Link>
                    </Typography>
                </TableCell>

                <TableCell>
                    <Typography variant="body2" noWrap>
                        {row.cinema_name}
                    </Typography>
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
                        <MenuItem onClick={handleClosePopover} sx={{ color: 'primary.main' }}>
                            <Iconify icon="solar:pen-bold" />
                            Chỉnh sửa
                        </MenuItem>
                        <MenuItem onClick={handleDeleteButton} sx={{ color: 'error.main' }}>
                            <Iconify icon="solar:trash-bin-trash-bold" />
                            Xóa
                        </MenuItem>
                    </MenuList>
                </Popover>
            </TableRow>

            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>{loading ? 'Đang tải dữ liệu...' : 'Chỉnh sửa phòng chiếu'}</DialogTitle>
                <DialogContent>
                    {loading ? (
                        <Typography variant="body2">Đang tải dữ liệu...</Typography>
                    ) : (
                        <>
                            <TextField
                                label="Tên phòng"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                fullWidth
                                sx={{ mb: 2, mt: 2 }}
                            />
                            <TextField
                                label="Tên rạp"
                                value={cinemaName}
                                onChange={(e) => setCinemaName(e.target.value)}
                                fullWidth
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleSubmitEdit} color="primary">
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <Typography>
                        Bạn có chắc chắn muốn xóa phòng chiếu <strong>{row.room_name}</strong> của rạp <strong>{row.cinema_name}</strong> không?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}