import React from "react"
import { PlusButtonProps } from "../../services/interfaces"
import { BiRefresh } from "react-icons/bi"

const RefreshButton: React.FC<PlusButtonProps> = ({ onClickFunction }) => {
  return (
    <button
      onClick={() => onClickFunction()}
      className="absolute bottom-6 flex aspect-square h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white hover:bg-emerald-600"
    >
      <BiRefresh />
    </button>
  )
}

export default RefreshButton
