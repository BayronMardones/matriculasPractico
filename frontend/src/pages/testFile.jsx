import Button from '@mui/material/Button';
import ButtonAppBar from '../components/appBar.jsx';
import MatriculaEdit from '../components/matriculaComponent/matriculaEdit.jsx';
import MatriculaList from '../components/matriculaComponent/matriculaList.jsx';

const TestFile = () => {
  return (
    <div>
      <ButtonAppBar />
      <MatriculaList />
      <div style={styles.centered}>
        <h1>Pagina de Pruebas</h1>
        <Button>alerta</Button>
        <MatriculaEdit />
      </div>
    </div>

  );
};

const styles = {
  centered: {
    display: 'grid',
    placeItems: 'center',
    // height: '100vh', 
    color: 'red',
  },
};

export default TestFile