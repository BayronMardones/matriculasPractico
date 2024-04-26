import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Container from '@mui/material/Container';
import { Button } from "@mui/material";

const Login = () => {
    //funciones de autenticacion
    const navigate = useNavigate();
    const { login } = useAuth();
    const [emailU, setEmailU] = useState("");
    const [password, setPassword] = useState("");

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/sesion/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ emailU, password }),
            });
            const data = await response.json();
            if (response.ok) {
                login(data.token);
                navigate("/homePage");
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log("sesion no iniciada xs", error);
        }

    };
    return (

        <Container component="main" maxWidth="xs">
            <h1>SISTEMA DE MATRICULAS</h1>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: "#FFFFFF",
                    padding: "20px",
                }}
            >
                <h2 style={{color: "#000000"}}>INICIO DE SESION</h2>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="correo de usuario"
                        name="email"
                        value={emailU}
                        onChange={(e) => setEmailU(e.target.value)}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="contraseña"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Entrar
                    </Button>

                    <Button onClick={()=> navigate("/testFile")}>pagina test</Button>
                </Box>
            </Box>
        </Container>

    );
};

export default Login;