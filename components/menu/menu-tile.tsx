import React from "react"
import Link from "next/link"
import { MenuTileProps } from "../../services/props"
import { HiArrowSmRight } from "react-icons/hi"

const MenuTile: React.FC<MenuTileProps> = ({ title, description, link }) => {
  return (
    <Link href={link}>
      <div className="group flex aspect-square h-64 cursor-pointer select-none flex-col rounded-xl border p-4 hover:border-emerald-500 dark:border-transparent dark:bg-medium-gray">
        <p className="text-4xl font-bold text-emerald-500">{title}</p>
        <p className="mt-2">{description}</p>
        <p className="mt-auto flex items-center font-semibold text-emerald-500">
          Tovább
          <HiArrowSmRight className="ml-1 group-hover:ml-2" />
        </p>
      </div>
    </Link>
  )
}

export default MenuTile
