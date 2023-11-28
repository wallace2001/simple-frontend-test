import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TablePagination } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function CustomizedTables({
    columns,
    data,
}) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {columns.map(column => (
                            column.id === 'actions' ? (
                                <StyledTableCell key={column.id} align='center' width={140}>{column.label}</StyledTableCell>
                            ) : (
                                <StyledTableCell key={column.id}>{column.label}</StyledTableCell>
                            )
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <StyledTableRow key={row.nome}>
                            {columns.map(({ field, render }) => {
                                if (render) {
                                    return (
                                        <StyledTableCell key={row.id} component="th" scope="row">
                                            {render(row)}
                                        </StyledTableCell>
                                    )
                                }

                                if (field === 'actions') {
                                    return (
                                        <StyledTableCell key={row.id} align='center'>
                                            {render(row)}
                                        </StyledTableCell>
                                    );
                                }

                                return (
                                    <StyledTableCell key={row.id} component="th" scope="row">
                                        {row[field]}
                                    </StyledTableCell>
                                );
                            })}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}