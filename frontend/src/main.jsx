import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import StudentPage from './pages/studentPage/studentPage.jsx';
import MatriculaPage from './pages/matriculaPage/matriculaPage.jsx';
import HomePage from './pages/homePage.jsx';
import Login from './pages/login.jsx';
import { AuthProvider, useAuth } from './context/authContext.jsx';

import TestFile from './pages/testFile.jsx';

const PrivateRoute = ({ element }) => {
	const { isAuthenticated } = useAuth();
	return isAuthenticated ? element : <Navigate to="/" />;
};

const Router = createBrowserRouter([
  {
    path: "/*", 
    element: <App />
  },
  {
    path: "/", 
    element: <Login />
  },
  {
    path: "/studentPage", 
    element: <StudentPage />
  },
  {
    path: "/matriculaPage", 
    element: <MatriculaPage />
  },
  {
    path: "/homePage", 
    element: <PrivateRoute element={<HomePage />} />,
  },
  {
    path: "/testFile", 
    element: <TestFile />
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  </React.StrictMode>,
)

export default Router;
