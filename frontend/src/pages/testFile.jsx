import React from 'react'
import Button from '@mui/material/Button';

const TestFile = () => {
    return (
      <div style={styles.centered}>
        <h1>testFile probando texto jajajajaj</h1>
        <Button>alerta</Button>
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