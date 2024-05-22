import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const apiUrl = import.meta.env.VITE_API_URL;
// http://localhost:3000/api/matriculas/:id

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const idMatricula = "66123d5deaf9a827a30c8afb";

const MatriculaEdit = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [horario, setHorario] = React.useState('');

    const [isReadOnly, setIsReadOnly] = React.useState(true);

    const handleInputChange = (e) => {
        setHorario(e.target.value);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/matriculas/${idMatricula}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    horario: horario
                })
            });
            const result = await response.json();
            alert('Matricula actualizada');
            console.log(result);
        } catch (error) {
            alert('Error al actualizar la matricula');
            console.log(error);
        }
    };

    const toggleReadOnly = () => {
        setIsReadOnly(!isReadOnly);
    };


    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>modificar Horario</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Editar Matricula horario
                    </Typography>
                    <TextField
                        name='horario'
                        label="Horario"
                        value={horario}
                        fullWidth
                        onChange={handleInputChange}
                        margin="normal"
                        variant="filled"
                        defaultValue="defecto"
                        InputProps={
                            {
                                readOnly: isReadOnly,
                            }
                        }
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="Read Only"
                        defaultValue="Hello World"
                        InputProps={{
                            readOnly: false,
                        }}
                        variant="filled"
                    />
                    <Button variant="contained" onClick={handleUpdate}>Guardar cambios</Button>
                    <Button variant="contained" onClick={toggleReadOnly}>
                        {isReadOnly ? "Modificar" : "Cancelar"}
                    </Button>
                    {!isReadOnly && (
                        <Button variant="contained" onClick={handleUpdate} sx={{ ml: 2 }}>
                            Guardar cambios
                        </Button>
                    )}
                </Box>
            </Modal>
        </div>
    );
}

export default MatriculaEdit;