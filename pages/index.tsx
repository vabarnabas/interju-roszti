import type { NextPage } from "next"
import Layout from "../components/layout"
import Menu from "../components/menu/menu"
import MenuTile from "../components/menu/menu-tile"
import Navbar from "../components/navbar/navbar"

const Home: NextPage = () => {
  return (
    <Layout>
      <Menu />
    </Layout>
  )
}

export default Home
