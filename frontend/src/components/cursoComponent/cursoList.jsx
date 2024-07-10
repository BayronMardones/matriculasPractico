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
    const { cursos, addCurso, deleteCurso, editCurso, snackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        handleCloseSnackbar } = useCursoService();
    const [cursoName, setCursoName] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [cursoToDelete, setCursoToDelete] = useState(null);

    // estados para editar curso
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [cursoToEdit, setCursoToEdit] = useState(null);
    const [editCursoName, setEditCursoName] = useState('');

    const handleOpenEditDialog = (curso) => {
        setCursoToEdit(curso);
        setEditCursoName(curso.nombreCurso);
        setOpenEditDialog(true);
    };

    const handleEditCurso = async () => {
        if (!editCursoName.trim()) {
            // Opcional: Mostrar un mensaje de error indicando que el nombre no puede estar vacío.
            return;
        }
        try {
            await editCurso(cursoToEdit._id, { nombreCurso: editCursoName });
            console.log('Curso editado con éxito');
        } catch (error) {
            console.log(error);
        }
    };


    const handleInputChange = (event) => {
        const { value } = event.target;
        // Permite solo letras (mayúsculas y minúsculas) y espacios, y limita a 20 caracteres
        if (/^[a-zA-Z\s]*$/.test(value) && value.length <= 20) {
            setCursoName(value);
        }
    };

    const handleSubmit = async () => {
        if (!cursoName) return;
        try {
            await addCurso({ nombreCurso: cursoName });
        } catch (error) {
            console.log(error);
        }
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
        } catch (error) {
            console.log(error);
        }
        setOpenDialog(false);
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
            <TableContainer component={Paper} sx={{ maxHeight: '300px', backgroundColor: "#1E3E66" }}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table" stickyHeader>
                    <TableHead sx={{
                        '.MuiTableCell-head': {
                            color: 'white',
                            backgroundColor: '#05172E', // Asegúrate de que esto se aplique correctamente
                        },
                    }}>
                        <TableRow>
                            <TableCell>Curso</TableCell>
                            <TableCell>Acciones</TableCell>
                            <TableCell>Matriculas Por Curso</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{
                        // Aplica estilos a todas las TableCell dentro de TableBody
                        '.MuiTableCell-body': { color: 'white' },
                    }}>
                        {cursos.map((curso) => (
                            <TableRow
                                key={curso._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {curso.nombreCurso}
                                </TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => handleOpenEditDialog(curso)}>Editar</Button>
                                    <Button color="error" onClick={() => handleOpenDialog(curso._id)}>Eliminar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>{"Editar Curso"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ingresa el nuevo nombre para el curso.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre del Curso"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={editCursoName}
                        onChange={(e) => setEditCursoName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
                    <Button onClick={handleEditCurso}>Guardar Cambios</Button>
                </DialogActions>
            </Dialog>
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
            <CustomizedSnackbars
                open={snackbarOpen}
                handleClose={handleCloseSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
        </>
    );
}

export default CursoList;