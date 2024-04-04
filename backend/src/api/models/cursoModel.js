import { Schema, model } from "mongoose";
const cursoSchema = new Schema({
    nombreCurso: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

export default model("Curso", cursoSchema);