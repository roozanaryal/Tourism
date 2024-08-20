import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "../Constants/Constant";
export default function Navbar() {
   return (
      <>
         <nav className="">
            <ul className="flex justify-start items-center px-24 gap-5 h-16  font-semibold">
               <NavLink to="/">
                  <img className="h-14 w-24 " src={logo} alt="Logo" />
               </NavLink>
               {NAV_LINKS.map((nav, key) => {
                return  <li className="" key={nav.id}>
                     <NavLink
                        to={nav.path}
                        className={({ isActive }) =>
                           `${isActive ? "text-primarycolor" : "text-white"}`
                        }
                     >
                        {nav.label}
                     </NavLink>
                  </li>;
               })}
            </ul>
         </nav>
      </>
   );
}
