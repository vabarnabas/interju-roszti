import type { NextPage } from "next"
import Menu from "../components/menu/menu"
import MenuTile from "../components/menu/menu-tile"
import Navbar from "../components/navbar/navbar"

const Home: NextPage = () => {
  return (
    <div className="h-screen w-screen bg-slate-50">
      <Navbar />
      <div className="flex h-full items-center justify-center pt-16">
        <Menu />
      </div>
    </div>
  )
}

export default Home
