import { Schema, model } from "mongoose";
const matriculaSchema = new Schema({
    horario: {
        type: String,
        // required: true,
    },
    trimestre: {
        type: String,
        // required: true,
    },
    fechaIngreso: {
        type: String,
        default: () => new Date().toISOString(), 
    },
    IdStudent: {
        type: Schema.Types.ObjectId, ref: 'Student',
        // required: true,
    },
    IdCurso: {
        type: Schema.Types.ObjectId, ref: 'Curso',
        // required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

export default model("Matricula", matriculaSchema);