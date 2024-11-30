import { DashboardContent } from "../../../layouts/dashboard";
import { Box, Button, Card, Table, TableBody, TableContainer, TablePagination, Typography } from '@mui/material';
import { Iconify } from "../../../components/iconify";
import { MovieTableToolbar } from "../movie-table-toolbar";
import { useState } from "react";
import { _movies } from "../../../_mock";
import { hook } from "../hook";
import { applyFilter, emptyRows, getComparator } from "../../utils";
import { MovieTableHead } from "../movie-table-head";
import { MovieTableRow } from "../movie-table-row";
import { TableEmptyRows } from "../../table-empty-rows";
import { TableNoData } from "../../table-no-data";
import { Scrollbar } from "../../../components/scrollbar";

// add-movie button to move to create-movie page
export function MovieView() {
    const table = hook();
    const [filterName, setFilterName] = useState('');

    // Filter and sort the list of users based on the current filter and sort settings
    const dataFiltered = applyFilter({
        inputData: _movies,
        comparator: getComparator(table.order, table.orderBy),
        filterName,
    });

    // Determine if there are no users that match the filter
    const notFound = !dataFiltered.length && filterName;

    return (
        <DashboardContent>
            <Box display="flex" alignItems="center" mb={5}>
                <Typography variant="h2">
                    Quản lý phim
                </Typography>
                <Box flexGrow={1} />
                <Button
                    variant="contained"
                    color="success.main"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                >
                    Thêm phim
                </Button>
            </Box>

            <Card>
                <MovieTableToolbar
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
                            <MovieTableHead
                                order={table.order}
                                orderBy={table.orderBy}
                                rowCount={_movies.length}
                                numSelected={table.selected.length}
                                onSort={table.onSort}
                                onSelectAllRows={(checked) =>
                                    table.onSelectAllRows(checked, _movies.map((movie) => movie.id))
                                }
                                headLabel={[
                                    { id: 'name', label: 'Tên phim' },
                                    { id: 'description', label: 'Mô tả' },
                                    { id: 'film_type', label: 'Thể loại chính' },
                                    { id: 'age_limit', label: 'Giới hạn độ tuổi' },
                                    { id: 'duration', label: 'Thời lượng (phút)' },
                                    { id: 'release_date', label: 'Ngày phát hành' },
                                    { id: '' }
                                ]}
                            />
                            <TableBody>
                                {dataFiltered.slice(
                                    table.page * table.rowsPerPage,
                                    table.page * table.rowsPerPage + table.rowsPerPage
                                ).map((row) => (
                                    <MovieTableRow
                                        key={row.id}
                                        row={row}
                                        selected={table.selected.includes(row.id)}
                                        onSelectRow={() => table.onSelectRow(row.id)}
                                    />
                                ))}

                                {/* <TableEmptyRows
                                    height={68}
                                    emptyRows={emptyRows(table.page, table.rowsPerPage, _movies.length)}
                                /> */}

                                {notFound && <TableNoData searchQuery={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    component="div"
                    page={table.page}
                    count={_movies.length}
                    rowsPerPage={table.rowsPerPage}
                    onPageChange={table.onChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={table.onChangeRowsPerPage}
                    labelRowsPerPage="Số dòng mỗi trang:"
                />
            </Card>
        </DashboardContent>
    );
}