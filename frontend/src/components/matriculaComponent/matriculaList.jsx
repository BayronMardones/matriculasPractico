import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useEffect, useState } from "react";
import MatriculaDetail from './matriculaDetail';
import * as React from 'react';
import propTypes from 'prop-types';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

//Dialogo que permite la eliminaicon en dos pasos
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const apiUrl = import.meta.env.VITE_API_URL;

const MatriculaList = ({ matriculas, deleteMatriculaAndStudent }) => {

    // Estados existentes...
    const [filtroTrimestre, setFiltroTrimestre] = useState('Todas'); // Paso 1: Estado para el filtro
    
    // const [matriculas, setMatriculas] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [cursoData, setCursoData] = useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedMatricula, setSelectedMatricula] = React.useState({ idMatricula: '', idStudent: '' });

    const handleClickOpen = (idMatricula, idStudent) => {
        setSelectedMatricula({ idMatricula, idStudent });
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleConfirmDelete = () => {
        const { idMatricula, idStudent } = selectedMatricula;
        deleteMatriculaAndStudent(idMatricula, idStudent);
        setOpenDialog(false);
    };


    // Función para filtrar las matrículas
    const filtrarMatriculas = () => {
        switch (filtroTrimestre) {
            case 'Verano':
            case 'Primero':
            case 'Segundo':
            case 'Tercero':
                return matriculas.filter(matricula => matricula.trimestre === filtroTrimestre);
            case 'Todas':
            default:
                return matriculas;
        }
    };

    // useEffect(() => {
    //     const fetchMatriculas = async () => {
    //         try {
    //             const response = await fetch(`${apiUrl}/matriculas/getMatriculas/`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             });
    //             const result = await response.json();
    //             setMatriculas(result);

    //             //obtener datos de estudiantes por su Id
    //             const studentId = [...new Set(result.map(matricula => matricula.IdStudent))];
    //             studentId.forEach(id => fetchStudents(id));

    //             //obtener datos de cursos por su Id
    //             const cursoId = [...new Set(result.map(matricula => matricula.IdCurso))];
    //             cursoId.forEach(id => fetchCursos(id));

    //             console.log(result);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchMatriculas();
    // }, []);

    useEffect(() => {
        //obtener datos de estudiantes por su Id
        const studentId = [...new Set(matriculas.map(matricula => matricula.IdStudent))];
        studentId.forEach(id => fetchStudents(id));

        //obtener datos de cursos por su Id
        const cursoId = [...new Set(matriculas.map(matricula => matricula.IdCurso))];
        cursoId.forEach(id => fetchCursos(id));
    }, [matriculas]);

    const fetchStudents = async (idStudent) => {
        try {
            const response = await fetch(`${apiUrl}/students/getStudent/${idStudent}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            console.log(result);
            setStudentData(prevStudentData => ({ ...prevStudentData, [idStudent]: result }));
        }
        catch (error) {
            console.log(error);

        }
    }

    const fetchCursos = async (idCurso) => {
        try {
            const response = await fetch(`${apiUrl}/cursos/getCurso/${idCurso}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            console.log(result);
            setCursoData(prevCursoData => ({ ...prevCursoData, [idCurso]: result }));
        }
        catch (error) {
            console.log(error);

        }
    }

    return (
        <>
            <Box display="flex" alignItems="center" gap={1} sx={{ backgroundColor: '#1E3E66' }}> 
                <Typography variant="body1">Filtrar por Trimestre:</Typography> 
                <Select //Selector de filtro
                    value={filtroTrimestre}
                    onChange={(e) => setFiltroTrimestre(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    size="small" 
                    sx={{
                        width: 120,
                        color: 'white', // Cambia el color del texto del input
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Cambia el color del borde
                        },
                        '& .MuiSvgIcon-root': {
                            color: 'white', // Cambia el color del ícono (flecha hacia abajo)
                        }
                    }}
                >
                    <MenuItem value="Todas">Todas</MenuItem>
                    <MenuItem value="Verano">Verano</MenuItem>
                    <MenuItem value="Primero">Primero</MenuItem>
                    <MenuItem value="Segundo">Segundo</MenuItem>
                    <MenuItem value="Tercero">Tercero</MenuItem>
                </Select>
            </Box>

            <TableContainer component={Paper} sx={{ maxHeight: '300px', backgroundColor: "#1E3E66" }}>
                <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table" stickyHeader>
                    <TableHead sx={{
                        '.MuiTableCell-head': {
                            color: 'white',
                            backgroundColor: '#05172E', // Asegúrate de que esto se aplique correctamente
                        },
                    }}>
                        <TableRow>
                            <TableCell>MATRICULA</TableCell>
                            <TableCell align="right">Nombre Estudiante</TableCell>
                            <TableCell align="right">Apellidos</TableCell>
                            <TableCell align="right">Telefono</TableCell>
                            <TableCell align="right">Correo</TableCell>
                            <TableCell align="right">Curso</TableCell>
                            <TableCell align="right">Horario</TableCell>
                            <TableCell align="right">Fecha De Inscripcion</TableCell>
                            <TableCell align="right">Detalles</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{
                        // Aplica estilos a todas las TableCell dentro de TableBody
                        '.MuiTableCell-body': { color: 'white' },
                    }}>
                        {filtrarMatriculas().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((matricula) => (
                            <TableRow
                                key={matricula._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {studentData[matricula.IdStudent]?.rut || "-"}
                                </TableCell>
                                <TableCell align="inherit">{studentData[matricula.IdStudent]?.nombres || "-"}</TableCell>
                                <TableCell align="right">
                                    {`${studentData[matricula.IdStudent]?.apellidoPaterno || ""} ${studentData[matricula.IdStudent]?.apellidoMaterno || ""}`}
                                </TableCell>
                                <TableCell align="right">{studentData[matricula.IdStudent]?.telefonos || "-"}</TableCell>
                                <TableCell align="right">{studentData[matricula.IdStudent]?.email}</TableCell>
                                <TableCell align="right">{cursoData[matricula.IdCurso]?.nombreCurso}</TableCell>
                                <TableCell align="right">{matricula.trimestre || "-"}</TableCell>
                                <TableCell align="right">{matricula.fechaIngreso ? new Date(matricula.fechaIngreso).toLocaleDateString('es-CL') : "-"}</TableCell>
                                <TableCell>
                                    <MatriculaDetail matricula={matricula} />
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" size="small" color="error" onClick={() => handleClickOpen(matricula._id, matricula.IdStudent)}>
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={matriculas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => {
                        setPage(newPage);
                    }}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                    sx={{
                        ".MuiTablePagination-toolbar": {
                            color: "white", // Cambia el color de las letras en la barra de herramientas
                        },
                        ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
                            color: "white", // Cambia el color de las etiquetas y el rango de filas mostradas
                        },
                        ".MuiInputBase-input": {
                            color: "white", // Cambia el color del input (por ejemplo, el selector de número de filas por página)
                        }
                    }}
                />
                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Confirmar eliminación"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ¿Estás seguro de que quieres eliminar esta matrícula? Esta acción no se puede deshacer.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleConfirmDelete} color="error" autoFocus>
                            Eliminar
                        </Button>
                    </DialogActions>
                </Dialog>
            </TableContainer>
        </>
    );
}

export default MatriculaList;

MatriculaList.propTypes = {

    matriculas: propTypes.array.isRequired,
    deleteMatriculaAndStudent: propTypes.func.isRequired
};