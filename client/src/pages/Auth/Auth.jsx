import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Login from "../../components/ui/Login/Login";
import Paragraph from "../../components/ui/Paragraph/Paragraph";
import Register from "../../components/ui/Register/Register";

export default function Auth() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="min-h-screen w-full bg-slate-100 relative">
      <div className="grid lg:grid-cols-2">
        <div className="flex justify-center lg:justify-end pt-12 lg:pt-52 pr-2">
          <Paragraph />
        </div>
        <div className="flex justify-center lg:justify-start pt-12 lg:pt-32 lg:pl-24">
          <Login />
        </div>
      </div>
      <Register />
    </div>
  );
}
