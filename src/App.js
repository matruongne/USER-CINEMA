import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header/header'; 
import Banner from './components/Banner/Banner';
import QuickBooking from './components/QuickBooking/quickbooking';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <Header />
                <Banner />
                <QuickBooking />
                <Home />
            </>
        ),
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
