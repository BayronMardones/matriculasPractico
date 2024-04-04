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
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>NOMBRE</TableCell>
                        <TableCell align="right">APELLIDO PATERNO</TableCell>
                        <TableCell align="right">APELLIDO MATERNO</TableCell>
                        <TableCell align="right">RUT</TableCell>
                        <TableCell align="right">TELEFONOS</TableCell>
                        <TableCell align="right">EMAIL</TableCell>
                        <TableCell align="right">CODIGO</TableCell>
                        <TableCell align="right">APODERADO</TableCell>
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
                            <TableCell align="right">{student.apellidoPaterno}</TableCell>
                            <TableCell align="right">{student.apellidoMaterno}</TableCell>
                            <TableCell align="right">{student.rut}</TableCell>
                            <TableCell align="right">{student.telefonos}</TableCell>
                            <TableCell align="right">{student.email}</TableCell>
                            <TableCell align="right">{student.codigo}</TableCell>
                            <TableCell align="right">{student.IdApoderado}</TableCell>
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
            apellidoPaterno: PropTypes.string,
            apellidoMaterno: PropTypes.string,
            rut: PropTypes.string,
            email: PropTypes.string,
            codigo: PropTypes.string,
            IdApoderado: PropTypes.string,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default StudentList;