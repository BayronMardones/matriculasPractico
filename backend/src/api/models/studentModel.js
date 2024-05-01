import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    nombres: {
        type: String,
        required: true,
    },
    apellidoPaterno: {
        type: String,
        // required: true,
    },
    apellidoMaterno: {
        type: String,
        // required: true,
    },
    rut: {
        type: String,
        // required: true,
    },
    telefonos: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
    },
    codigo: {
        type: String,
        // required: true,
    },
    nombresApoderado: {
        type: String,
        // required: true,
    },
    apellidosApoderado: {
        type: String,
        // required: true,
    },
    telefonosApoderado: {
        type: String,
        // required: true,
    },
    emailApoderado: {
        type: String,
        // required: true,
    },
    
}, {
    timestamps: true,
    versionKey: false,
});

export default model("Student", studentSchema);