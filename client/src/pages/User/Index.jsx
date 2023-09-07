import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/ui/Navbar/Navbar'

export default function Index() {
  return (
    <div className="min-h-screen w-screen bg-[#F0F2F5]">
      <Navbar />
      <Outlet />
    </div>
  );
}
