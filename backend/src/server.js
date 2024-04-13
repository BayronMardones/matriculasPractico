import express, { json } from "express";
import { setupDB } from "./config/db.config.js";
import cors from "cors";
import studentRoutes from "./api/routes/studentRoutes.js";
import userRoutes from "./api/routes/userRoutes.js";
import matriculaRouter from "./api/routes/matriculaRoutes.js";
import cursoRoutes from "./api/routes/cursoRoutes.js";
import loginRoutes from "./api/routes/loginRoutes.js";
const app = express()
const port = process.env.PORT;

app.use(json());
app.use(cors());

app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matriculas", matriculaRouter);
app.use("/api/cursos", cursoRoutes);
app.use("/api/sesion", loginRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
    setupDB();
});