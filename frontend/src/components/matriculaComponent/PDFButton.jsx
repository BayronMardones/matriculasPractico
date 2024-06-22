import { jsPDF } from "jspdf";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { PDFDocument } from "pdf-lib";

const PDFButton = ({ student, matricula, curso }) => {
    const generatePDF = async () => {

        const doc = new jsPDF({
            orientation: "p",
            unit: "mm",
            format: "letter"
        });

        const lineHeight = 7; // Height of each line
        const labelX = 10; // X position for labels
        const fieldX = 60; // X position for fields aligned
        const lineLength = 130; // Length of the lines for input fields


        // Encabezado
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("FICHA MATRÍCULA NORTEAMERICANO CONCEPCIÓN", 105, 10, { align: "center" });
        doc.setFontSize(12);
        doc.text("THIRD TERM 2023", 105, 20, { align: "center" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text("Por favor completar la siguiente ficha de matrícula por cada alumno . En el caso de los alumnos de los programas niños .", 10, 30);
        doc.text("(Kids) y adolescentes (Teens) se solicita, además, completar la información del apoderado. .", 10, 35);
        doc.text("En el caso de los alumnos de los programas niños (Kids) y adolescentes (Teens) se solicita además completar la información del apoderado.", 10, 40);
        doc.text("Sin esta ficha de matrícula no será posible contactar a los alumnos y/o apoderados en caso de ser necesario.", 10, 45);
        doc.text("Cabe mencionar que toda solicitud de POSTERGACIÓN de un curso será aceptada sólo si el alumno alcanzó a participar a menos del 50% de las clases.", 10, 50);
        doc.text("La solicitud de DEVOLUCION de dinero será autorizada sólo en casos de enfermedad del alumno o pérdida de su fuente laboral", 10, 55);
        doc.text("(se debe adjuntar documentación que lo acredite) hasta dos meses después de iniciado el curso y en este caso previo a la devolución se descontarán las clases en las que participó el alumno.", 10, 60);

        // Datos del alumno
        // doc.setFontSize(12);
        // doc.setFont("helvetica", "bold");
        // doc.text("DATOS DEL ALUMNO", 10, 80);

        // doc.setFontSize(10);
        // doc.setFont("helvetica", "normal");
        // doc.text(`Nombre Completo: ${student.nombres}`, 10, 90);
        // doc.text(`RUT: ${student.nombres}`, 10, 100);
        // doc.text(`Teléfono(s): ${student.nombres}`, 10, 110);
        // doc.text(`Correo Electrónico: ${student.nombres}`, 10, 120);
        // doc.text(`Curso: ${student.nombres}`, 10, 130);
        // doc.text(`Horario: ${student.nombres}`, 10, 140);
        // doc.text(`Trimestre: ${student.nombres}`, 10, 150);

        // doc.text("Firma: ___________________________", 10, 160);

// Calculamos la nueva posición de inicio para la sección
const startPosition = 209.4; // Resultado de nuestro cálculo

// Información apoderado
doc.setFontSize(12);
doc.setFont("helvetica", "bold");
doc.text("INFORMACIÓN APODERADO (Cursos Kids y Teens):", 10, startPosition);

doc.setFontSize(10);
doc.setFont("helvetica", "normal");
doc.text(`Nombre Apoderado:`, labelX, startPosition + lineHeight);
doc.line(fieldX, startPosition + lineHeight + 2, fieldX + lineLength, startPosition + lineHeight + 2);
doc.text(`Teléfono(s):`, labelX, startPosition + 2 * lineHeight);
doc.line(fieldX, startPosition + 2 * lineHeight + 2, fieldX + lineLength, startPosition + 2 * lineHeight + 2);
doc.text(`Dirección Correo Electrónico:`, labelX, startPosition + 3 * lineHeight);
doc.line(fieldX, startPosition + 3 * lineHeight + 2, fieldX + lineLength, startPosition + 3 * lineHeight + 2);

doc.text("Firma:", labelX, startPosition + 5 * lineHeight);
doc.line(fieldX, startPosition + 5 * lineHeight + 2, fieldX + lineLength, startPosition + 5 * lineHeight + 2);

        // Convert jsPDF to pdf-lib document
        const pdfDoc = await PDFDocument.load(doc.output("arraybuffer"));
        const pdfBytes = await pdfDoc.save();

        // Create an object URL for the PDF
        const url = URL.createObjectURL(new Blob([pdfBytes], { type: "application/pdf" }));

        // Open the PDF in a new tab
        window.open(url, "_blank");
    };

    return (
        <Button variant="contained" color="primary" onClick={generatePDF}>
            Generar PDF
        </Button>
    );
};

export default PDFButton;

PDFButton.propTypes = {
    student: PropTypes.object.isRequired,
    matricula: PropTypes.object.isRequired,
    curso: PropTypes.object.isRequired
};
