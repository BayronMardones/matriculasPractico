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

const apiUrl = import.meta.env.VITE_API_URL;

// http://localhost:3000/api/students/getStudents/

const MatriculaList = () => {

    const [matriculas, setMatriculas] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [cursoData, setCursoData] = useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        const fetchMatriculas = async () => {
            try {
                const response = await fetch(`${apiUrl}/matriculas/getMatriculas/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                setMatriculas(result);

                //obtener datos de estudiantes por su Id
                const studentId = [...new Set(result.map(matricula => matricula.IdStudent))];
                studentId.forEach(id => fetchStudents(id));

                //obtener datos de cursos por su Id
                const cursoId = [...new Set(result.map(matricula => matricula.IdCurso))];
                cursoId.forEach(id => fetchCursos(id));

                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMatriculas();
    }, []);

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
        <TableContainer component={Paper} sx={{ maxHeight: '300px', backgroundColor: "#D7DADE" }}>
            <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>MATRICULA</TableCell>
                        <TableCell align="right">Nombre Estudiante</TableCell>
                        <TableCell align="right">RUT</TableCell>
                        <TableCell align="right">Telefono</TableCell>
                        <TableCell align="right">Correo</TableCell>
                        <TableCell align="right">Curso</TableCell>
                        <TableCell align="right">Horario</TableCell>
                        <TableCell align="right">Fecha De Inscripcion</TableCell>
                        <TableCell align="right">Detalles</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {matriculas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((matricula) => (
                        <TableRow
                            key={matricula._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {matricula._id}
                            </TableCell>
                            <TableCell align="inherit">{studentData[matricula.IdStudent]?.nombres || "-"}</TableCell>
                            <TableCell align="right">{studentData[matricula.IdStudent]?.rut || "-"}</TableCell>
                            <TableCell align="right">{studentData[matricula.IdStudent]?.telefonos || "-"}</TableCell>
                            <TableCell align="right">{studentData[matricula.IdStudent]?.email}</TableCell>
                            <TableCell align="right">{cursoData[matricula.IdCurso]?.nombreCurso}</TableCell>
                            <TableCell align="right">{matricula.horario || "-"}</TableCell>
                            <TableCell align="right">{matricula.fechaInscripcion || "-"}</TableCell>
                            <TableCell>
                                <MatriculaDetail matricula={matricula} />
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
                />
        </TableContainer>
    );
}

export default MatriculaList;