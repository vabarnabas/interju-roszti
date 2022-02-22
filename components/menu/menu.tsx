import React from "react"
import MenuTile from "./menu-tile"

const Menu = () => {
  return (
    <div className="grid gap-x-16 gap-y-8 sm:grid-cols-2">
      <MenuTile
        title={"Időpontok"}
        description={
          "Itt találhatod meg az interjúk pontos időbeosztását és itt is tudod módosítani őket."
        }
        link="/applicants"
      />
      <MenuTile
        title={"Értékelés"}
        description={
          "Itt tudod értékelni az egyes jelentkezőket, illetve az adatokat is innen tudod letölteni."
        }
        link="/review"
      />
    </div>
  )
}

export default Menu
