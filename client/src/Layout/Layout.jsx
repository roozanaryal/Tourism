import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
  const location = useLocation();
  
  // Pages that have their own transparent navbar and shouldn't show the global navbar
  const pagesWithoutGlobalNavbar = ['/', '/guides', '/attraction', '/contact', '/community', '/detail'];
  
  const shouldShowGlobalNavbar = !pagesWithoutGlobalNavbar.includes(location.pathname);

  return (
    <>
      {shouldShowGlobalNavbar && <Navbar />}
      <Outlet />
      <Footer/>
      <ToastContainer />
    </>
  )
}

export default Layout;