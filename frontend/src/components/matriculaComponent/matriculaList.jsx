import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const MatriculaList = () => {
    return (
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>MATRICULA</TableCell>
                        <TableCell align="right">horario</TableCell>
                        <TableCell align="right">trimestre</TableCell>
                        <TableCell align="right">fechaIngreso</TableCell>
                        <TableCell align="right">IdStudent</TableCell>
                        <TableCell align="right">IdCurso</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
    );
}

export default MatriculaList;