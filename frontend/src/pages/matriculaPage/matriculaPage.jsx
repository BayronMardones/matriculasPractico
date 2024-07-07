import { useState, useEffect } from "react";
import MatriculaForm from "../../components/matriculaComponent/matriculaForm.jsx";
// import MatriculaList from "../../components/matriculaComponent/matriculaList.jsx";
const apiUrl = import.meta.env.VITE_API_URL;
import ButtonAppBar from "../../components/appBar.jsx";
import CustomizedSnackbars from "../../components/CustomizedSnackbars.jsx";

const MatriculaPage = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

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
            // creacion del estudiante
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
                // creacion de matricula
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

                setSnackbarMessage("Matrícula creada exitosamente");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
            } else {
                setSnackbarMessage("Error al crear la estudiante");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
                console.log('Error al crear la matricula');
            }
        } catch (error) {
            console.log('Error al crear la matricula', error);
            setSnackbarMessage("Error al crear la matrícula");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    // const deleteMatriculaAndStudent = async (matriculaId, studentId) => {
    //     try {
    //         // Eliminar la matrícula
    //         const responseMatricula = await fetch(`${apiUrl}/matriculas/deleteMatricula/${matriculaId}`, {
    //             method: 'DELETE'
    //         });
    //         if (responseMatricula.ok) {
    //             console.log('Matrícula eliminada con éxito');

    //             // Eliminar el estudiante
    //             const responseStudent = await fetch(`${apiUrl}/students/deleteStudent/${studentId}`, {
    //                 method: 'DELETE'
    //             });
    //             if (responseStudent.ok) {
    //                 console.log('Estudiante eliminado con éxito');

    //                 // Opcional: Actualizar el estado local para reflejar la eliminación
    //                 setMatriculas(prevMatriculas => prevMatriculas.filter(matricula => matricula._id !== matriculaId));
    //             } else {
    //                 console.error('Error al eliminar el estudiante');
    //                 setSnackbarMessage("Error al eliminar el estudiante");
    //                 setSnackbarSeverity("error");
    //                 setSnackbarOpen(true);
    //             }
    //         } else {
    //             console.error('Error al eliminar la matrícula');
    //             setSnackbarMessage("Error al eliminar la matrícula");
    //             setSnackbarSeverity("error");
    //             setSnackbarOpen(true);
    //         }
    //     } catch (error) {
    //         console.error('Error al eliminar matrícula y estudiante', error);
    //         setSnackbarMessage("Error al eliminar matrícula y estudiante");
    //         setSnackbarSeverity("error");
    //         setSnackbarOpen(true);
    //     }
    // };

    return (
        <div>

            <ButtonAppBar />
            <h1>Matricula Page</h1>
            <MatriculaForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} newMatricula={newMatricula} newStudent={newStudent} />
            <CustomizedSnackbars
                message={snackbarMessage}
                severity={snackbarSeverity}
                open={snackbarOpen}
                handleClose={handleSnackbarClose}
            />
        </div>
    );
}

export default MatriculaPage;