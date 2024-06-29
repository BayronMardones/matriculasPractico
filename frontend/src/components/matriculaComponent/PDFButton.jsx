import { jsPDF } from "jspdf";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { PDFDocument } from "pdf-lib";
import { FichaCobro } from "./fichaCobro";
// Asumiendo que la mitad de una hoja tamaño carta (279mm)

const PDFButton = ({ student, matricula, curso }) => {
    const generatePDF = async () => {

        const doc = new jsPDF({
            orientation: "p",
            unit: "mm",
            format: "letter"
        });

        const logoImg = '/public/logo1.jpg'; // Ruta de la imagen
        const imgWidth = 85; // Ancho de la imagen en mm
        const imgHeight = 19; // Alto de la imagen en mm
        const imgX = 10; // Posición X de la imagen (esquina superior izquierda)
        const imgY = 10; // Posición Y de la imagen (esquina superior izquierda)

        // Cargar la imagen y agregarla al documento
        doc.addImage(logoImg, 'JPG', imgX, imgY, imgWidth, imgHeight);

        const lineHeight = 7; // Height of each line
        const labelX = 10; // X position for labels
        const fieldX = 65; // X position for fields aligned
        const lineLength = 120; // Length of the lines for input fields

        // Encabezado
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("FICHA MATRÍCULA NORTEAMERICANO CONCEPCIÓN", 105, 10 + 32, { align: "center" }); // Ajustado a 10 + 42
        doc.setFontSize(12);
        doc.text("THIRD TERM 2023", 105, 15 + 32, { align: "center" }); // Ajustado a 15 + 42

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text("Por favor completar la siguiente ficha de matrícula por cada alumno . En el caso de los alumnos de los programas niños .", 10, 30 + 30); // Ajustado a 30 + 42
        doc.text("(Kids) y adolescentes (Teens) se solicita, además, completar la información del apoderado.", 10, 35 + 30); // Ajustado a 35 + 42

        doc.setTextColor(255, 0, 0); // Cambiar el color de la fuente a rojo
        doc.setFont("helvetica", "bold"); // Cambiar la fuente a negrita
        doc.text("Sin esta ficha de matrícula, no será posible contactar a los alumnos y/o apoderados en caso de ser necesario.", 10, 40 + 36); // Ajustado a 40 + 42
        doc.setFont("helvetica", "normal"); // Restablecer la fuente a normal para el texto siguiente
        doc.setTextColor(0); // Restablecer el color de la fuente a negro para el texto siguiente

        const bulletPoint = "• ";
        const bulletPointX = 10; // Posición X para el punto de viñeta
        const textX = bulletPointX + 5; // Ajuste para el texto después del punto de viñeta, aumenta este valor si es necesario

        // Primera parte del texto con viñeta
        doc.text(bulletPoint + "   Cabe mencionar que toda solicitud de POSTERGACIÓN de un curso, será aceptada sólo si el alumno alcanzó a", bulletPointX, 45 + 42); // Ajustado a 45 + 42

        // Continuación del texto, alineado sin el "•"
        doc.text("participar a menos del 50% de las clases.", textX, 50 + 42); // Ajustado a 50 + 42

        doc.text(bulletPoint + "   La solicitud de DEVOLUCION de dinero será autorizada sólo en casos de enfermedad del alumno o pérdida de", bulletPointX, 55 + 42); // Ajustado a 55 + 42
        doc.text("su fuente laboral (se debe adjuntar documentación que lo acredite) hasta dos meses después de iniciado el", textX, 60 + 42); // Ajustado a 60 + 42
        doc.text("curso y en este caso, previo a la devolución, se descontarán las clases en las que participó el alumno.", textX, 65 + 42); // Ajustado a 65 + 42

        const startY = 119;
        // Datos del alumno
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        // Texto a subrayar
        doc.text("DATOS DEL ALUMNO", 10, startY);
        // Calcular el ancho del texto
        const textWidth = doc.getTextWidth("DATOS DEL ALUMNO");
        // Dibujar la línea de subrayado más cerca del texto
        doc.line(10, startY + 0.5, 10 + textWidth, startY + 0.5);

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        const colonX = 70; // Ajuste para la posición X del ":", alineado con "Correo Electrónico"
        doc.text(`Nombre Completo`, 10, startY + 10);
        doc.text(`: ${student.nombres} ${student.apellidoPaterno} ${student.apellidoMaterno}`, colonX, startY + 10);
        doc.text(`RUT`, 10, startY + 17);
        doc.text(`: ${student.rut}`, colonX, startY + 17);
        doc.text(`Teléfono(s)`, 10, startY + 24);
        doc.text(`: ${student.telefonos}`, colonX, startY + 24);
        doc.text(`Correo Electrónico`, 10, startY + 31);
        doc.text(`: ${student.email}`, colonX, startY + 31);
        doc.text(`Curso`, 10, startY + 38);
        doc.text(`: ${curso.nombreCurso}`, colonX, startY + 38);
        doc.text(`Horario`, 10, startY + 45);
        doc.text(`: ${matricula.horario}`, colonX, startY + 45);
        doc.text(`Trimestre`, 10, startY + 52);
        doc.text(`: ${matricula.trimestre}`, colonX, startY + 52);

        doc.text(`Firma`, 10, startY + 73);
        doc.text(":", colonX - 2, startY + 73);
        doc.line(colonX, startY + 73.5, colonX + 120, startY + 73.5);

        // Calculamos la nueva posición de inicio para la sección
        const startPosition = 209.4; // Resultado de nuestro cálculo

        // Información apoderado
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        // Texto a subrayar parcialmente
        const textToUnderline = "INFORMACIÓN APODERADO";
        doc.text(textToUnderline + " (Cursos Kids y Teens):", 10, startPosition);

        // Calcular el ancho del texto a subrayar
        const textWidthAp = doc.getTextWidth(textToUnderline);

        // Dibujar la línea de subrayado solo debajo de "INFORMACIÓN APODERADO"
        doc.line(10, startPosition + 1, 10 + textWidthAp, startPosition + 0.5);

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        const xOffset = 2; // Ajuste para la posición X del ":", modifica según necesidad

        // Nombre Apoderado
        doc.text(`Nombre Apoderado`, labelX, startPosition + lineHeight);
        doc.text(":", fieldX - xOffset, startPosition + lineHeight + 2);
        doc.text(`${student.nombresApoderado} ${student.apellidosApoderado}`, fieldX, startPosition + lineHeight);
        doc.line(fieldX, startPosition + lineHeight + 2, fieldX + lineLength, startPosition + lineHeight + 2);

        // Teléfono(s)
        doc.text(`Teléfono(s)`, labelX, startPosition + 2 * lineHeight);
        doc.text(":", fieldX - xOffset, startPosition + 2 * lineHeight + 2);
        doc.text(`${student.telefonosApoderado}`, fieldX, startPosition + 2 * lineHeight);
        doc.line(fieldX, startPosition + 2 * lineHeight + 2, fieldX + lineLength, startPosition + 2 * lineHeight + 2);

        // Dirección Correo Electrónico
        doc.text(`Dirección Correo Electrónico`, labelX, startPosition + 3 * lineHeight);
        doc.text(":", fieldX - xOffset, startPosition + 3 * lineHeight + 2);
        doc.text(`${student.emailApoderado}`, fieldX, startPosition + 3 * lineHeight);
        doc.line(fieldX, startPosition + 3 * lineHeight + 2, fieldX + lineLength, startPosition + 3 * lineHeight + 2);

        // Firma
        doc.text("Firma", labelX, startPosition + 5 * lineHeight);
        doc.text(":", fieldX - xOffset, startPosition + 5 * lineHeight + 2);
        doc.line(fieldX, startPosition + 5 * lineHeight + 2, fieldX + lineLength, startPosition + 5 * lineHeight + 2);


        doc.addPage("letter", "p");
        FichaCobro(doc);

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
