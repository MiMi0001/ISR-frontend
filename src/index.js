import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import {ErrorPage} from "./components/ErrorPage"
import {ISRApp} from "./components/ISRApp";
import {ProductsList} from "./components/products/ProductsLists";
import {Login} from "./components/Login";
import {IndexPage} from "./components/IndexPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <ISRApp/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <IndexPage/>
            },
            {
                path: "/products_list",
                element: <ProductsList/>,
            },
            {
                path: "/login",
                element: <Login/>,
            }
        ]
    }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
