import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

const MatriculaList = () => {

    const [matriculas, setMatriculas] = useState([]);
    
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
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMatriculas();
    }, []);
    
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
                <TableBody>
                    {matriculas.map((matricula) => (
                        <TableRow
                            key={matricula._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {matricula._id}
                            </TableCell>
                            <TableCell align="right">{matricula.horario}</TableCell>
                            <TableCell align="right">{matricula.trimestre}</TableCell>
                            <TableCell align="right">{matricula.fechaIngreso}</TableCell>
                            <TableCell align="right">{matricula.IdStudent}</TableCell>
                            <TableCell align="right">{matricula.IdCurso}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MatriculaList;