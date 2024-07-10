import CursoList from '../../components/cursoComponent/cursoList';
import ButtonAppBar from '../../components/appBar';
//http://localhost:3000/api/cursos/getCursos
// http://localhost:3000/api/cursos/createCurso
const CursoPage = () => {

    return (
        <div>
            <ButtonAppBar/>
            <h2>Lista de Cursos</h2>

            <CursoList/>
        </div>
    )
}

export default CursoPage