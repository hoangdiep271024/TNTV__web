import { useState } from "react";
import { applyFilter, emptyRows, getComparator } from "../../utils";
import { _users } from '../../../_mock/_data'
import { DashboardContent } from '../../../layouts/dashboard'
import { Box, Card, Table, TableBody, TableContainer, TablePagination, Typography } from "@mui/material";
import { Iconify } from "../../../components/iconify";

import { UserTableHead } from "../user-table-head";
import { UserTableToolbar } from "../user-table-toolbar";
import { Scrollbar } from "../../../components/scrollbar";
import { UserTableRow } from "../user-table-row";
import { TableEmptyRows } from "../../table-empty-rows";
import { TableNoData } from "../../table-no-data";
import { useTable } from "../use-table";

/**
 * UserView Component
 * @returns A component that displays a list of users with options for filtering, 
 * sorting, and pagination. This list allows users to be selected, filtered by name, 
 * and displayed across multiple pages with adjustable rows per page
 */

export function UserView() {
    // Custom hook to handle table state and functions (pagination, selection, sorting)
    const table = useTable();

    // State variable to manage the filter criteria for filtering users by their name
    const [filterName, setFilterName] = useState('');

    // Filter and sort the list of users based on the current filter and sort settings
    const dataFiltered = applyFilter({
        inputData: _users,
        comparator: getComparator(table.order, table.orderBy),
        filterName,
    });

    // Determine if there are no users that match the filter
    const notFound = !dataFiltered.length && filterName;

    return (
        <DashboardContent>
            <Box display="flex" alignItems="center" mb={5}>
                <Typography variant="h4" flexGrow={1}>
                    Quản lý người dùng
                </Typography>
            </Box>

            <Card>
                <UserTableToolbar
                    numSelected={table.selected.length}
                    filterName={filterName}
                    onFilterName={(event) => {
                        setFilterName(event.target.value);
                        table.onResetPage(); // Reset table page when filter changes
                    }}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <UserTableHead
                                order={table.order}
                                orderBy={table.orderBy}
                                rowCount={_users.length}
                                numSelected={table.selected.length}
                                onSort={table.onSort}
                                onSelectAllRows={(checked) =>
                                    table.onSelectAllRows(checked, _users.map((user) => user.id))
                                }
                                headLabel={[
                                    { id: 'name', label: 'Tên người dùng' },
                                    { id: 'email', label: 'Email' },
                                    { id: 'phonenumber', label: 'Số điện thoại' },
                                    { id: 'role', label: 'Vai trò' },
                                    { id: 'status', label: 'Trạng thái' },
                                    { id: '' },
                                ]}
                            />
                            <TableBody>
                                {/* Display rows based on pagination */}
                                {dataFiltered.slice(
                                    table.page * table.rowsPerPage,
                                    table.page * table.rowsPerPage + table.rowsPerPage
                                ).map((row) => (
                                    <UserTableRow
                                        key={row.id}
                                        row={row}
                                        selected={table.selected.includes(row.id)}
                                        onSelectRow={() => table.onSelectRow(row.id)}
                                    />
                                ))}

                                {/* <TableEmptyRows
                                    height={68}
                                    emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
                                /> */}

                                {/* Message for no matching data based on filter */}
                                {notFound && <TableNoData searchQuery={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                {/* Pagination controls */}
                <TablePagination
                    component="div"
                    page={table.page}
                    count={_users.length}
                    rowsPerPage={table.rowsPerPage}
                    onPageChange={table.onChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={table.onChangeRowsPerPage}
                />
            </Card>
        </DashboardContent>
    )
}
