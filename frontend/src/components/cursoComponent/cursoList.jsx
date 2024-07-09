import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useCursoService from '../../hooks/useCursoService';
import CustomizedSnackbars from '../CustomizedSnackbars';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

const CursoList = () => {
    const { cursos, addCurso, deleteCurso } = useCursoService();
    const [cursoName, setCursoName] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [openDialog, setOpenDialog] = useState(false);
    const [cursoToDelete, setCursoToDelete] = useState(null);


    const handleInputChange = (event) => {
        setCursoName(event.target.value);
    };

    const handleSubmit = async () => {
        if (!cursoName) return;
        try {
            await addCurso({ nombreCurso: cursoName });
            setSnackbarMessage('Curso agregado con éxito');
            setSnackbarSeverity('success');
        } catch (error) {
            setSnackbarMessage('Error al agregar el curso');
            setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
        setCursoName(''); // Limpiar el campo después de agregar
    };

    const handleOpenDialog = (id) => {
        setOpenDialog(true);
        setCursoToDelete(id);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteCurso(cursoToDelete);
            setSnackbarMessage('Curso eliminado con éxito');
            setSnackbarSeverity('success');
        } catch (error) {
            setSnackbarMessage('Error al eliminar el curso');
            setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
        setOpenDialog(false);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#1E3E66',
                    padding: '16px',
                    borderRadius: '4px',
                }}
            >
                <TextField
                    label="AGREGAR NUEVO CURSO"
                    variant="outlined"
                    value={cursoName}
                    onChange={handleInputChange}
                    style={{ marginRight: '8px' }}
                    size="small"
                    sx={{
                        width: 250,
                        backgroundColor: '#05172E',
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Cambia el color del borde
                        },
                        '& .MuiSvgIcon-root': {
                            color: 'white', // Cambia el color del ícono (flecha hacia abajo)
                        },
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root': { color: '#F2F8FF' },
                    }}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!cursoName.trim()}>
                    Agregar Curso Nuevo
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Curso</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cursos.map((curso) => (
                            <TableRow
                                key={curso._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {curso.nombreCurso}
                                </TableCell>
                                <TableCell>
                                    <Button color="error" onClick={() => handleOpenDialog(curso._id)}>Eliminar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomizedSnackbars
                open={snackbarOpen}
                handleClose={handleCloseSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
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
                        ¿Estás seguro de que quieres eliminar este curso? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CursoList;