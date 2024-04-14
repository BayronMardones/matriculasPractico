import { useAuth } from "../context/authContext";


const HomePage = () => {
    const { logout } = useAuth();
    return (
        <div>
            <button onClick={logout}>cerrar sesion</button>
            <h1>Home</h1>
            <p>Esta es la página de inicio</p>
        </div>
    );
}

export default HomePage;