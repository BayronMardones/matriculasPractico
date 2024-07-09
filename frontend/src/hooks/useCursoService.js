import { useState, useEffect } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

const useCursoService = () => {
    const [cursos, setCursos] = useState([]);

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
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCurso = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/cursos/deleteCurso/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await fetchCursos(); // Recargar la lista de cursos después de eliminar
        } catch (error) {
            console.log(error);
        }
    };

    return { cursos, addCurso, deleteCurso };
};

export default useCursoService;