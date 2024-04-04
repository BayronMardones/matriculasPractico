import Apoderado from "../models/apoderadoModel.js";

export const createApoderado = async (req, res) => {
    const newApoderado = new Apoderado(req.body);
    try {
        await newApoderado.save();
        res.status(201).json(newApoderado);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getApoderados = async (req, res) => {
    try {
        const apoderados = await Apoderado.find();
        res.status(200).json(apoderados);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getApoderadoById = async (req, res) => {
    try {
        const apoderado = await Apoderado.findById(req.params.id);
        res.status(200).json(apoderado);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteApoderado = async (req, res) => {
    try {
        await Apoderado.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Apoderado deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateApoderado = async (req, res) => {
    try {
        const updatedApoderado = await Apoderado.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedApoderado);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}