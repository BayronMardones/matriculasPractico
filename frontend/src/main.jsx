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
import CursoPage from './pages/cursoPage/cursoPage.jsx';
import { AuthProvider, useAuth } from './context/authContext.jsx';
import MatriculaListPage from './pages/matriculaPage/matriculaListPage.jsx';

import TestFile from './pages/testFile.jsx';

import PropTypes from 'prop-types';

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
  },
  {
    path: "/cursoPage", 
    element: <CursoPage />
  },
  {
    path: "/matriculaListPage",
    element: <MatriculaListPage />
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

//validacion de props
PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};
