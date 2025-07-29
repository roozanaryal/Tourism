import { useState } from "react";
import PropTypes from "prop-types";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "../Constants/Constant";
import LoginSignup from "../Pages/LoginSignup";
import AddPostModal from "../Components/AddPostModal";
import { useAuth } from "../Context/AuthContext";
import useLogout from "../hooks/useLogout";

Navbar.propTypes = {
  transparent: PropTypes.bool,
};

export default function Navbar({ transparent = false }) {
   const [showLoginModal, setShowLoginModal] = useState(false);
   const [showAddPostModal, setShowAddPostModal] = useState(false);
   const { user } = useAuth();
   const { logout } = useLogout();

   const handleCloseLoginModal = () => {
      setShowLoginModal(false);
   };

   const handleCloseAddPostModal = () => {
      setShowAddPostModal(false);
   };

   const handleLogout = async () => {
      try {
         await logout();
      } catch (error) {
         console.error("Logout failed:", error);
      }
   };

     const navBgClass = transparent
    ? "bg-transparent"
    : "bg-white shadow-md";

  return (
    <>
      <nav className={`w-full z-20 ${navBgClass}`} style={{transition: 'background 0.3s'}}> 
        <ul className="flex justify-start cursor-pointer items-center px-24 gap-5 h-16 font-semibold">
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
            <>
              {user.isAdmin && (
                <li>
                  <button
                    onClick={() => setShowAddPostModal(true)}
                    className="nav-link transition-colors hover:text-primarycolor text-white cursor-pointer"
                  >
                    Add Post
                  </button>
                </li>
              )}
              <li onClick={handleLogout} className="nav-link text-white transition-colors hover:text-primarycolor cursor-pointer">Logout</li>
            </>
          ) : (
            <li onClick={() => setShowLoginModal(true)} className="nav-link text-white transition-colors hover:text-primarycolor cursor-pointer">Login/Register</li>
          )}
        </ul>
      </nav>
      <LoginSignup showModal={showLoginModal} onClose={handleCloseLoginModal} />
      <AddPostModal showModal={showAddPostModal} onClose={handleCloseAddPostModal} />
    </>
  );
}
