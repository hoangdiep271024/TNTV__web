import { Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, menuItemClasses, MenuList, Popover, Table, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { Iconify } from '../../components/iconify'
import { useNavigate } from "react-router-dom";

// const deleteMovie = async (id) => {
//     try {
//         const response = await fetch(`http://localhost:8888/api/admin/films/delete/${id}`, {
//             method: 'PATCH',
//         });

//         if (!response.ok) {
//             throw new Error('Failed to delete movie');
//         }

//         return true;
//     } catch (error) {
//         console.error("Error deleting movie:", error);
//         return false;
//     }
// }

// edit button handle
// delete button handle
// click name to open movie details
// onDelete prop
export function MovieTableRow({ row, selected, onSelectRow }) {
    const [openPopover, setOpenPopover] = useState(null);
    const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

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

    const navigate = useNavigate();
    const handleEditButton = () => {
        navigate(`/admin/movie/${row.id}`);
    }

    const handleDeleteButton = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleConfirmDelete = async () => {
        const success = await deleteMovie(row.id);
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
                    <Tooltip title={row.description} placement="top" arrow>
                        <Typography
                            sx={{
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                color: isDescriptionExpanded ? 'primary.main' : 'text.secondary',
                                display: 'inline-block',
                                maxWidth: isDescriptionExpanded ? 'none' : 200,
                                whiteSpace: isDescriptionExpanded ? 'normal' : 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                            onClick={toggleDescription}
                        >
                            {isDescriptionExpanded
                                ? row.description
                                : truncateText(row.description, 20)}
                        </Typography>
                    </Tooltip>
                    {/* <Typography
                        sx={{
                            cursor: 'pointer',
                            textDecoration: 'underline',
                        }}
                        onClick={toggleDescription}
                    >
                        {isDescriptionExpanded ? row.description : truncateText(row.description, 20)}
                    </Typography> */}
                </TableCell>

                <TableCell>
                    <Chip
                        label={row.film_type}
                        // color={row.film_type === 'Feature' ? 'primary' : 'secondary'}
                        // size="small"
                        sx={{ fontWeight: 'bold' }}
                    />
                </TableCell>

                <TableCell>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 'medium',
                            textAlign: 'center',
                            color: row.age_limit >= 18 ? 'error.main' : 'text.primary',
                        }}
                    >
                        {row.age_limit}+
                    </Typography>
                </TableCell>

                <TableCell>
                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                        {row.duration} phút
                    </Typography>
                </TableCell>

                <TableCell>
                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                        {new Date(row.release_date).toLocaleDateString()}
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
                        Bạn có chắc chắn muốn xóa phim <strong>{row.name}</strong> không?
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