import { useCallback, useState } from "react";
import { applyFilter, emptyRows, getComparator } from "../../utils";
import { _users } from '../../../_mock/_data'
import { DashboardContent } from '../../../layouts/dashboard'
import { Box, Button, Card, Table, TableBody, TableContainer, TablePagination, Typography } from "@mui/material";
import { Iconify } from "../../../components/iconify";
import { UserTableHead } from "../user-table-head";
import { UserTableToolbar } from "../user-table-toolbar";
import { Scrollbar } from "../../../components/scrollbar";
import { UserTableRow } from "../user-table-row";
import { TableEmptyRows } from "../../table-empty-rows";
import { TableNoData } from "../../table-no-data";

/**
 * UserView Component
 * @returns A component that displays a list of users with options for filtering, 
 * sorting, and pagination. This list allows users to be selected, filtered by name, 
 * and displayed across multiple pages with adjustable rows per page
 */
export function UserView() {
    // Custom hook to handle table state and functions (pagination, selection, sorting)
    const table = useTable();

    // State for the filter name used to filter the users by their name
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
                    Users
                </Typography>
                {/* <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                >
                    New user
                </Button> */}
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
                                    { id: 'name', label: 'Name' },
                                    { id: 'email', label: 'Email' },
                                    { id: 'phonenumber', label: 'Phone Number' },
                                    { id: 'role', label: 'Role' },
                                    { id: 'status', label: 'Status' },
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

                                <TableEmptyRows
                                    height={68}
                                    emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
                                />

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

/**
 * Custom hooks to manage table state and actions
 * 
 * This hook handles the state and callbacks for managing table interactions,
 * including pagination, row selection, sorting, and resetting the page when needed.
 * 
 * @returns Object containing table state and helper functions.
 */
export function useTable() {
    const [page, setPage] = useState(0); // Current page number
    const [orderBy, setOrderBy] = useState('name'); // Column to sort by
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
    const [selected, setSelected] = useState([]); // Selected row IDs
    const [order, setOrder] = useState('asc'); // Sort order

    // Toggle sorting order based on column header click
    const onSort = useCallback(
        (id) => { // id of the column being clicked
            const isAsc = orderBy === id && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        },
        [order, orderBy]
    );

    // Select or deselect all rows
    const onSelectAllRows = useCallback((checked, newSelecteds) => {
        if (checked) {
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }, []);

    // Toggle selection for a single row
    const onSelectRow = useCallback((inputValue) => {
        const newSelected = selected.includes(inputValue)
            ? selected.filter((value) => value !== inputValue)
            : [...selected, inputValue];

        setSelected(newSelected);
    }, [selected]);

    // Reset page to first page
    const onResetPage = useCallback(() => {
        setPage(0);
    }, []);

    // Change to a specific page
    const onChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);

    // Change number of rows per page and reset to first page
    const onChangeRowsPerPage = useCallback((event) => {
        setRowsPerPage(parseInt(event.target.value, 10)); // base-10 number
        onResetPage();
    }, [onResetPage]);

    return {
        page,
        orderBy,
        rowsPerPage,
        selected,
        order,
        onSort,
        onSelectAllRows,
        onSelectRow,
        onResetPage,
        onChangePage,
        onChangeRowsPerPage
    };
}