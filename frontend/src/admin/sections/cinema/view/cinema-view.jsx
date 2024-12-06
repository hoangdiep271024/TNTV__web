import { useEffect, useState } from "react";
import { hook } from "../hook";
import { applyFilter, getComparator } from "../../utils";
import { DashboardContent } from "../../../layouts/dashboard";
import { Card, Box, Button, Table, TableBody, TableContainer, TablePagination, Typography, TableRow, TableCell, CircularProgress } from "@mui/material";
import { Iconify } from "../../../components/iconify";
import { CinemaTableToolbar } from "../cinema-table-toolbar";
import { Scrollbar } from "../../../components/scrollbar";
import { CinemaTableHead } from "../cinema-table-head";
import { TableNoData } from "../../table-no-data";
import { CinemaTableRow } from "../cinema-table-row";
import { Link } from "react-router-dom";

// chưa chỉnh search bar
export function CinemaView() {
    const table = hook();
    const [filterName, setFilterName] = useState('');
    const [cinemas, setCinemas] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDeleteSelected = async () => {
        if (table.selected.length === 0) return;

        try {
            for (const cinemaId of table.selected) {
                const response = await fetch(`http://localhost:8888/api/admin/cinemas/delete/${cinemaId}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    // credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Failed to delete cinema with ID: ${cinemaId}`);
                }
            }

            setCinemas((prevCinemas) => prevCinemas.filter((cinema) => !table.selected.includes(cinema.cinema_id)));
            table.setSelected([]);
            console.log('Selected cinemas deleted successfully.');
        } catch (error) {
            console.error('Error deleting selected cinemas:', error);
        }
    };

    useEffect(() => {
        const fetchCinemas = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:8888/api/admin/cinemas", {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    // credentials: 'include',
                });

                if (!response.ok) throw new Error("Failed to fetch cinemas");

                const data = await response.json();
                setCinemas(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchCinemas();
    }, []);

    const dataFiltered = applyFilter({
        inputData: cinemas,
        comparator: getComparator(table.order, table.orderBy),
        filterName
    });

    const notFound = !dataFiltered.length && filterName;

    return (
        <DashboardContent>
            <Box display='flex' alignItems="center" mb={5}>
                <Typography variant="h2">
                    Quản lý rạp chiếu phim
                </Typography>
                <Box flexGrow={1} />
                <Button
                    variant="contained"
                    color="success"
                    component={Link}
                    to="/admin/cinema/create"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                >
                    Thêm rạp chiếu
                </Button>
            </Box>

            <Card>
                <CinemaTableToolbar
                    numSelected={table.selected.length}
                    filterName={filterName}
                    onFilterName={(event) => {
                        setFilterName(event.target.value);
                        table.onResetPage();
                    }}
                    onDeleteSelected={handleDeleteSelected}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <CinemaTableHead
                                order={table.order}
                                orderBy={table.orderBy}
                                rowCount={cinemas.length}
                                numSelected={table.selected.length}
                                onSort={table.onSort}
                                onSelectAllRows={(checked) => {
                                    table.onSelectAllRows(checked, cinemas.map((cinema) => cinema.cinema_id))
                                }}
                                headLabel={[
                                    { id: 'cinema_name', label: 'Tên rạp chiếu' },
                                    { id: 'address', label: 'Địa chỉ' },
                                    { id: 'cluster_name', label: 'Cụm rạp' },
                                    { id: '' }
                                ]}
                            />

                            <TableBody>
                                {loading && (
                                    <TableRow>
                                        <TableCell colSpan={7}>
                                            <Box display="flex" justifyContent="center" alignItems="center" height="150px">
                                                <CircularProgress />
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {!loading && dataFiltered.slice(
                                    table.page * table.rowsPerPage,
                                    table.page * table.rowsPerPage + table.rowsPerPage
                                ).map((row) => (
                                    <CinemaTableRow
                                        key={row.cinema_id}
                                        row={row}
                                        selected={table.selected.includes(row.cinema_id)}
                                        onSelectRow={() => table.onSelectRow(row.cinema_id)}
                                        onDelete={(id) => {
                                            setCinemas((prevCinemas) => prevCinemas.filter((cinema) => cinema.cinema_id !== id));
                                            table.setSelected((prevSelected) => prevSelected.filter((selectedId) => selectedId !== id));
                                        }}
                                    />
                                ))}

                                {notFound && <TableNoData searchQuery={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                {cinemas.length > 0 && (
                    <TablePagination
                        component="div"
                        page={table.page}
                        count={cinemas.length}
                        rowsPerPage={table.rowsPerPage}
                        onPageChange={table.onChangePage}
                        rowsPerPageOptions={[5, 10, 25]}
                        onRowsPerPageChange={table.onChangeRowsPerPage}
                        labelRowsPerPage="Số dòng mỗi trang:"
                    />
                )}
            </Card>
        </DashboardContent>
    );
}