import { useState, useEffect } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

const useCursoService = () => {
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
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

        fetchCursos();
    }, []);

    return cursos;
};

export default useCursoService;