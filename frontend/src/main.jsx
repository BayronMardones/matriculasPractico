import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import StudentPage from './pages/studentPage/studentPage.jsx';

const Router = createBrowserRouter([
  {
    path: "/*", element: <App />
  },
  {
    path: "/studentPage", element: <StudentPage />
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={Router}/>
  </React.StrictMode>,
)

export default Router;
