import { Schema, model } from "mongoose";
const userShema = new Schema({
    nombreU: {
        type: String,
        required: true,
    },
    apellidoU: {
        type: String,
        // required: true,
    },
    rutU: {
        type: String,
        // required: true,
    },
    emailU: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
        required : true
    },
    rol: {
        type: String,
        required: true,
        default: 'user'
    },
}, {
    timestamps: true,
    versionKey: false,
});

export default model("User", userShema);