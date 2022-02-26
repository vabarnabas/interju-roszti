import React from "react"
import { HiPlusSm } from "react-icons/hi"
import { PlusButtonProps } from "../../services/interfaces"

const PlusButton: React.FC<PlusButtonProps> = ({ onClickFunction }) => {
  return (
    <button
      onClick={() => onClickFunction()}
      className="absolute bottom-6 flex aspect-square h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white hover:bg-emerald-600"
    >
      <HiPlusSm />
    </button>
  )
}

export default PlusButton
