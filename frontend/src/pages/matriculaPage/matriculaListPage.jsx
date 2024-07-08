import MatriculaList from '../../components/matriculaComponent/matriculaList.jsx';
import { useMatriculas } from '../../hooks/useMatriculas.js';
import CustomizedSnackbars from '../../components/CustomizedSnackbars.jsx';
import ButtonAppBar from "../../components/appBar.jsx";
import Typography from '@mui/material/Typography';

const MatriculaListPage = () => {
    const { matriculas, deleteMatriculaAndStudent, snackbarMessage, snackbarSeverity, snackbarOpen, handleCloseSnackbar } = useMatriculas();
    return (
        <div>
            <ButtonAppBar />
            <Typography variant="h2" gutterBottom>
                Listado De Matriculas
            </Typography>
            <MatriculaList matriculas={matriculas} deleteMatriculaAndStudent={deleteMatriculaAndStudent} />
            <CustomizedSnackbars
                message={snackbarMessage}
                severity={snackbarSeverity}
                open={snackbarOpen}
                handleClose={handleCloseSnackbar}
            />
        </div>
    );
};

export default MatriculaListPage;