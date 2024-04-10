import { useState, useEffect } from "react";
import MatriculaForm from "../../components/matriculaComponent/matriculaForm.jsx";
import MatriculaList from "../../components/matriculaComponent/matriculaList.jsx";
const apiUrl = import.meta.env.VITE_API_URL;

const MatriculaPage = () => {
    const [matriculas, setMatriculas] = useState([]);
    const [newMatricula, setNewMatricula] = useState({
        horario: "",
        trimestre: "",
        fechaIngreso: "",
        IdStudent: "",
        IdCurso: ""
    });
    const [newStudent, setNewStudent] = useState({
        nombres: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        rut: "",
        telefonos: "",
        email: "",
        codigo: "",
        nombresApoderado: "",
        apellidosApoderado: "",
        telefonosApoderado: "",
        emailApoderado: ""
    });

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
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMatriculas();
    }, []);

    const handleInputChange = (e, formType) => {
        const { name, value } = e.target;
        if (formType === 'newStudent') {
            setNewStudent({
                ...newStudent,
                [name]: value
            });
        } else {
            setNewMatricula({
                ...newMatricula,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Creamos primero al estudiante
            const responseStudent = await fetch(`${apiUrl}/students/createStudent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newStudent)
            });
            const createdStudent = await responseStudent.json();
            console.log(createdStudent._id);
    
            // Si se creó correctamente el estudiante, asignamos su ID a IdStudent de newMatricula
            if (createdStudent && createdStudent._id) {
                console.log("ASIGNANDO ID");
                const matriculaData = {
                    ...newMatricula,
                    IdStudent: createdStudent._id
                };
                console.log(matriculaData._id);
                // Luego creamos la matrícula
                const responseMatricula = await fetch(`${apiUrl}/matriculas/createMatricula`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(matriculaData)
                });
                const createdMatricula = await responseMatricula.json();
                console.log('IMPRIMIR MATRICULA CREADA');
                console.log(createdMatricula);
            } else {
                console.log('Error al crear la matricula');
            }
        } catch (error) {
            console.log('Error al crear la matricula',error);
        }
    };

    return (
        <div>
            <h1>Matricula Page</h1>
            <MatriculaList />
            <MatriculaForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} newMatricula={newMatricula} newStudent={newStudent}/>
        </div>
    );
}

export default MatriculaPage;