import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/routes/App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './styles/index.css'
import { Login } from '@/routes/Login.tsx';
import Menu from './routes/Menu.tsx';
import Start from '@/routes/Start.tsx';
import { Introduction } from './routes/Introduction.tsx';
import { Members } from './routes/Members.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "introduction",
        element: <Introduction />,
      },
      {
        path: "members",
        element: <Members />,
      },
    ]
  },
  {
    path: "/menu",
    element: <Menu />,
    children: [
      {
        path: "",
        element: <Start />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
