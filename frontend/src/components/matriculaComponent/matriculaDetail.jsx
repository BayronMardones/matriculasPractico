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

const MatriculaDetail = ({id}) => {
  //funciones para abrir y cerrar modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchMatricula = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/matriculas/getMatricula/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
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
            Text in a modal {id}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Button onClick={() => fetchMatricula(id)}>mostrar id matricula</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default MatriculaDetail;