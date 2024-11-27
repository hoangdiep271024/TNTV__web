/**
 * MovieTableHead Component
 * 
 * This component renders the table header for a movie list with selectable rows and sortable columns.
 * It includes a checkbox to select all rows, column labels, and sorting controls.
 * 
 * @param {number} numSelected - The number of currently selected rows.
 * @param {number} rowCount - The total number of rows in the table.
 * @param {Function} onSelectAllRows - Handler for selecting or deselecting all rows.
 * @param {Array} headLabel - Array of objects representing each column's properties.
 * @param {string} orderBy - ID of the column currently being sorted.
 * @param {string} order - Current sorting order, either 'asc' or 'desc'.
 * @param {Function} onSort - Handler for sorting the table by a specific column.
 * 
 * @returns {JSX.Element} The rendered table header, including the "Select All" checkbox and sortable column headers.
 */

import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "../utils";

export function MovieTableHead({
    numSelected,
    rowCount,
    onSelectAllRows,
    headLabel,
    orderBy,
    order,
    onSort
}) {
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={(event) => onSelectAllRows(event.target.checked)}
                    />
                </TableCell>

                {headLabel.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align || 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{ width: headCell.width, minWidth: headCell.minWidth }}
                    >
                        <TableSortLabel
                            hideSortIcon
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={() => onSort(headCell.id)}
                        >
                            {headCell.label}

                            {orderBy === headCell.id ? (
                                <Box sx={{ ...visuallyHidden }}>
                                    {order === 'desc' ? 'sorted descending' : 'sort ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
