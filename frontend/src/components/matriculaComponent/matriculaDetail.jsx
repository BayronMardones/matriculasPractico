import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import PDFButton from './PDFButton';
import CustomizedSnackbars from '../CustomizedSnackbars';


const apiUrl = import.meta.env.VITE_API_URL;
// ${apiUrl}/matriculas/getMatricula/:id

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#D7DADE',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const estiloH2 = {
  color: "black",
};

//recibo id de matricula para buscar sus datos individuales

const MatriculaDetail = ({ matricula }) => {
  //funciones para abrir y cerrar modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //datos a mostrar en el modal
  const [matriculaData, setMatriculaData] = React.useState({});
  const [studentData, setStudentData] = React.useState({});
  const [cursoData, setCursoData] = React.useState({});
  const [cursos, setCursos] = React.useState([]);

  //boton para permitir escritura en los campos
  const [isReadOnly, setIsReadOnly] = React.useState(true);

  // Estados para el Snackbar
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

  // Función para manejar el cierre del Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  //hacer que fectchMatricula guarde los datos de la matricula en un estado para mostrarlos en el modal
  React.useEffect(() => {
    const fetchMatricula = async (id) => {
      try {
        const response = await fetch(`${apiUrl}/matriculas/getMatricula/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        setMatriculaData(result);
        fetchStudent(result.IdStudent);
        fetchCurso(result.IdCurso);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMatricula(matricula._id);
  }, [matricula._id]);

  //busqueda de cursos para seleccionar en la matricula
  React.useEffect(() => {
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
    fetchCursos();
  }, []);

  //hacer que fectchStudent guarde los datos del estudiante en un estado para mostrarlos en el modal
  const fetchStudent = async (idStudent) => {
    try {
      const response = await fetch(`${apiUrl}/students/getStudent/${idStudent}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      console.log(result);
      setStudentData(result);
    }
    catch (error) {
      console.log(error);
    }
  }

  //hacer que fectchCurso guarde los datos del curso en un estado para mostrarlos en el modal
  const fetchCurso = async (idCurso) => {
    try {
      const response = await fetch(`${apiUrl}/cursos/getCurso/${idCurso}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      console.log(result);
      setCursoData(result);
    }
    catch (error) {
      console.log(error);
    }
  }
  //permite escribir en campos
  const toggleReadOnly = () => {
    setIsReadOnly(!isReadOnly);
  };

  //guardar datos de los campos modificados
  const handleInputChange = (event, formType) => {
    const { name, value } = event.target;
    if (formType === 'student') {
      setStudentData(prevData => ({
        ...prevData,
        [name]: value
      }));
    } else if (formType === 'matricula') {
      setMatriculaData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      //actualizar student
      const responseStudent = await fetch(`${apiUrl}/students/${studentData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
      });
      if (!responseStudent.ok) {
        throw new Error('Error al actualizar el estudiante');
      }

      //actualizar matricula
      const response = await fetch(`${apiUrl}/matriculas/${matricula._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(matriculaData)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la matricula');
      }

      const result = await response.json();
      setSnackbarMessage('Matrícula actualizada correctamente');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      toggleReadOnly();
      console.log(result);
    } catch (error) {
      setSnackbarMessage('Error al actualizar la matrícula');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.log(error);
    }
  };

  return (
    <div>
      <Button variant="contained" size="small" onClick={handleOpen}>VER</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={estiloH2}>
            Detalle de Matricula
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <h2 style={estiloH2}>Estudiante</h2>
              <TextField
                name='rut'
                label="RUT"
                value={studentData.rut || ""}
                variant="standard"
                InputProps={{ readOnly: isReadOnly, }}
                onChange={(e) => handleInputChange(e, 'student')}
              />
              <TextField
                name='nombres'
                label="Nombres"
                value={studentData.nombres || ""}
                variant="standard"
                InputProps={{ readOnly: isReadOnly, }}
                onChange={(e) => handleInputChange(e, 'student')}
              />
              <TextField
                name='apellidoPaterno'
                label="Apellido Paterno"
                value={studentData.apellidoPaterno || ""}
                variant="standard"
                InputProps={{ readOnly: isReadOnly, }}
                onChange={(e) => handleInputChange(e, 'student')}
              />
              <TextField
                name='apellidoMaterno'
                label="Apellido Materno"
                value={studentData.apellidoMaterno || ""}
                variant="standard"
                InputProps={{ readOnly: isReadOnly, }}
                onChange={(e) => handleInputChange(e, 'student')}
              />
              <TextField
                name="telefonos"
                label="Telefonos"
                value={studentData.telefonos || ""}
                variant="standard"
                InputProps={{ readOnly: isReadOnly }}
                onChange={(e) => handleInputChange(e, 'student')}
              />
              <TextField
                name="email"
                label="Email"
                value={studentData.email || ""}
                variant="standard"
                InputProps={{ readOnly: isReadOnly }}
                onChange={(e) => handleInputChange(e, 'student')}
              />
              <TextField
                name="IdCurso"
                select
                label="Curso"
                value={matriculaData.IdCurso || ""}
                onChange={(e) => handleInputChange(e, 'matricula')}
                variant="standard"
                InputProps={{ readOnly: isReadOnly }}
              >
                {cursos.map((curso) => (
                  <MenuItem key={curso._id} value={curso._id}>
                    {curso.nombreCurso}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                name="horario"
                label="Horario"
                value={matriculaData.horario || ""}
                variant="standard"
                InputProps={{ readOnly: isReadOnly, }}
                onChange={(e) => handleInputChange(e, 'matricula')}
              />
              <TextField
                name="trimestre"
                label="Trimestre"
                value={matriculaData.trimestre || ""}
                variant="standard"
                InputProps={{ readOnly: isReadOnly, }}
                onChange={(e) => handleInputChange(e, 'matricula')}
              />
            </Grid>
            <Grid item xs={6}>
              <h2 style={estiloH2}>Apoderado</h2>
              <TextField
                name="nombresApoderado"
                label="Nombres Apoderado"
                value={studentData.nombresApoderado || ""}
                variant="standard"
                InputProps={{ readOnly: isReadOnly }}
                onChange={(e) => handleInputChange(e, 'student')}
              />
              <TextField
                name="telefonosApoderado"
                label="Telefonos Apoderado"
                value={studentData.telefonosApoderado || ""}
                variant="standard"
                InputProps={{ readOnly: isReadOnly }}
                onChange={(e) => handleInputChange(e, 'student')}
              />

              <TextField
                name="emailApoderado"
                label="Email Apoderado"
                value={studentData.emailApoderado || ""}
                variant="standard"
                InputProps={{ readOnly: isReadOnly }}
                onChange={(e) => handleInputChange(e, 'student')}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button variant="contained" onClick={toggleReadOnly}>
                    {isReadOnly ? "Modificar" : "Cancelar"}
                  </Button>
                </Grid>
                <Grid item>
                  {!isReadOnly && (
                    <Button variant="contained" color="success" sx={{ ml: 2 }} onClick={handleUpdate}>
                      Guardar cambios
                    </Button>
                  )}
                </Grid>
                {isReadOnly && (
                  <Grid item>
                    <PDFButton student={studentData} matricula={matricula} curso={cursoData} />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <CustomizedSnackbars
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </div>
  );
}

export default MatriculaDetail;

MatriculaDetail.propTypes = {
  matricula: PropTypes.object.isRequired,
};
