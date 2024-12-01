import { useState } from "react";
import { hook } from "../hook";
import { applyFilter, getComparator } from "../../utils";
import { _orders } from "../../../_mock";
import { DashboardContent } from "../../../layouts/dashboard";
import { Card, Box, Table, TableBody, TableContainer, TablePagination, Typography } from "@mui/material";
import { OrderTableToolbar } from "../order-table-toolbar";
import { Scrollbar } from "../../../components/scrollbar";
import { OrderTableHead } from "../order-table-head";
import { OrderTableRow } from "../order-table-row";
import { TableNoData } from "../../table-no-data";

// click order_id to open order-detail page
// select all bug 

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
                <Typography variant="h2">
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
                                    table.onSelectAllRows(checked, _orders.map((order) => order.order_id))
                                }}
                                headLabel={[
                                    { id: 'order_id', label: 'Mã đơn hàng' },
                                    { id: 'movie_name', label: 'Tên phim' },
                                    { id: 'cinema_name', label: 'Tên rạp chiếu' },
                                    { id: 'room_name', label: 'Tên phòng chiếu' },
                                    { id: 'show_date', label: 'Ngày chiếu' },
                                    { id: 'total_price', label: 'Giá trị đơn hàng' },
                                    { id: 'order_date', label: 'Ngày đặt hàng' },
                                    { id: '' }
                                ]}
                            />

                            <TableBody>
                                {dataFiltered.slice(
                                    table.page * table.rowsPerPage,
                                    table.page * table.rowsPerPage + table.rowsPerPage
                                ).map((row) => (
                                    <OrderTableRow
                                        key={row.order_id}
                                        row={row}
                                        selected={table.selected.includes(row.order_id)}
                                        onSelectRow={() => table.onSelectRow(row.order_id)}
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
                    count={_orders.length}
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