import { useState } from "react";
import { hook } from "../../movie/hook";
import { applyFilter, getComparator } from "../../utils";
import { _cinemas } from "../../../_mock";
import { DashboardContent } from "../../../layouts/dashboard";
import { Card, Box, Button, Table, TableBody, TableContainer, TablePagination, Typography } from "@mui/material";
import { Iconify } from "../../../components/iconify";
import { CinemaTableToolbar } from "../cinema-table-toolbar";
import { Scrollbar } from "../../../components/scrollbar";
import { CinemaTableHead } from "../cinema-table-head";
import { TableNoData } from "../../table-no-data";
import { CinemaTableRow } from "../cinema-table-row";

// add-cinema button to move to create-cinema page
export function CinemaView() {
    const table = hook();
    const [filterName, setFilterName] = useState('');

    const dataFiltered = applyFilter({
        inputData: _cinemas,
        comparator: getComparator(table.order, table.orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && filterName;

    return (
        <DashboardContent>
            <Box display='flex' alignItems="center" mb={5}>
                <Typography variant="h4">
                    Quản lý rạp chiếu phim
                </Typography>
                <Box flexGrow={1} />
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                >
                    Thêm rạp chiếu phim
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
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <CinemaTableHead
                                order={table.order}
                                orderBy={table.orderBy}
                                rowCount={_cinemas.length}
                                numSelected={table.selected.length}
                                onSort={table.onSort}
                                onSelectAllRows={(checked) => {
                                    table.onSelectAllRows(checked, _cinemas.map((cinema) => cinema.id))
                                }}
                                headLabel={[
                                    { id: 'name', label: 'Tên rạp chiếu phim' },
                                    { id: 'address', label: 'Địa chỉ' },
                                    { id: '' }
                                ]}
                            />

                            <TableBody>
                                {dataFiltered.slice(
                                    table.page * table.rowsPerPage,
                                    table.page * table.rowsPerPage + table.rowsPerPage
                                ).map((row) => (
                                    <CinemaTableRow
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
                    count={_cinemas.length}
                    rowsPerPage={table.rowsPerPage}
                    onPageChange={table.onChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={table.onChangeRowsPerPage}
                />
            </Card>
        </DashboardContent>
    );
}