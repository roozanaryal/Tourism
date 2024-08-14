import React from "react";
import Navbar from "./Navbar";
import TopSectionPic from "../assets/TopSectionImage.png";
export default function TopSection() {
   return (
      <>
         <div>
            <Navbar />
            <div className="w-[vw] h-[80vh] relative top-0">
               <img
                  src={TopSectionPic}
                  className="w-full h-full object-cover"
                  alt="TopSectionImge"
               />
            </div>
         </div>
      </>
   );
}
