import React, { SyntheticEvent, useState } from "react"
import { HiX, HiIdentification } from "react-icons/hi"
import { Review } from "../../services/interfaces"
import { BsFillKeyFill } from "react-icons/bs"
import { MdDelete, MdLeaderboard, MdHowToVote } from "react-icons/md"
import { RiStickyNoteFill } from "react-icons/ri"
import { useMutation } from "urql"
import {
  mutationCreateApplicant,
  mutationDeleteApplicant,
  mutationUpdateApplicant,
} from "../../services/mutations"
import { v4 as uuidv4 } from "uuid"
import Spinner from "../spinner/spinner"

interface Props {
  review?: Review
  mode: "create" | "edit"
  setter: (open: boolean) => void
  resetter: () => void
}

const ReviewForm: React.FC<Props> = ({ review, setter, resetter, mode }) => {
  const [, updateApplicant] = useMutation(mutationUpdateApplicant)
  const [, createApplicant] = useMutation(mutationCreateApplicant)
  const [, deleteApplicant] = useMutation(mutationDeleteApplicant)

  const {
    name,
    id,
    confidence,
    communication,
    phraseology,
    leadership,
    creativity,
    problemsolving,
    note,
    verdict,
  } = review || {}

  const [range] = useState({
    min: 1,
    max: 5,
  })

  const [loading, setLoading] = useState(false)

  const [editName, setEditName] = useState<string>(name || "")
  const [editNote, setEditNote] = useState<string>(note || "")
  const [editVerdict, setEditVerdict] = useState<string>(verdict || "")

  const [editConfidence, setEditConfidence] = useState<number>(confidence || 0)
  const [editCommunication, setEditCommunication] = useState<number>(
    communication || 0
  )
  const [editPhraseology, setEditPhraseology] = useState<number>(
    phraseology || 0
  )
  const [editLeadership, setEditLeadership] = useState<number>(leadership || 0)
  const [editCreativity, setEditCreativity] = useState<number>(creativity || 0)
  const [editProblemsolving, setEditProblemsolving] = useState<number>(
    problemsolving || 0
  )
  const [createId] = useState<string>(id || uuidv4())

  const onFormSubmitWhenCreate = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await createApplicant({
        object: {
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
        className="relative mx-6 grid grid-cols-2 gap-x-2 overflow-hidden rounded-md border border-inherit bg-slate-50 p-4 dark:border-transparent dark:bg-medium-gray"
      >
        <div className="col-span-2 flex items-center justify-between">
          <p className=" text-sm font-semibold">
            {mode === "create" ? "Hozzáadás" : "Szerkesztés"}
          </p>
          <HiX
            onClick={() => setter(false)}
            className=" cursor-pointer hover:text-slate-500 dark:hover:text-slate-400"
          />
        </div>
        <div>
          <p className="mt-3 mb-1 pl-1 text-xs font-light">ID</p>
          <div className="relative flex items-center justify-center">
            <div className="absolute left-2 text-slate-500 dark:text-slate-200">
              <BsFillKeyFill />
            </div>
            <input
              placeholder=""
              value={createId}
              type="text"
              className="form-input border-transparent bg-zinc-800"
              required
              disabled
            />
          </div>
        </div>
        <div>
          <p className="mt-3 mb-1 pl-1 text-xs font-light">Név</p>
          <div className="relative flex items-center justify-center">
            <div className="absolute left-2 text-slate-500 dark:text-slate-200">
              <HiIdentification />
            </div>
            <input
              placeholder=""
              value={editName}
              type="text"
              className="form-input border-transparent bg-zinc-800"
              required
              disabled
            />
          </div>
        </div>
        <div>
          <p className="mt-3 mb-1 pl-1 text-xs font-light">Magabiztosság</p>
          <div className="relative flex items-center justify-center">
            <div className="absolute left-2 text-slate-500 dark:text-slate-200">
              <MdLeaderboard />
            </div>
            <input
              type="number"
              value={editConfidence || ""}
              onChange={(e) =>
                setEditConfidence(
                  Math.max(
                    range.min,
                    Math.min(range.max, parseInt(e.target.value))
                  )
                )
              }
              className="form-input"
              required
            />
          </div>
        </div>
        <div>
          <p className="mt-3 mb-1 pl-1 text-xs font-light">Kommunikáció</p>
          <div className="relative flex items-center justify-center">
            <div className="absolute left-2 text-slate-500 dark:text-slate-200">
              <MdLeaderboard />
            </div>
            <input
              type="number"
              value={editCommunication || ""}
              onChange={(e) =>
                setEditCommunication(
                  Math.max(
                    range.min,
                    Math.min(range.max, parseInt(e.target.value))
                  )
                )
              }
              className="form-input"
              required
            />
          </div>
        </div>
        <div>
          <p className="mt-3 mb-1 pl-1 text-xs font-light">Kifejezésmód</p>
          <div className="relative flex items-center justify-center">
            <div className="absolute left-2 text-slate-500 dark:text-slate-200">
              <MdLeaderboard />
            </div>
            <input
              type="number"
              value={editPhraseology || ""}
              onChange={(e) =>
                setEditPhraseology(
                  Math.max(
                    range.min,
                    Math.min(range.max, parseInt(e.target.value))
                  )
                )
              }
              className="form-input"
              required
            />
          </div>
        </div>
        <div>
          <p className="mt-3 mb-1 pl-1 text-xs font-light">Vezetői Készség</p>
          <div className="relative flex items-center justify-center">
            <div className="absolute left-2 text-slate-500 dark:text-slate-200">
              <MdLeaderboard />
            </div>
            <input
              type="number"
              value={editLeadership || ""}
              onChange={(e) =>
                setEditLeadership(
                  Math.max(
                    range.min,
                    Math.min(range.max, parseInt(e.target.value))
                  )
                )
              }
              className="form-input"
              required
            />
          </div>
        </div>
        <div>
          <p className="mt-3 mb-1 pl-1 text-xs font-light">Kreativitás</p>
          <div className="relative flex items-center justify-center">
            <div className="absolute left-2 text-slate-500 dark:text-slate-200">
              <MdLeaderboard />
            </div>
            <input
              type="number"
              value={editCreativity || ""}
              onChange={(e) =>
                setEditCreativity(
                  Math.max(
                    range.min,
                    Math.min(range.max, parseInt(e.target.value))
                  )
                )
              }
              className="form-input"
              required
            />
          </div>
        </div>
        <div>
          <p className="mt-3 mb-1 pl-1 text-xs font-light">Probléma Megoldás</p>
          <div className="relative flex items-center justify-center">
            <div className="absolute left-2 text-slate-500 dark:text-slate-200">
              <MdLeaderboard />
            </div>
            <input
              type="number"
              value={editProblemsolving || ""}
              onChange={(e) =>
                setEditProblemsolving(
                  Math.max(
                    range.min,
                    Math.min(range.max, parseInt(e.target.value))
                  )
                )
              }
              className="form-input"
              required
            />
          </div>
        </div>
        <div className="col-span-2">
          <p className="mt-3 mb-1 pl-1 text-xs font-light">Komment</p>
          <div className="relative flex items-center justify-center">
            <div className="absolute left-2 text-slate-500 dark:text-slate-200">
              <RiStickyNoteFill />
            </div>
            <input
              type="text"
              value={editNote}
              onChange={(e) => setEditNote(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        <div className="col-span-2 mt-5 flex w-full items-center justify-center space-x-2 text-white">
          <button className="w-full rounded-md bg-emerald-500 px-24 py-1.5 text-sm hover:bg-emerald-600">
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

export default ReviewForm
