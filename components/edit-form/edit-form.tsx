import React, { SyntheticEvent, useState } from "react"
import { HiX, HiIdentification, HiCalendar } from "react-icons/hi"
import { Applicant } from "../../services/props"
import { BiLink } from "react-icons/bi"
import { BsFillKeyFill } from "react-icons/bs"
import { MdDelete } from "react-icons/md"
import { useMutation } from "urql"
import {
  mutationCreateApplicant,
  mutationUpdateApplicant,
} from "../../services/mutations"
import { v4 as uuidv4 } from "uuid"

interface Props {
  applicant?: Applicant
  mode: "create" | "edit"
  setter: (open: boolean) => void
  resetter: () => void
}

const EditForm: React.FC<Props> = ({ applicant, setter, resetter, mode }) => {
  const [, updateApplicant] = useMutation(mutationUpdateApplicant)
  const [, createApplicant] = useMutation(mutationCreateApplicant)

  const { name, id, formurl, arrival } = applicant || {}

  const [editName, setEditName] = useState<string>(name || "")
  const [editFormUrl, setEditFormUrl] = useState<string>(formurl || "")
  const [editArrival, setEditArrival] = useState<string>(arrival || "")
  const [createId] = useState<string>(id || uuidv4())

  const onFormSubmitWhenCreate = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      await createApplicant({
        object: {
          arrival: editArrival,
          formurl: editFormUrl,
          name: editName,
          id: createId,
        },
      })
    } finally {
      resetter()
      setter(false)
    }
  }

  const onFormSubmitWhenUpdate = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      await updateApplicant({
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
        onSubmit={(e) => {
          mode === "create"
            ? onFormSubmitWhenCreate(e)
            : onFormSubmitWhenUpdate(e)
        }}
        action=""
        className="relative grid rounded-md border bg-slate-50 p-4"
      >
        <div className="flex items-center justify-between">
          <p className=" text-sm font-semibold">
            {mode === "create" ? "Hozzáadás" : "Szerkesztés"}
          </p>
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
              value={id || createId}
              type="text"
              className="w-full rounded border bg-slate-200 py-1 pl-8 pr-2 text-sm outline-none focus:border-emerald-500"
              disabled
            />
          </div>
        </div>
        <div className="mt-5 flex w-full items-center justify-center space-x-2 text-white">
          <button className="rounded-md bg-emerald-500 px-24 py-1.5 text-sm hover:bg-emerald-600">
            Tovább
          </button>
          {mode === "edit" && (
            <button className="rounded-md bg-rose-500 py-1.5 px-3">
              <MdDelete className="text-xl" />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default EditForm
