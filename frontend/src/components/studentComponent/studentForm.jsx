import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

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
                    name="apellidoPaterno"
                    value={newStudent.apellidoPaterno}
                    required
                    id="outlined-required"
                    label="Apellido Paterno"
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <TextField
                    name="apellidoMaterno"
                    value={newStudent.apellidoMaterno}
                    required
                    id="outlined-required"
                    label="Apellido Materno"
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
                <Button type='submit' variant="outlined">CREAR</Button>
            </Box>
        </Box>
    );
}

//validacion de props
StudentForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    newStudent: PropTypes.shape({
        nombres: PropTypes.string.isRequired,
        apellidoPaterno: PropTypes.string.isRequired,
        apellidoMaterno: PropTypes.string.isRequired,
        rut: PropTypes.string.isRequired,
        telefonos: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        codigo: PropTypes.string.isRequired,
        IdApoderado: PropTypes.string.isRequired,
    }).isRequired,
};

export default StudentForm;