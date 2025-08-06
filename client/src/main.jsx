import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { SocketContextProvider } from "./Context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <AuthProvider>
         <SocketContextProvider>
            <RouterProvider router={router}/>
         </SocketContextProvider>
      </AuthProvider>
   </StrictMode>
);
