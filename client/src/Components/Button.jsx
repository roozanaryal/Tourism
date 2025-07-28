import React from "react";

function Button({
   children,
   type = "button",
   bg = "bg-primarycolor",
   txt = "text-white",
   className = "",
   onClick,
   ...props
   
}) {
   return (
      <button
         type={type}
         className={` ${bg} ${txt}  ${className}`}
         onClick={onClick}
         {...props}
      >
         {children}
      </button>
   );
}

export default Button;
