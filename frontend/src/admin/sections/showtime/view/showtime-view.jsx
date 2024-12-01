import { useState } from "react";
import { hook } from "../hook";
import { applyFilter, getComparator } from "../../utils";
import { _showtimes } from "../../../_mock";
import { DashboardContent } from "../../../layouts/dashboard";
import { Box, Button, Card, Table, TableContainer, TablePagination, Typography, TableBody } from "@mui/material";
import { ShowtimeTableToolbar } from "../showtime-table-toolbar";
import { Scrollbar } from "../../../components/scrollbar";
import { ShowtimeTableHead } from "../showtime-table-head";
import { ShowtimeTableRow } from "../showtime-table-row";
import { Iconify } from "../../../components/iconify";

// add-showtime button to move to create-showtime page
// click showtime-id to open edit-showtime page
export function ShowtimeView() {
    const table = hook();
    const [filterName, setFilterName] = useState('');

    const dataFiltered = applyFilter({
        inputData: _showtimes,
        comparator: getComparator(table.order, table.orderBy),
        filterName
    })

    const notFound = !dataFiltered.length && filterName;

    return (
        <DashboardContent>
            <Box display='flex' alignItems="center" mb={5}>
                <Typography variant="h2">
                    Quản lý suất chiếu phim
                </Typography>
                <Box flexGrow={1} />
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                >
                    Thêm suất chiếu
                </Button>
            </Box>

            <Card>
                <ShowtimeTableToolbar
                    numSelected={table.selected.length}
                    filterName={filterName}
                    onFilterName={(event) => {
                        setFilterName(event.target.value);
                        table.onResetPage();
                    }}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <ShowtimeTableHead
                                order={table.order}
                                orderBy={table.orderBy}
                                rowCount={_showtimes.length}
                                numSelected={table.selected.length}
                                onSort={table.onSort}
                                onSelectAllRows={(checked) => {
                                    table.onSelectAllRows(checked, _showtimes.map((showtime) => showtime.id))
                                }}
                                headLabel={[
                                    { id: 'id', label: 'ID suất chiếu' },
                                    { id: 'movie_name', label: 'Tên phim' },
                                    { id: 'cinema_name', label: 'Tên rạp chiếu' },
                                    { id: 'room_name', label: 'Tên phòng chiếu' },
                                    { id: 'date', label: 'Ngày chiếu' },
                                    { id: 'showtime', label: 'Giờ chiếu' },
                                    { id: '' }
                                ]}
                            />

                            <TableBody>
                                {dataFiltered.slice(
                                    table.page * table.rowsPerPage,
                                    table.page * table.rowsPerPage + table.rowsPerPage
                                ).map((row) => (
                                    <ShowtimeTableRow
                                        key={row.id}
                                        row={row}
                                        selected={table.selected.includes(row.id)}
                                        onSelectRow={() => table.onSelectRow(row.id)}
                                    />
                                ))}

                                {notFound && <TableNoData searchQuery={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    component="div"
                    page={table.page}
                    count={_showtimes.length}
                    rowsPerPage={table.rowsPerPage}
                    onPageChange={table.onChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={table.onChangeRowsPerPage}
                    labelRowsPerPage="Số dòng mỗi trang:"
                />
            </Card>
        </DashboardContent>
    )
}
