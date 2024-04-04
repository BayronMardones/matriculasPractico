import { Schema, model } from "mongoose";
const apoderadoSchema = new Schema({
    nombres: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        // required: true,
    },
    telefonos: {
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

export default model("Apoderado", apoderadoSchema);