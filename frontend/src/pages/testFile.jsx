import React from 'react'
import Button from '@mui/material/Button';
import TemporaryDrawer from '../components/drawer.jsx';
import ButtonAppBar from '../components/appBar.jsx';

const TestFile = () => {
  return (
    <div>
      <ButtonAppBar />
      <div style={styles.centered}>
        <h1>Pagina de Pruebas</h1>
        <Button>alerta</Button>
        <TemporaryDrawer />
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