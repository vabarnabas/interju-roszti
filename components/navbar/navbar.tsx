import Link from "next/link"
import { IoLogIn } from "react-icons/io5"

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 flex h-14 w-full items-center justify-between border-b bg-slate-50 px-6">
      <Link href="/">
        <div className="flex cursor-pointer select-none items-baseline justify-center font-semibold text-slate-600">
          <p className="">Interjú</p>
          <p className="ml-1 font-bold text-emerald-500">RÖszTI</p>
          <p className="text-sm">v6</p>
        </div>
      </Link>

      <div className="">
        <button className="flex items-center justify-center py-0.5 px-1 font-semibold text-emerald-500 hover:text-emerald-600">
          <IoLogIn className="mr-0.5" /> Belépés
        </button>
      </div>
    </div>
  )
}

export default Navbar
