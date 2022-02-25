import type { NextPage } from "next"
import Layout from "../components/layout"
import Menu from "../components/menu/menu"

const Home: NextPage = () => {
  return (
    <Layout>
      <Menu />
    </Layout>
  )
}

export default Home
