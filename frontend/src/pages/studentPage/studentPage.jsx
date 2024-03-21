import StudentList from "../../components/studentComponent/studentList.jsx";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
const apiUrl = import.meta.env.VITE_API_URL;

const StudentPage = () => {
    const [students, setStudents] = useState([]);
    useEffect(() => { 
        const fetchStudents = async () => {
            try {
                const response = await fetch(`${apiUrl}/students/getStudents/` , {
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
    } , []);

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
            <StudentList students={students} onDelete={deleteStudent}/>
        </>

    );
}

export default StudentPage;