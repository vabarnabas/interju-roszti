import React, { SyntheticEvent, useState } from "react"
import { HiX, HiIdentification, HiCalendar } from "react-icons/hi"
import { Applicant } from "../../services/props"
import { BiLink } from "react-icons/bi"
import { BsFillKeyFill } from "react-icons/bs"
import { useMutation } from "urql"
import { mutationUpdateApplicant } from "../../services/mutations"

interface Props {
  applicant: Applicant
  setter: (open: boolean) => void
  resetter: () => void
}

const EditForm: React.FC<Props> = ({ applicant, setter, resetter }) => {
  const [, updateApplicant] = useMutation(mutationUpdateApplicant)

  const { name, id, formurl, arrival } = applicant

  const [editName, setEditName] = useState<string>(name)
  const [editFormUrl, setEditFormUrl] = useState<string>(formurl)
  const [editArrival, setEditArrival] = useState<string>(arrival)

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      updateApplicant({
        id,
        _set: { arrival: editArrival, formurl: editFormUrl, name: editName },
      })
    } finally {
      resetter()
      setter(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <form
        onSubmit={onFormSubmit}
        action=""
        className="w relative rounded-md border bg-slate-50 p-4"
      >
        <div className="flex items-center justify-between">
          <p className=" text-sm font-semibold">Szerkesztés</p>
          <HiX
            onClick={() => setter(false)}
            className=" cursor-pointer hover:text-slate-500"
          />
        </div>
        <p className="mb-1 mt-3 pl-1 text-xs font-light">Név</p>
        <div className="relative flex items-center justify-center">
          <HiIdentification className="absolute left-2 text-slate-500" />
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            type="text"
            className="w-full rounded border bg-slate-50 py-1 pl-8 pr-2 text-sm outline-none focus:border-emerald-500"
          />
        </div>
        <p className="mt-3 mb-1 pl-1 text-xs font-light">Form Link</p>
        <div className="relative flex items-center justify-center">
          <BiLink className="absolute left-2 text-slate-500" />
          <input
            value={editFormUrl}
            onChange={(e) => setEditFormUrl(e.target.value)}
            type="text"
            className="w-full rounded border bg-slate-50 py-1 pl-8 text-sm outline-none focus:border-emerald-500"
          />
        </div>
        <p className="mt-3 mb-1 pl-1 text-xs font-light">Érkezés</p>
        <div className="relative flex items-center justify-center">
          <HiCalendar className="absolute left-2 text-slate-500" />
          <input
            value={editArrival}
            onChange={(e) => setEditArrival(e.target.value)}
            type="text"
            className="w-full rounded border bg-slate-50 py-1 pl-8 pr-2 text-sm outline-none focus:border-emerald-500"
          />
        </div>
        <div className="">
          <p className="mt-3 mb-1 pl-1 text-xs font-light">ID</p>
          <div className="relative flex items-center justify-center">
            <BsFillKeyFill className="absolute left-2 text-slate-500" />
            <input
              value={id}
              type="text"
              className="w-full rounded border bg-slate-200 py-1 pl-8 pr-2 text-sm outline-none focus:border-emerald-500"
              disabled
            />
          </div>
        </div>
        <button className="mt-5 w-full rounded-md bg-emerald-500 px-24 py-1.5 text-sm text-white hover:bg-emerald-600">
          Szerkesztés
        </button>
      </form>
    </div>
  )
}

export default EditForm
