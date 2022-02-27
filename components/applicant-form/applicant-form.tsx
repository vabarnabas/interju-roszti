import React, { SyntheticEvent, useState } from "react"
import { HiX, HiIdentification, HiCalendar } from "react-icons/hi"
import { Applicant } from "../../services/interfaces"
import { BiLink } from "react-icons/bi"
import { BsFillKeyFill } from "react-icons/bs"
import { MdDelete } from "react-icons/md"
import { useMutation } from "urql"
import {
  mutationCreateApplicant,
  mutationDeleteApplicant,
  mutationUpdateApplicant,
} from "../../services/mutations"
import { v4 as uuidv4 } from "uuid"
import Spinner from "../spinner/spinner"

interface Props {
  applicant?: Applicant
  mode: "create" | "edit"
  setter: (open: boolean) => void
  resetter: () => void
}

const ApplicantForm: React.FC<Props> = ({
  applicant,
  setter,
  resetter,
  mode,
}) => {
  const [, updateApplicant] = useMutation(mutationUpdateApplicant)
  const [, createApplicant] = useMutation(mutationCreateApplicant)
  const [, deleteApplicant] = useMutation(mutationDeleteApplicant)

  const { name, id, formurl, arrival } = applicant || {}

  const [loading, setLoading] = useState(false)

  const [editName, setEditName] = useState<string>(name || "")
  const [editFormUrl, setEditFormUrl] = useState<string>(formurl || "")
  const [editArrival, setEditArrival] = useState<string>(arrival || "")
  const [createId] = useState<string>(id || uuidv4())

  const onFormSubmitWhenCreate = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await createApplicant({
        object: {
          arrival: new Date(editArrival),
          formurl: editFormUrl,
          name: editName,
          id: createId,
        },
      })
    } finally {
      resetter()
      setLoading(false)
      setter(false)
    }
  }

  const onFormSubmitWhenUpdate = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await updateApplicant({
        id,
        _set: {
          arrival: new Date(editArrival),
          formurl: editFormUrl,
          name: editName,
        },
      })
    } finally {
      resetter()
      setLoading(false)
      setter(false)
    }
  }

  const onApplicantDelete = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await deleteApplicant({
        id,
      })
    } finally {
      resetter()
      setLoading(false)
      setter(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center border-inherit bg-black bg-opacity-30">
      <form
        onSubmit={(e) => {
          mode === "create"
            ? onFormSubmitWhenCreate(e)
            : onFormSubmitWhenUpdate(e)
        }}
        action=""
        className="relative grid overflow-hidden rounded-md border border-inherit bg-slate-50 p-4 dark:border-transparent dark:bg-medium-gray"
      >
        <div className="flex items-center justify-between">
          <p className=" text-sm font-semibold">
            {mode === "create" ? "Hozzáadás" : "Szerkesztés"}
          </p>
          <HiX
            onClick={() => setter(false)}
            className=" cursor-pointer hover:text-slate-500 dark:hover:text-slate-400"
          />
        </div>
        <div className="">
          <p className="mb-1 mt-3 pl-1 text-xs font-light">Név</p>
          <div className="relative flex items-center justify-center">
            <HiIdentification className="absolute left-2 text-slate-500 dark:text-slate-200" />
            <input
              placeholder="Név"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              type="text"
              className="form-input"
              required
            />
          </div>
        </div>
        <div>
          <p className="mt-3 mb-1 pl-1 text-xs font-light">Form Link</p>
          <div className="relative flex items-center justify-center">
            <BiLink className="absolute left-2 text-slate-500 dark:text-slate-200" />
            <input
              placeholder="Form Link"
              value={editFormUrl}
              onChange={(e) => setEditFormUrl(e.target.value)}
              type="text"
              className="form-input"
              required
            />
          </div>
        </div>
        <div className="">
          <p className="mt-3 mb-1 pl-1 text-xs font-light">Érkezés</p>
          <div className="relative flex items-center justify-center">
            <HiCalendar className="absolute left-2 text-slate-500 dark:text-slate-200" />
            <input
              placeholder="Érkezés"
              value={editArrival}
              onChange={(e) => setEditArrival(e.target.value)}
              type="text"
              className="form-input"
              required
            />
          </div>
        </div>
        <div className="">
          <p className="mt-3 mb-1 pl-1 text-xs font-light">ID</p>
          <div className="relative flex items-center justify-center">
            <BsFillKeyFill className="absolute left-2 text-slate-500 dark:text-slate-200" />
            <input
              value={id || createId}
              type="text"
              className="form-input select-none bg-slate-200 dark:bg-zinc-800"
              disabled
            />
          </div>
        </div>
        <div className="mt-5 flex w-full items-center justify-center space-x-2 text-white">
          <button className="w-full rounded-md bg-emerald-500 px-24 py-1.5 text-sm hover:bg-emerald-600 sm:w-auto">
            Tovább
          </button>
          {mode === "edit" && (
            <button
              onClick={(e) => onApplicantDelete(e)}
              className="rounded-md bg-rose-500 py-1.5 px-3 hover:bg-rose-600"
            >
              <MdDelete className="text-xl" />
            </button>
          )}
        </div>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-gray/60">
            <Spinner />
          </div>
        )}
      </form>
    </div>
  )
}

export default ApplicantForm
