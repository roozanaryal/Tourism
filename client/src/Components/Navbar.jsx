import { useState } from "react";
import PropTypes from "prop-types";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "../Constants/Constant";
import LoginSignup from "../Pages/LoginSignup";
import AddPostModal from "../Components/AddPostModal";
import { useAuth } from "../Context/AuthContext";
import useLogout from "../hooks/useLogout";
import { IoIosNotificationsOutline } from "react-icons/io";
import NotificationModal from "./NotificationModal";

Navbar.propTypes = {
  transparent: PropTypes.bool,
};

export default function Navbar({ transparent = false }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const { user } = useAuth();
  const { logout } = useLogout();

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleCloseNotificationModal = () => {
    setShowNotificationModal(false);
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

  const navBgClass = transparent ? "bg-transparent" : "bg-white shadow-md";

  return (
    <>
      <nav
        className={`w-full z-20 ${navBgClass}`}
        style={{ transition: "background 0.3s" }}
      >
        <div className="flex items-center justify-between px-24 h-16">
          {/* Left: Logo and Nav Links */}
          <ul className="flex items-center gap-5 font-semibold">
            <NavLink to="/">
              <img className="h-14 w-24" src={logo} alt="Logo" />
            </NavLink>
            {NAV_LINKS.map((nav) => (
              <li key={nav.id}>
                <NavLink
                  to={nav.path}
                  className={({ isActive }) =>
                    `nav-link transition-colors hover:text-primarycolor ${
                      isActive ? "text-primarycolor" : "text-white"
                    }`
                  }
                >
                  {nav.label}
                </NavLink>
              </li>
            ))}
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
                <li
                  onClick={handleLogout}
                  className="nav-link text-white transition-colors hover:text-primarycolor cursor-pointer"
                >
                  Logout
                </li>
              </>
            ) : (
              <li
                onClick={() => setShowLoginModal(true)}
                className="nav-link text-white transition-colors hover:text-primarycolor cursor-pointer"
              >
                Login/Register
              </li>
            )}
          </ul>
          {/* Right: Notification Icon */}
          {user && !user.isAdmin && (
            <div>
              <IoIosNotificationsOutline
                className="text-2xl text-white cursor-pointer"
                onClick={() => setShowNotificationModal(true)}
              />
            </div>
          )}
        </div>
      </nav>
      <LoginSignup showModal={showLoginModal} onClose={handleCloseLoginModal} />
      <AddPostModal
        showModal={showAddPostModal}
        onClose={handleCloseAddPostModal}
      />
      <NotificationModal
        showModal={showNotificationModal}
        onClose={handleCloseNotificationModal}
      />  
    </>
  );
}