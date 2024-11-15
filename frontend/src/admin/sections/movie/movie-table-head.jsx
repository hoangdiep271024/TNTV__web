import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

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
                {/* Checkbox to select all rows */}
                <TableCell padding="checkbox">
                    <Checkbox
                        // Checkbox state is indeterminate if some rows are selected, but not all
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        // Checkbox is checked if all rows are selected
                        checked={rowCount > 0 && numSelected === rowCount}
                        // Calls function to select or deselect all rows
                        onChange={(event) => onSelectAllRows(event.target.checked)}
                    />
                </TableCell>

                {/* Map over headLabel array to create column headers */}
                {headLabel.map((headCell) => (
                    <TableCell
                        key={headCell.id} // Unique key for each header cell
                        align={headCell.align || 'left'} // Aligns text as specified or defaults to 'left'
                        sortDirection={orderBy === headCell.id ? order : false} // Applies sorting direction if column is sorted
                        sx={{ width: headCell.width, minWidth: headCell.minWidth }} // Sets custom width if provided
                    >
                        {/* TableSortLabel component to handle sorting */}
                        <TableSortLabel
                            hideSortIcon // Hides default sort icon
                            active={orderBy === headCell.id} // Activates if the column is sorted
                            direction={orderBy === headCell.id ? order : 'asc'} // Shows current sort direction
                            onClick={() => onSort(headCell.id)} // Calls sorting function on click
                        >
                            {/* Displays column label */}
                            {headCell.label}

                            {orderBy === headCell.id ? (
                                <Box>
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
