import React from "react";
import img from "../assets/Explore.png";

export default function CardHome() {
   return (
      <>
         <div className="h-48 w-72 mt-20">
            <img className="h-48 w-72 rounded-2xl" src={img} alt="Places" />
            <div className="flex flex-col items-center">
               <h2>Explore Nepal</h2>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum,
                  beatae. At reiciendis cum sit consequuntur id, eum hic tempora
                  quia quos corrupti quisquam eveniet facilis voluptatum
                  explicabo inventore similique officiis.
               </p>
            </div>
         </div>
      </>
   );
}
