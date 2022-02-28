import React from "react"
import MenuTile from "./menu-tile"

const Menu = () => {
  return (
    <div className="grid h-min place-items-center gap-x-16 gap-y-8 self-center border-inherit sm:grid-cols-2">
      <MenuTile
        title={"Jelentkezők"}
        description={
          "Itt találhatod meg az interjúkra jelentkezőket és itt is tudod módosítani őket."
        }
        link="/applicants"
      />
      <MenuTile
        title={"Értékelés"}
        description={
          "Itt tudod értékelni az egyes jelentkezőket, illetve az adatokat is innen tudod letölteni."
        }
        link="/reviews"
      />
    </div>
  )
}

export default Menu
