import React from "react"
import { format } from "date-fns"
import { HiExternalLink } from "react-icons/hi"
import { MdEdit } from "react-icons/md"
import { Applicant } from "../../services/props"

interface Props {
  applicant: Applicant
  setEditMode: (editMode: boolean) => void
  setSelectedEdit: (applicant: Applicant) => void
  setShowEdit: (showEdit: boolean) => void
}

const ApplicantCard: React.FC<Props> = ({
  applicant,
  setEditMode,
  setSelectedEdit,
  setShowEdit,
}) => {
  const { name, id, arrival, formurl } = applicant

  return (
    <div className="flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-3 hover:border-emerald-500 dark:border-transparent dark:bg-medium-gray">
      <div className="flex items-center justify-center">
        <div className="">
          <p className="text-lg font-bold text-emerald-500">{name}</p>
          <p className="text-sm">
            {format(new Date(arrival), "yyyy.MM.dd HH:mm")}
          </p>
        </div>
      </div>
      <div className="ml-6 flex items-center justify-center space-x-3">
        <HiExternalLink
          onClick={() => window.open(formurl, "_blank")}
          className="text-xl hover:text-emerald-500"
        />
        <MdEdit
          onClick={() => {
            setEditMode(true)
            setSelectedEdit(applicant)
            setShowEdit(true)
          }}
          className="text-xl hover:text-emerald-500"
        />
      </div>
    </div>
  )
}

export default ApplicantCard
