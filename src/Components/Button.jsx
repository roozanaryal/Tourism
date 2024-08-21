import React from "react";

function Button({
   children,
   type = "button",
   bg = "bg-primarycolor",
   txt = "text-white",
   className = "",
   ...props
}) {
   return (
      <button className={` ${bg} ${txt}  ${className} {...props}`}>
         {children}
      </button>
   );
}

export default Button;
