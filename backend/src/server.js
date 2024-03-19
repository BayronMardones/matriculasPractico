import express, { json } from "express";
import { setupDB } from "./config/db.config.js";
import cors from "cors";
import studentRoutes from "./api/routes/studentRoutes.js";
const app = express()
const port = process.env.PORT;

app.use(json());

app.use("/api/students", studentRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
    setupDB();
});