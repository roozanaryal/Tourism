import React from "react";
import Navbar from "./Navbar";
import TopSectionPic from "../assets/TopSectionImage.png";
import Search from "./Search";
export default function TopSection() {
   return (
      <>
         <div className="relative h-[80vh] text-white w-screen ">
            <div className="absolute top-0 left-0 w-full z-10">
               <Navbar />
            </div>
            <img
               src={TopSectionPic}
               className="w-full h-full absolute object-cover"
               alt="TopSectionImge"
            />
            <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center">
               <h1 className="text-4xl font-semibold">
                  Wander <span className="text-primarycolor">More</span> Worry{" "}
                  <span className="text-primarycolor">Less</span>
               </h1>
               <div className="relative mt-4">
                  <Search/>
               </div>
            </div>
         </div>
      </>
   );
}
