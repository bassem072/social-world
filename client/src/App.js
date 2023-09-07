// import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/User/Home";
import Profile from "./pages/User/Profile";
import UserBoard from "./pages/User/UserBoard";
import AdminBoard from "./pages/User/AdminBoard";
import ModeratorBoard from "./pages/User/ModeratorBoard";
import AuthRoutes from "./routes/AuthRoutes";
import GuestRoutes from "./routes/GuestRoutes";
import Error403 from "./pages/Errors/Error403";
import Error404 from "./pages/Errors/Error404";
import Error500 from "./pages/Errors/Error500";
import Error503 from "./pages/Errors/Error503";
import "./App.css";

function App() {
  // const [isOnline, setIsOnline] = useState(navigator.onLine);

  // useEffect(() => {
  //   // Update network status
  //   const handleStatusChange = () => {
  //     setIsOnline(navigator.onLine);
  //   };

  //   // Listen to the online status
  //   window.addEventListener("online", handleStatusChange);

  //   // Listen to the offline status
  //   window.addEventListener("offline", handleStatusChange);

  //   // Specify how to clean up after this effect for performance improvment
  //   return () => {
  //     window.removeEventListener("online", handleStatusChange);
  //     window.removeEventListener("offline", handleStatusChange);
  //   };
  // }, [isOnline]);

  return (
    <Routes>
      <Route path="/" element={<AuthRoutes />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/profile" element={<AuthRoutes />}>
        <Route index element={<Profile />} />
      </Route>
      <Route path="/user" element={<AuthRoutes />}>
        <Route index element={<UserBoard />} />
      </Route>
      <Route path="/admin" element={<AuthRoutes roles={["admin"]} />}>
        <Route index element={<AdminBoard />} />
      </Route>
      <Route path="/mod" element={<AuthRoutes roles={["moderator"]} />}>
        <Route index element={<ModeratorBoard />} />
      </Route>
      <Route path="/error403" element={<Error403 />} />
      <Route path="/error503" element={<Error503 />} />
      <Route path="/error500" element={<Error500 />} />
      <Route
        path="/auth"
        element={
          <GuestRoutes>
            <Auth />
          </GuestRoutes>
        }
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
