import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const StudentForm = ({handleSubmit, handleInputChange, newStudent}) => {
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                '& .MuiTextField-root': { m: 1, width: '90%' },
                backgroundColor: 'white',
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    name="nombres"
                    value={newStudent.nombres}
                    required
                    id="outlined-required"
                    label="Nombres"
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <TextField
                    name="apellidos"
                    value={newStudent.apellidos}
                    required
                    id="outlined-required"
                    label="Apellidos"
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <TextField
                    id="outlined-helperText"
                    label="nada XD"
                    defaultValue="HOLA HEEHEE"
                    helperText="Some important text"
                />

            </div>
            <Box textAlign={'center'}>
                <Button type='submit' variant="outlined">Outlined</Button>
            </Box>
        </Box>
    );
}

export default StudentForm;