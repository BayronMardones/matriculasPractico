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
    const [students, setStudents] = useState([]);
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

    // const handleInputChange = (e) => {
    //     console.log(e.target.value);
    //     setNewMatricula({
    //         ...newMatricula,
    //         [e.target.name]: e.target.value
    //     });
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Omitimos la creación del estudiante y la matrícula en la API
    
        // Mostramos los datos por consola
        console.log("Datos de la matrícula:", newMatricula);
        console.log("Datos del estudiante:", newStudent);
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log(newMatricula);
    //     try {
    //         // Creamos primero al estudiante
    //         const responseStudent = await fetch(`${apiUrl}/students/createStudent`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(newStudent)
    //         });
    //         const createdStudent = await responseStudent.json();

    //         // Luego asignamos el ID del estudiante creado a la matrícula
    //         const matriculaData = {
    //             ...newMatricula,
    //             IdStudent: createdStudent.id
    //         };


    //         // Finalmente, creamos la matrícula
    //         const responseMatricula = await fetch(`${apiUrl}/matriculas/createMatricula`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(matriculaData)
    //         });
    //         const createdMatricula = await responseMatricula.json();
    //         console.log(createdMatricula);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <div>
            <h1>Matricula Page</h1>
            <MatriculaList />
            <MatriculaForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} newMatricula={newMatricula} newStudent={newStudent}/>
        </div>
    );
}

export default MatriculaPage;