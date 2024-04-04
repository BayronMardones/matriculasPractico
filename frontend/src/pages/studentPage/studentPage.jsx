import StudentList from "../../components/studentComponent/studentList.jsx";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
const apiUrl = import.meta.env.VITE_API_URL;
import StudentForm from "../../components/studentComponent/studentForm.jsx";

const StudentPage = () => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({
        nombres: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        rut: "",
        telefonos: "",
        email: "",
        codigo: "",
        IdApoderado: ""
    });

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch(`${apiUrl}/students/getStudents/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                setStudents(result);
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
        fetchStudents();
    }, []);

    const handleInputChange = (e) => {
        console.log(e.target.value);
        setNewStudent({
            ...newStudent,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newStudent);
        try {
            const response = await fetch(`${apiUrl}/students/createStudent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newStudent)
            });
            if (response.ok) {
                const result = await response.json();
                setStudents([...students, result]);
                Swal.fire({
                    title: "Student created",
                    text: "The student was created successfully",
                    icon: "success"
                });
            } 
            else {
                throw new Error("Failed to create student");
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error!",
                text: "Failed to create student.",
                icon: "error"
            });
        }
    }

    const deleteStudent = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                const response = await fetch(`${apiUrl}/students/deleteStudent/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    await response.json();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    const newStudents = students.filter(student => student._id !== id);
                    setStudents(newStudents);
                } else {
                    throw new Error("Failed to delete student");
                }
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error!",
                text: "Failed to delete student.",
                icon: "error"
            });
        }
    }



    return (
        <>
            <h1>Pagina Estudiantes</h1>
            <StudentList students={students} onDelete={deleteStudent} />
            <StudentForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} newStudent={newStudent} />
        </>

    );
}

export default StudentPage;