import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


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
//estilos del textfield
const readOnlyInputProps = {
  readOnly: true,
};

//REVISAR ESTILOS
const textFieldStyle = {
  "& .MuiInputBase-root": {
    color: "warning",
  },
  "& .Mui-focused": {
    color: "error",
  },
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
  const [matriculaData, setMatriculaData] = React.useState([]);
  const [studentData, setStudentData] = React.useState([]);
  const [cursoData, setCursoData] = React.useState([]);

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

  return (
    <div>
      <Button onClick={handleOpen}>Ver Detalles</Button>
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
                id="standard-disabled"
                label="Nombres"
                defaultValue={studentData.nombres ? studentData.nombres : "-"}
                variant="standard"
                InputProps={readOnlyInputProps}
                sx={textFieldStyle}
              />
              <TextField
                id="standard-disabled"
                label="Apellido Paterno"
                defaultValue={studentData.apellidoPaterno ? studentData.apellidoPaterno : "-"}
                variant="standard"
                InputProps={readOnlyInputProps}
              />
              <TextField
                id="standard-disabled"
                label="Apellido Materno"
                defaultValue={studentData.apellidoMaterno ? studentData.apellidoMaterno : "-"}
                variant="standard"
                InputProps={readOnlyInputProps}
              />
              <TextField
                id="standard-disabled"
                label="RUT"
                defaultValue={studentData.rut ? studentData.rut : "-"}
                variant="standard"
                InputProps={readOnlyInputProps}
              />
              <TextField
                id="standard-disabled"
                label="telefonos"
                defaultValue={studentData.telefonos ? studentData.telefonos : "-"}
                variant="standard"
                InputProps={readOnlyInputProps}
              />
              <TextField
                id="standard-disabled"
                label="Email"
                defaultValue={studentData.email ? studentData.email : "-"}
                variant="standard"
                InputProps={readOnlyInputProps}
              />
              <TextField
                id="standard-disabled"
                label="Curso"
                defaultValue={cursoData.nombreCurso ? cursoData.nombreCurso : "-"}
                variant="standard"
                InputProps={readOnlyInputProps}
              />
              <TextField
                id="standard-disabled"
                label="Horario"
                defaultValue={matriculaData.horario ? matriculaData.horario : "-"}
                variant="standard"
                InputProps={readOnlyInputProps}
              />
              <TextField
                id="standard-disabled"
                label="Trimestre"
                defaultValue={matriculaData.trimestre ? matriculaData.trimestre : "-"}
                variant="standard"
                InputProps={readOnlyInputProps}
              />
            </Grid>
            <Grid item xs={6}>
              <h2 style={estiloH2}>Apoderado</h2>
              <TextField
                id="standard-disabled"
                label="Nombres Apoderado"
                defaultValue={studentData.nombresApoderado ? studentData.nombresApoderado : "-"}
                variant="standard"
                InputProps={readOnlyInputProps}
              />
              <TextField
                id="standard-disabled"
                label="Telefonos Apoderado"
                defaultValue={studentData.telefonosApoderado ? studentData.telefonosApoderado : "-"}
                variant="standard"
                InputProps={readOnlyInputProps}
              />

              <TextField
                id="standard-disabled"
                label="Email Apoderado"
                defaultValue={studentData.emailApoderado ? studentData.emailApoderado : "-"}
                variant="standard"
                InputProps={readOnlyInputProps}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button variant="contained" color="primary">Editar Matricula</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary">Imprimir Matricula</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary">Accion extra</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default MatriculaDetail;