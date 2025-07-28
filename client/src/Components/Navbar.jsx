import { useState } from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "../Constants/Constant";
import LoginSignup from "../Pages/LoginSignup";
import { useAuth } from "../Context/AuthContext";
import useLogout from "../hooks/useLogout";

export default function Navbar() {
   const [showModal, setShowModal] = useState(false);
   const { user } = useAuth();
   const { logout } = useLogout();

   const handleCloseModal = () => {
      setShowModal(false);
   };

   const handleLogout = async () => {
      try {
         await logout();
      } catch (error) {
         console.error("Logout failed:", error);
      }
   };

   return (
      <>
         <nav className="">
            <ul className="flex justify-start cursor-pointer items-center px-24 gap-5 h-16 text-white font-semibold">
               <NavLink to="/">
                  <img className="h-14 w-24 " src={logo} alt="Logo" />
               </NavLink>
               {NAV_LINKS.map((nav) => {
                  return (
                     <li className="" key={nav.id}>
                        <NavLink
                           to={nav.path}
                           className={({ isActive }) =>
                              `nav-link transition-colors hover:text-primarycolor ${isActive ? "text-primarycolor" : "text-white"}`
                           }
                        >
                           {nav.label}
                        </NavLink>
                     </li>
                  );
               })}
               {user ? (
                  <li onClick={handleLogout} className="nav-link text-white transition-colors hover:text-primarycolor cursor-pointer">Logout</li>
               ) : (
                  <li onClick={() => setShowModal(true)} className="nav-link text-white transition-colors hover:text-primarycolor cursor-pointer">Login/Register</li>
               )}
            </ul>
         </nav>
         <LoginSignup showModal={showModal} onClose={handleCloseModal} />
      </>
   );
}
