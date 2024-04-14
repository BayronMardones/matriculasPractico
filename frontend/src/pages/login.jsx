import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx"; // Fix the file name

const Login = () => {
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
            console.log("sesion no iniciada xs",error);
        }

    };
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input
                    type="email"
                    value={emailU}
                    onChange={(e) => setEmailU(e.target.value)}
                    autoComplete="email"
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;