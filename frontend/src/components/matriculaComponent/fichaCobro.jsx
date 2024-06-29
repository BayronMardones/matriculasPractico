export const FichaCobro = (doc) => {
    // Configurar las posiciones y dimensiones
    const startX = 12; // X posición inicial
    const startY = 40 + 33; // Y posición inicial
    const cellWidth = 28; // Ancho de cada celda
    const cellHeight = 13; // Altura de cada celda
    const rows = 5;
    const columns = 6; // Ajustar columnas a 6 para incluir todos los encabezados y datos

    // Crear los datos de la tabla
    const tableData = [
        ["N° Cuota", "            1", "            2", "            3", "            4", "            5"],
        ["Monto cancelado", "", "", "", "", ""],
        ["Forma de pago", "", "", "", "", ""],
        ["Fecha de pago", "", "", "", "", ""],
        ["N° de boleta", "", "", "", "", ""],
    ];

    const logoImg = '/public/logo1.jpg'; // Ruta de la imagen
    const imgWidth = 85; // Ancho de la imagen en mm
    const imgHeight = 19; // Alto de la imagen en mm
    const imgX = 10; // Posición X de la imagen (esquina superior izquierda)
    const imgY = 10; // Posición Y de la imagen (esquina superior izquierda)

    // Cargar la imagen y agregarla al documento
    doc.addImage(logoImg, 'JPG', imgX, imgY, imgWidth, imgHeight);

    //titulo de matriz
    doc.setFontSize(10); // Establecer tamaño de fuente a 12
    doc.setFont("helvetica", "bold"); // Establecer fuente en negrita
    doc.text("INFORMACIÓN PAGO CURSO:", startX, startY - 10); // Posicionar el título 10 unidades por encima de startY
    doc.setDrawColor(0); // Establecer color de línea para el subrayado, negro por defecto
    doc.line(startX, startY - 8, startX + 180, startY - 8); // Dibujar línea de subrayado debajo del título

    // Dibujar la matriz
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let cellWidthAdjusted = cellWidth;
            if (j === 0) { // Ajustar el ancho para la columna 0
                cellWidthAdjusted += 7; // Hacer la columna 0 más ancha
            }
            let x = startX + (j * cellWidth) + (j === 0 ? 0 : 7); // Ajustar la posición x para las columnas después de la 0
            let y = startY + (i * cellHeight);

            // Dibujar la celda con el ancho ajustado
            doc.rect(x, y, cellWidthAdjusted, cellHeight);

            // Insertar datos en las celdas
            if (tableData[i] && tableData[i][j]) {
                doc.setFontSize(10);
                // Ajustar la posición del texto para la columna 0
                let textX = x + 2;
                if (j === 0) {
                    textX += 2; // Ajustar ligeramente hacia la derecha para la columna 0
                }
                doc.text(tableData[i][j], textX, y + cellHeight / 2 + 2);
            }
        }
    }

    // Continuación del código para agregar una segunda matriz con un nuevo título

    // Calcular la posición Y de inicio para la segunda matriz
    // Sumar la altura total de la primera matriz más un espacio adicional de 20 unidades
    const secondMatrixStartY = startY + (rows * cellHeight) + 20;

    // Título para la segunda matriz
    doc.setFontSize(10); // Tamaño de fuente a 12
    doc.setFont("helvetica", "bold"); // Fuente en negrita
    // Posicionar el título de la segunda matriz 10 unidades por encima de su startY
    doc.text("INFORMACIÓN PAGO TEXTO:", startX, secondMatrixStartY - 10);
    doc.setDrawColor(0); // Color de línea para el subrayado, negro por defecto
    // Dibujar línea de subrayado debajo del título de la segunda matriz
    doc.line(startX, secondMatrixStartY - 8, startX + 180, secondMatrixStartY - 8);

    // Dibujar la segunda matriz
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let cellWidthAdjusted = cellWidth;
            if (j === 0) { // Ajustar el ancho para la columna 0 de la segunda matriz
                cellWidthAdjusted += 7; // Hacer la columna 0 más ancha
            }
            let x = startX + (j * cellWidth) + (j === 0 ? 0 : 7); // Ajustar la posición x para las columnas después de la 0
            let y = secondMatrixStartY + (i * cellHeight); // Usar la posición Y de inicio de la segunda matriz

            // Dibujar la celda con el ancho ajustado para la segunda matriz
            doc.rect(x, y, cellWidthAdjusted, cellHeight);

            // Insertar datos en las celdas de la segunda matriz
            if (tableData[i] && tableData[i][j]) {
                doc.setFontSize(10);
                // Ajustar la posición del texto para la columna 0 de la segunda matriz
                let textX = x + 2;
                if (j === 0) {
                    textX += 2; // Ajustar ligeramente hacia la derecha para la columna 0
                }
                doc.text(tableData[i][j], textX, y + cellHeight / 2 + 2);
            }
        }
    }

    const accountingStampY = secondMatrixStartY + (rows * cellHeight) + 40;

    // Calcular el ancho del texto "Timbre de contabilidad"
    const text = "Timbre de contabilidad";
    const textWidth = doc.getTextWidth(text);

    // Calcular la posición X para centrar el texto en la página
    const pageWidth = doc.internal.pageSize.getWidth();
    const textStartX = (pageWidth - textWidth) / 2;

    // Dibujar el texto "Timbre de contabilidad" centrado
    doc.text(text, textStartX, accountingStampY);

    // Calcular la posición inicial y final de la línea para que sobrepase el texto por 50 unidades en cada lado
    const lineStartX = textStartX - 45; // Iniciar 50 unidades antes del texto
    const lineEndX = textStartX + textWidth + 45; // Terminar 50 unidades después del texto

    // Dibujar la línea sobre el texto
    const lineY = accountingStampY - 3; // Posición Y de la línea, ligeramente por encima del texto
    doc.line(lineStartX, lineY, lineEndX, lineY);
    // Restablecer el grosor de la línea a su valor predeterminado para futuras operaciones de dibujo, si es necesario

};