import { useState } from "react";
import { hook } from "../hook";
import { applyFilter, getComparator } from "../../utils";
import { _orders } from "../../../_mock";
import { DashboardContent } from "../../../layouts/dashboard";
import { Box, Button, Table, TableContainer, Typography } from "@mui/material";
import { Iconify } from "../../../components/iconify";
import { OrderTableToolbar } from "../order-table-toolbar";
import { Scrollbar } from "../../../components/scrollbar";
import { OrderTableHead } from "../order-table-head";
import { OrderTableRow } from "../order-table-row";

// click order_id to open order-detail page
export function OrderView() {
    const table = hook();
    const [filterName, setFilterName] = useState('');

    const dataFiltered = applyFilter({
        inputData: _orders,
        comparator: getComparator(table.order, table.orderBy),
        filterName
    });

    const notFound = !dataFiltered.length && filterName;

    return (
        <DashboardContent>
            <Box display='flex' alignItems="center" mb={5}>
                <Typography variant="h4">
                    Quản lý đơn hàng
                </Typography>
            </Box>

            <Card>
                <OrderTableToolbar
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
                            <OrderTableHead
                                order={table.order}
                                orderBy={table.orderBy}
                                rowCount={_orders.length}
                                numSelected={table.selected.length}
                                onSort={table.onSort}
                                onSelectedAllRows={(checked) => {
                                    table.onSelectAllRows(checked, _orders.map((order) => order.id))
                                }}
                                headLabel={[
                                    { id: 'id', label: 'Mã đơn hàng' },
                                    { id: 'movie_name', label: 'Tên phim' },
                                    { id: 'cinema_name', label: 'Tên rạp chiếu phim' },
                                    { id: 'room_name', label: 'Tên phòng chiếu phim' },
                                    { id: 'show_date', label: 'Ngày chiếu' },
                                    { id: 'total_price', label: 'Tổng giá trị đơn hàng' },
                                    { id: '' }
                                ]}
                            />

                            <TableBody>
                                {dataFiltered.slice(
                                    table.page * table.rowsPerPage,
                                    table.page * table.rowsPerPage + table.rowsPerPage
                                ).map((row) => (
                                    <OrderTableRow
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
    )

}