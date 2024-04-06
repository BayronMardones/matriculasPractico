import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const MatriculaForm = ({handleSubmit, handleInputChange, newMatricula, newStudent}) => {
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
                    name="trimestre"
                    value={newMatricula.trimestre}
                    required
                    id="outlined-required"
                    label="trimestre"
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <TextField
                    name="nombres"
                    value={newStudent.nombres}
                    required
                    id="outlined-required"
                    label="Nombres"
                    onChange={(e) => handleInputChange(e, 'newStudent')}
                />
            </div>
            <div>
                <TextField
                    name="apellidoPaterno"
                    value={newStudent.apellidoPaterno}
                    required
                    id="outlined-required"
                    label="Apellido Paterno"
                    onChange={(e) => handleInputChange(e, 'newStudent')}
                />
            </div>
            <div>
                <TextField
                    name="apellidoMaterno"
                    value={newStudent.apellidoMaterno}
                    required
                    id="outlined-required"
                    label="Apellido Materno"
                    onChange={(e) => handleInputChange(e, 'newStudent')}
                />
            </div>
            <Box textAlign={'center'}>
                <Button type='submit' variant="outlined">CREAR</Button>
            </Box>
        </Box>
    );
}

export default MatriculaForm;