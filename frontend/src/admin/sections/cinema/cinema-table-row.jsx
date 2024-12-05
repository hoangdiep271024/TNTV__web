import { Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, menuItemClasses, MenuList, Popover, Table, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { Iconify } from '../../components/iconify'
import { useNavigate } from "react-router-dom";

// const deleteCinema = async (id) => {
//     try {
//         const response = await fetch(`http://localhost:8888/api/admin/cinemas/delete/${id}`, {
//             method: 'PATCH',
//         });

//         if (!response.ok) {
//             throw new Error('Failed to delete cinema');
//         }

//         return true;
//     } catch (error) {
//         console.error("Error deleting cinema:", error);
//         return false;
//     }
// }

// edit button handle
// delete button handle
// click name to open cinema details
// onDelete prop
export function CinemaTableRow({ row, selected, onSelectRow }) {
    const [openPopover, setOpenPopover] = useState(null);
    const [isAddressExpanded, setAddressExpanded] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenPopover = useCallback((event) => {
        setOpenPopover(event.currentTarget);
    }, []);

    const handleClosePopover = useCallback(() => {
        setOpenPopover(null);
    }, []);

    const toggleAddress = () => {
        setAddressExpanded((prev) => !prev);
    };

    const truncateText = (text, length) => {
        if (text.length > length) {
            return `${text.substring(0, length)}...`;
        }
        return text;
    };

    const navigate = useNavigate();
    const handleEditButton = () => {
        navigate(`/admin/cinema/${row.id}`);
    }

    const handleDeleteButton = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleConfirmDelete = async () => {
        const success = await deleteCinema(row.id);
        if (success) {
            onDelete(row.id);
        }
        setOpenDialog(false);
    }


    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
                </TableCell>

                <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                        {row.name}
                    </Typography>
                </TableCell>

                <TableCell>
                    <Tooltip title={row.address} placement="top" arrow>
                        <Typography
                            sx={{
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                color: isAddressExpanded ? 'primary.main' : 'text.secondary',
                                display: 'inline-block',
                                maxWidth: isAddressExpanded ? 'none' : 200,
                                whiteSpace: isAddressExpanded ? 'normal' : 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                            onClick={toggleAddress}
                        >
                            {isAddressExpanded
                                ? row.address
                                : truncateText(row.address, 20)}
                        </Typography>
                    </Tooltip>
                    {/* <Typography
                        sx={{
                            cursor: 'pointer',
                            textDecoration: 'underline',
                        }}
                        onClick={toggleAddress}
                    >
                        {isAddressExpanded ? row.address : truncateText(row.address, 20)}
                    </Typography> */}
                </TableCell>

                <TableCell>
                    <Chip
                        label={row.cluster_name}
                        color="primary"
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                    />
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
                        <MenuItem onClick={handleEditButton} sx={{ color: 'primary.main' }}>
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

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <Typography>
                        Bạn có chắc chắn muốn xóa rạp chiếu <strong>{row.name}</strong> không?
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