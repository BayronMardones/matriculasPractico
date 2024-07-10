import { useState, useEffect } from 'react';
import { useMatriculas } from './useMatriculas';

const apiUrl = import.meta.env.VITE_API_URL;

const useCursoService = () => {
    const [cursos, setCursos] = useState([]);
    const { matriculas } = useMatriculas();
    // Estados para Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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
    };

    const addCurso = async (cursoData) => {
        try {
            const response = await fetch(`${apiUrl}/cursos/createCurso`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cursoData)

            });
            await fetchCursos(); // Recargar la lista de cursos después de agregar
            setSnackbarOpen(true);
            setSnackbarMessage('Curso agregado con éxito');
            setSnackbarSeverity('success');
        } catch (error) {
            console.log(error);
            setSnackbarOpen(true);
            setSnackbarMessage('Error al agregar el curso');
            setSnackbarSeverity('error');
        }
    };

    const deleteCurso = async (id) => {
        // Verificar si alguna matrícula contiene el ID del curso a eliminar
        const cursoTieneMatriculas = matriculas.some(matricula => matricula.IdCurso === id);
        if (cursoTieneMatriculas) {
            // Actualizar el estado para mostrar un mensaje indicando que el curso no se puede eliminar
            setSnackbarOpen(true);
            setSnackbarMessage('El curso no se puede eliminar porque tiene matrículas asociadas');
            setSnackbarSeverity('error');
            return; // Detener la ejecución si hay matrículas asociadas
        }
        try {
            const response = await fetch(`${apiUrl}/cursos/deleteCurso/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                setSnackbarOpen(true);
                setSnackbarMessage('Curso eliminado con éxito');
                setSnackbarSeverity('success');
                await fetchCursos(); // Recargar la lista de cursos después de eliminar
            } else {
                throw new Error('Error al eliminar el curso');
            } // Recargar la lista de cursos después de eliminar
        } catch (error) {
            console.log(error);
            setSnackbarOpen(true);
            setSnackbarMessage('Error al eliminar el curso');
            setSnackbarSeverity('error');
        }
    };

    const editCurso = async (id, cursoData) => {
        try {
            const response = await fetch(`${apiUrl}/cursos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cursoData)
            });
            await fetchCursos(); // Recargar la lista de cursos después de editar
            setSnackbarOpen(true);
            setSnackbarMessage('Curso editado con éxito');
            setSnackbarSeverity('success');
        } catch (error) {
            console.log(error);
            setSnackbarOpen(true);
            setSnackbarMessage('Error al editar el curso');
            setSnackbarSeverity('error');
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return { cursos, addCurso, deleteCurso, editCurso, snackbarOpen, snackbarMessage, snackbarSeverity, handleCloseSnackbar };
};

export default useCursoService;