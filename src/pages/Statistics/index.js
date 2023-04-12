import React, { useEffect, useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { AuthContext } from 'src/Components/Contexts/AuthContext';

// To call APIs
import { getRequest } from 'src/Setup/AxiosClient';


const columns = [
    { id: 'test', label: 'Test', align: 'left' },

    {
        id: 'testdate',
        label: 'Date',
        align: 'center',

    },
    {
        id: 'rightAnswers',
        label: 'Right Answers',
        align: 'center',

    },
    {
        id: 'result',
        label: 'Result',
        align: 'center',

    }
];

function createData(test, testdate, rightAnswers) {

    const result = rightAnswers > 19 ? 'Pass' : 'Fail';

    return { test, testdate, rightAnswers, result };
}

const useStyles = styled({
    root: {
        // width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'salmon',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export default function Statistics() {

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);

    const authContext = useContext(AuthContext);

    const authState = authContext.authState

    const updatedState = [];

    useEffect(() => {

        getData(authState.id, authState.token)

    }, [authState.id]);

    const getData = async (id, token) => {

        const response = await getRequest('statistics/' + id, token);

        if (response.status === 200) {
            const objStatistics = response.data[0].Statistics;

            if (objStatistics.length > 0) {
                for (let a = 0; a < objStatistics.length; a++) {

                    updatedState[a] = createData(objStatistics[a].Test.title, new Date(objStatistics[a].testdate).toLocaleString("lookup"), objStatistics[a].answers);

                    setRows([...rows, ...updatedState]);
                };

            }
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <section>

            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <StyledTableCell style={{ backgroundColor: 'salmon', color: 'white' }}
                                        key={column.id}
                                        align={column.align}
                                    >
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                rows.length > 0 ?
                                    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        return (
                                            <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <StyledTableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </StyledTableCell>
                                                    );
                                                })}
                                            </StyledTableRow>
                                        );
                                    })
                                    :

                                    <StyledTableRow role="checkbox" tabIndex={-1} >
                                        <StyledTableCell colSpan="4" style={{ textAlign: 'center' }}>
                                            No record available
                                        </StyledTableCell>
                                    </StyledTableRow>

                            }

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination    
                    key={page}                
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </section>
    );
}