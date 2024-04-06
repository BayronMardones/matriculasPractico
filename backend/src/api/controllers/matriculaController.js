import Matricula from '../models/matriculaModel.js';

export const createMatricula = async (req, res) => {
    const newMatricula = new Matricula(req.body);
    try {
        await newMatricula.save();
        res.status(201).json(newMatricula);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getMatriculas = async (req, res) => {
    try {
        const matriculas = await Matricula.find();
        res.status(200).json(matriculas);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getMatriculaById = async (req, res) => {
    try {
        const matricula = await Matricula.findById(req.params.id);
        res.status(200).json(matricula);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteMatricula = async (req, res) => {
    try {
        await Matricula.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Matricula deleted successfully" });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateMatricula = async (req, res) => {
    try {
        const updatedMatricula = await Matricula.findByIdAndUpdate(req.params   .id, req.body   , { new: true });
        res.status(200).json(updatedMatricula);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}