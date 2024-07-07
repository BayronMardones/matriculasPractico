import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
const apiUrl = import.meta.env.VITE_API_URL;


const MatriculaForm = ({ handleSubmit, handleInputChange, newMatricula, newStudent }) => {

    //busqueda de cursos para seleccionar en la matricula
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        fetchCursos();
    }, []);

    const fetchCursos = async () => {
        try {
            const response = await fetch(`${apiUrl}/cursos/getCursos/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            setCursos(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h2>Crear Matricula</h2>
            <Grid
                container
                item
                xs={6}
                component="form"
                backgroundColor={'#05172E'}
                onSubmit={handleSubmit}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50%' },
                    '& .MuiOutlinedInput-input': { backgroundColor: '#1E3E66' }, 
                    '& .MuiInputLabel-root': { color: '#F2F8FF' }, 

                }}
                // noValidate
                autoComplete="off"
            >

                <Grid item xs={6} textAlign={'center'}>
                    <h2>DATOS ESTUDIANTE</h2>
                    <TextField
                        name="rut"
                        value={newStudent.rut}
                        required
                        id="outlined-required"
                        label="Rut"
                        placeholder="ej: 12.345.678-9"
                        size='small'
                        onChange={(e) => handleInputChange(e, 'newStudent')}
                        inputProps={{
                            pattern: "\\d{2}\\.\\d{3}\\.\\d{3}-[\\dkK]"
                        }}
                        sx={{
                            '& .MuiInputBase-input::placeholder': { // Aplica el estilo al placeholder
                                color: 'white', // Cambia 'red' por el color deseado
                                opacity: 0.7, // Asegura que el color se vea correctamente
                            }
                        }}
                    />
                    <TextField
                        name="nombres"
                        value={newStudent.nombres}
                        required
                        id="outlined-required"
                        label="Nombres"
                        size='small'
                        onChange={(e) => handleInputChange(e, 'newStudent')}
                        inputProps={{
                            pattern: "^[a-zA-Z\\s]*$"
                        }}
                    />
                    <TextField
                        name="apellidoPaterno"
                        value={newStudent.apellidoPaterno}
                        required
                        id="outlined-required"
                        label="Apellido Paterno"
                        size='small'
                        onChange={(e) => handleInputChange(e, 'newStudent')}
                        inputProps={{
                            pattern: "^[a-zA-Z\\s]*$"
                        }}
                    />
                    <TextField
                        name="apellidoMaterno"
                        value={newStudent.apellidoMaterno}
                        required
                        id="outlined-required"
                        label="Apellido Materno"
                        size='small'
                        onChange={(e) => handleInputChange(e, 'newStudent')}
                        inputProps={{
                            pattern: "^[a-zA-Z\\s]*$"
                        }}
                    />
                    <TextField
                        name="telefonos"
                        value={newStudent.telefonos}

                        id="outlined-required"
                        label="Telefonos"
                        size='small'
                        onChange={(e) => handleInputChange(e, 'newStudent')}
                        inputProps={{
                            pattern: "^[0-9\\s+]*$"
                        }}
                    />
                    <TextField
                        name="email"
                        value={newStudent.email}

                        id="outlined-required"
                        label="Correo Electronico"
                        size='small'
                        onChange={(e) => handleInputChange(e, 'newStudent')}
                        inputProps={{
                            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
                        }}
                    />

                    <TextField
                        name="IdCurso"
                        select
                        label="Curso"
                        value={newMatricula.IdCurso}
                        required
                        onChange={handleInputChange}
                        fullWidth
                    >
                        {cursos.map((curso) => (
                            <MenuItem key={curso._id} value={curso._id}>
                                {curso.nombreCurso}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        name="horario"
                        value={newMatricula.horario}

                        id="outlined-required"
                        label="Horario"
                        size='small'
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="trimestre"
                        select
                        label="Trimestre"
                        value={newMatricula.trimestre || "-"}
                        onChange={handleInputChange}
                        fullWidth
                    >
                        <MenuItem value={"-"}>Seleccione un trimestre</MenuItem>
                        <MenuItem value={"Verano"}>Verano</MenuItem>
                        <MenuItem value={"Primero"}>Primero</MenuItem>
                        <MenuItem value={"Segundo"}>Segundo</MenuItem>
                        <MenuItem value={"Tercero"}>Tercero</MenuItem>
                    </TextField>

                </Grid>
                <Grid item xs={6} textAlign={'center'}>
                    <h2>DATOS APODERADO</h2>
                    <TextField
                        name="nombresApoderado"
                        value={newStudent.nombresApoderado}

                        id="outlined-required"
                        label="Nombres Apoderado"
                        size='small'
                        onChange={(e) => handleInputChange(e, 'newStudent')}
                        inputProps={{
                            pattern: "^[a-zA-Z\\s]*$"
                        }}
                    />
                    <TextField
                        name="apellidosApoderado"
                        value={newStudent.apellidosApoderado}

                        id="outlined-required"
                        label="Apellidos Apoderado"
                        size='small'
                        onChange={(e) => handleInputChange(e, 'newStudent')}
                    />
                    <TextField
                        name="telefonosApoderado"
                        value={newStudent.telefonosApoderado}
                        id="outlined-required"
                        label="Telefonos Apoderado"
                        size='small'
                        onChange={(e) => handleInputChange(e, 'newStudent')}
                    />
                    <TextField
                        name="emailApoderado"
                        value={newStudent.emailApoderado}
                        id="outlined-required"
                        label="Correo Electronico Apoderado"
                        size='small'
                        onChange={(e) => handleInputChange(e, 'newStudent')}
                    />

                </Grid>

                <Grid item textAlign={'center'} xs={12}>
                    <Button type='submit' variant="contained" color="success" size="large">CREAR</Button>
                </Grid>
            </Grid>
        </>

    );
}

//validacion de props
MatriculaForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    newMatricula: PropTypes.shape({
        horario: PropTypes.string.isRequired,
        trimestre: PropTypes.string.isRequired,
        fechaIngreso: PropTypes.string.isRequired,
        IdStudent: PropTypes.string.isRequired,
        IdCurso: PropTypes.string.isRequired
    }),
    newStudent: PropTypes.shape({
        nombres: PropTypes.string.isRequired,
        apellidoPaterno: PropTypes.string.isRequired,
        apellidoMaterno: PropTypes.string.isRequired,
        rut: PropTypes.string.isRequired,
        telefonos: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        codigo: PropTypes.string.isRequired,
        nombresApoderado: PropTypes.string.isRequired,
        apellidosApoderado: PropTypes.string.isRequired,
        telefonosApoderado: PropTypes.string.isRequired,
        emailApoderado: PropTypes.string.isRequired
    })
}

export default MatriculaForm;