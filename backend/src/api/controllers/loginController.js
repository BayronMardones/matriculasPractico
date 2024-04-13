import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const emailU = req.body.emailU;
    const password = req.body.password;
    try {
        const user = await User.findOne({ emailU });
        if (!user) return res.status(404).json({ message: "El usuario no existe" });

        if (user.password !== password) return res.status(400).json({ message: "Credenciales Incorrectas" });

        const token = jwt.sign({ emailUser: user.emailU }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.status(200).json({ result: user, token });
    }
    catch (error) {
        res.status(500).json({ message: "Error al iniciar sesion", error });
    }
}

export const logout = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({ message: "No hay token" });
    res.clearCookie("jwt", { httpOnly: true });
    res.status(200).json({ message: "Sesion cerrada con exito" });
}
