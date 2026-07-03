import { Outlet } from 'react-router-dom';
import Navbar from '../components/organisms/Navbar';
import Footer from '../features/home/components/Footer';

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
}

