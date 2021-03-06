import Head from "next/head"
import React from "react"
import Navbar from "../navbar/navbar"

const Layout: React.FC = ({ children }) => {
  return (
    <div className="h-screen w-screen select-none bg-slate-50 text-slate-600 dark:border-zinc-700 dark:bg-dark-gray dark:text-zinc-200">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        ></meta>
      </Head>
      <Navbar />
      <div className="flex h-full w-full justify-center overflow-y-scroll border-inherit px-6 pt-12 md:items-center">
        {children}
      </div>
    </div>
  )
}

export default Layout
