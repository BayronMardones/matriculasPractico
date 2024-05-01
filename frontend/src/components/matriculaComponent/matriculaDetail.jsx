import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const apiUrl = import.meta.env.VITE_API_URL;
// ${apiUrl}/matriculas/getMatricula/:id

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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
  },[ matricula._id]);

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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Datos de matricula {matriculaData.IdStudent}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Datos de matricula ID {matricula._id}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Datos de estudiante {studentData.nombres}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Datos de curso {cursoData.nombreCurso}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil ipsam, suscipit eius quibusdam quod iste ut sapiente itaque odit laboriosam molestias autem, voluptatum perferendis, nesciunt atque totam. Fugit, modi totam.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default MatriculaDetail;