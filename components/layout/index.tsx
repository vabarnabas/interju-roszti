import React from "react"
import Navbar from "../navbar/navbar"

const Layout: React.FC = ({ children }) => {
  return (
    <div className="h-screen w-screen bg-slate-50 text-slate-600">
      <Navbar />
      <div className="flex h-full items-center justify-center px-6 pt-12">
        {children}
      </div>
    </div>
  )
}

export default Layout
