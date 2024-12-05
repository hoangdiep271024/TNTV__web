import { useState } from "react";
import { hook } from "../hook";
import { _rooms } from "../../../_mock";
import { applyFilter, getComparator } from "../../utils";
import { DashboardContent } from "../../../layouts/dashboard";
import { Box, Button, Card, Table, TableBody, TableContainer, TablePagination, Typography } from "@mui/material";
import { Iconify } from "../../../components/iconify";
import { RoomTableToolbar } from "../room-table-toolbar";
import { Scrollbar } from "../../../components/scrollbar";
import { RoomTableHead } from "../room-table-head";
import { RoomTableRow } from "../room-table-row";
import { TableNoData } from "../../table-no-data";

export function RoomView() {
    const table = hook();
    const [filterName, setFilterName] = useState('');

    const dataFiltered = applyFilter({
        inputData: _rooms,
        comparator: getComparator(table.order, table.orderBy),
        filterName
    })

    const notFound = !dataFiltered.length && filterName;

    return (
        <DashboardContent>
            <Box display='flex' alignItems="center" mb={5}>
                <Typography variant="h2">
                    Quản lý phòng chiếu phim
                </Typography>
            </Box>

            <Card>
                <RoomTableToolbar
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
                            <RoomTableHead
                                order={table.order}
                                orderBy={table.orderBy}
                                rowCount={_rooms.length}
                                numSelected={table.selected.length}
                                onSort={table.onSort}
                                onSelectAllRows={(checked) => {
                                    table.onSelectAllRows(checked, _rooms.map((room) => room.id))
                                }}
                                headLabel={[
                                    { id: 'room_name', label: 'Tên phòng chiếu' },
                                    { id: 'cinema_name', label: 'Tên rạp chiếu' },
                                    { id: '' }
                                ]}
                            />

                            <TableBody>
                                {dataFiltered.slice(
                                    table.page * table.rowsPerPage,
                                    table.page * table.rowsPerPage + table.rowsPerPage
                                ).map((row) => (
                                    <RoomTableRow
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
                    count={_rooms.length}
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