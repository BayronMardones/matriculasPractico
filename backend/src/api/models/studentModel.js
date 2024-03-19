import { Schema, model } from "mongoose";
const studentSchema = new Schema({
    nombres: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        // required: true,
    },
    apodo: {
        type: String,
        // required: true,
    },
    fechaNacimiento: {
        type: String,
        // required: true,
    },
    rut: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

export default model("Student", studentSchema);