import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header/header'; 

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <Header />
                <Home />
            </>
        ),
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
