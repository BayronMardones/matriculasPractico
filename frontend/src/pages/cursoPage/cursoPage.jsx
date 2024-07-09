import React from 'react'
import CursoList from '../../components/cursoComponent/cursoList';
//http://localhost:3000/api/cursos/getCursos
// http://localhost:3000/api/cursos/createCurso
const CursoPage = () => {
    return (
        <div>
            <h2>Lista de Cursos</h2>
            <CursoList/>
        </div>
    )
}

export default CursoPage