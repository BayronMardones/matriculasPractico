import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import StudentPage from './pages/studentPage/studentPage.jsx';
import MatriculaPage from './pages/matriculaPage/matriculaPage.jsx';

const Router = createBrowserRouter([
  {
    path: "/*", element: <App />
  },
  {
    path: "/studentPage", element: <StudentPage />
  },
  {
    path: "/matriculaPage", element: <MatriculaPage />
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={Router}/>
  </React.StrictMode>,
)

export default Router;
