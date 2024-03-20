import StudentList from "./studentList";
import { useEffect, useState } from "react";
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

    
    return (
        <>
            <h1>Pagina Estudiantes</h1>
            <StudentList students={students} />
        </>

    );
}

export default StudentPage;