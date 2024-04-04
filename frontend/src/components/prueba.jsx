import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="outlined" component={Link} to="http://localhost:5173/studentPage">Pagina de estudiantes</Button>
    </Stack>
  );
}