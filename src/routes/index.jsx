import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Fleet from '../pages/Fleet';
import Booking from '../pages/Booking';
import Experience from '../pages/Experience';
import Contact from '../pages/Contact';
import About from '../pages/About';
import VehicleDetails from '../pages/VehicleDetails';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'fleet',
        element: <Fleet />,
      },
      {
        path: 'fleet/:id',
        element: <VehicleDetails />,
      },
      {
        path: 'booking',
        element: <Booking />,
      },
      {
        path: 'experience',
        element: <Experience />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

