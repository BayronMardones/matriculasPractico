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
            <h3>6611a13f6900043ee4fdc66f</h3>
            <Grid
                container
                item
                xs={6}
                component="form"
                backgroundColor={'#D7DADE'}
                onSubmit={handleSubmit}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50%', backgroundColor: 'white' }
                }}
                noValidate
                autoComplete="off"
            >

                <Grid item xs={6} textAlign={'center'}>
                    <h2>DATOS ESTUDIANTE</h2>
                    <TextField
                        name="nombres"
                        value={newStudent.nombres}
                        required
                        id="outlined-required"
                        label="Nombres"
                        size='small'
                        onChange={(e) => handleInputChange(e, 'newStudent')}
                    />
                    <TextField
                        name="apellidoPaterno"
                        value={newStudent.apellidoPaterno}
                        required
                        id="outlined-required"
                        label="Apellido Paterno"
                        size='small'
                        onChange={(e) => handleInputChange(e, 'newStudent')}
                    />
                    <TextField
                        name="apellidoMaterno"
                        value={newStudent.apellidoMaterno}
                        required
                        id="outlined-required"
                        label="Apellido Materno"
                        size='small'
                        onChange={(e) => handleInputChange(e, 'newStudent')}
                    />
                    <TextField
                        name="rut"
                        value={newStudent.rut}
                        required
                        id="outlined-required"
                        label="Rut"
                        size='small'
                        onChange={(e) => handleInputChange(e, 'newStudent')}
                    />
                    <TextField
                        name="telefonos"
                        value={newStudent.telefonos}
                        required
                        id="outlined-required"
                        label="Telefonos"
                        size='small'
                        onChange={(e) => handleInputChange(e, 'newStudent')}
                    />
                    <TextField
                        name="email"
                        value={newStudent.email}
                        required
                        id="outlined-required"
                        label="Correo Electronico"
                        size='small'
                        onChange={(e) => handleInputChange(e, 'newStudent')}
                    />

                    <TextField
                        name="IdCurso"
                        select
                        label="Curso"
                        value={newMatricula.IdCurso}
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
                        required
                        id="outlined-required"
                        label="Horario"
                        size='small'
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="trimestre"
                        value={newMatricula.trimestre}
                        required
                        id="outlined-required"
                        label="Trimestre"
                        size='small'
                        onChange={handleInputChange}
                    />

                </Grid>
                <Grid item xs={6} textAlign={'center'}>
                    <h2>DATOS APODERADO</h2>
                    <TextField
                        name="nombresApoderado"
                        value={newStudent.nombresApoderado}
                        required
                        id="outlined-required"
                        label="Nombres Apoderado"
                        size='small'
                        onChange={(e) => handleInputChange(e, 'newStudent')}
                    />
                    <TextField
                        name="apellidosApoderado"
                        value={newStudent.apellidosApoderado}
                        required
                        id="outlined-required"
                        label="Apellidos Apoderado"
                        size='small'
                        onChange={(e) => handleInputChange(e, 'newStudent')}
                    />
                    <TextField
                        name="telefonosApoderado"
                        value={newStudent.telefonosApoderado}
                        required
                        id="outlined-required"
                        label="Telefonos Apoderado"
                        size='small'
                        onChange={(e) => handleInputChange(e, 'newStudent')}
                    />
                    <TextField
                        name="emailApoderado"
                        value={newStudent.emailApoderado}
                        required
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
            <h2>Crear Matricula</h2>
            <h3>6611a13f6900043ee4fdc66f</h3>
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