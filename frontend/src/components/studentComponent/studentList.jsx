import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import PropTypes from 'prop-types';

const StudentList = ({ students, onDelete }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>NOMBRE</TableCell>
                        <TableCell align="right">APELLIDO</TableCell>
                        <TableCell align="right">APODO</TableCell>
                        <TableCell align="right">FECHA NACIMIENTO</TableCell>
                        <TableCell align="right">RUT</TableCell>
                        <TableCell align="right">EMAIL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student) => (
                        <TableRow
                            key={student._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {student.nombres}
                            </TableCell>
                            <TableCell align="right">{student.apellidos}</TableCell>
                            <TableCell align="right">{student.apodo}</TableCell>
                            <TableCell align="right">{student.fechaNacimiento}</TableCell>
                            <TableCell align="right">{student.rut}</TableCell>
                            <TableCell align="right">{student.email}</TableCell>
                            <TableCell>
                            <button onClick={() => onDelete(student._id)}>Eliminar</button>
                            </TableCell>
                        </TableRow>     
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

//validacion de props

StudentList.propTypes = {
    students: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            nombres: PropTypes.string.isRequired,
            apellidos: PropTypes.string,
            apodo: PropTypes.string,
            fechaNacimiento: PropTypes.string,
            rut: PropTypes.string,
            email: PropTypes.string,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default StudentList;