import { useState, useEffect } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

export const useMatriculas = () => {
    const [matriculas, setMatriculas] = useState([]);
    // Definir estados para Snackbar
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        const fetchMatriculas = async () => {
            try {
                const response = await fetch(`${apiUrl}/matriculas/getMatriculas/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                setMatriculas(result);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMatriculas();
    }, []);

    const deleteMatriculaAndStudent = async (matriculaId, studentId) => {
        try {
            // Eliminar la matrícula
            const responseMatricula = await fetch(`${apiUrl}/matriculas/deleteMatricula/${matriculaId}`, {
                method: 'DELETE'
            });
            if (responseMatricula.ok) {
                console.log('Matrícula eliminada con éxito');

                // Eliminar el estudiante
                const responseStudent = await fetch(`${apiUrl}/students/deleteStudent/${studentId}`, {
                    method: 'DELETE'
                });
                if (responseStudent.ok) {
                    console.log('Estudiante eliminado con éxito');
                    setSnackbarMessage("Matrícula eliminada con éxito");
                    setSnackbarSeverity("success");
                    setSnackbarOpen(true);

                    // Opcional: Actualizar el estado local para reflejar la eliminación
                    setMatriculas(prevMatriculas => prevMatriculas.filter(matricula => matricula._id !== matriculaId));
                } else {
                    console.error('Error al eliminar el estudiante');
                    setSnackbarMessage("Error al eliminar el estudiante");
                    setSnackbarSeverity("error");
                    setSnackbarOpen(true);
                }
            } else {
                console.error('Error al eliminar la matrícula');
                setSnackbarMessage("Error al eliminar la matrícula");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error al eliminar matrícula y estudiante', error);
            setSnackbarMessage("Error al eliminar matrícula y estudiante");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => setSnackbarOpen(false);

    return { matriculas, setMatriculas, deleteMatriculaAndStudent, snackbarMessage, snackbarSeverity, snackbarOpen, handleCloseSnackbar };
};