import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

/**
 * MovieTableHead Component
 * 
 * This component renders the table header for a movie list with selectable rows and sortable columns.
 * It includes a checkbox to select all rows, column labels, and sorting controls.
 * 
 * Props:
 * - numSelected (number): Number of selected rows.
 * - rowCount (number): Total number of rows.
 * - onSelectAllRows (function): Function to call when the "Select All" checkbox is toggled.
 * - headLabel (array): Array of objects representing column headers. Each object should have `id`, `label`, and optional `align`, `width`, and `minWidth`.
 * - orderBy (string): Column currently sorted by.
 * - order (string): Sort direction, either 'asc' or 'desc'.
 * - onSort (function): Function to call when a column header is clicked for sorting.
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

                            {/* Visually hidden text for screen readers to announce sort direction */}
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
