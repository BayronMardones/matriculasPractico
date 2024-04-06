import Student from '../models/studentModel.js';

export const createStudent = async (req, res) => {
    const newStudent = new Student(req.body);
    try {
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.status(200).json(student);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateStudent = async (req, res) => { 
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req  .params.id  , req.body  , { new: true }); 
        res.status(200).json(updatedStudent);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}   
