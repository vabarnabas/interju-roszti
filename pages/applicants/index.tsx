import React, { useState } from "react"
import Layout from "../../components/layout"
import { useQuery } from "urql"
import { queryAllApplicants } from "../../services/queries"
import Spinner from "../../components/spinner/spinner"
import { format } from "date-fns"
import { HiExternalLink, HiPlusSm } from "react-icons/hi"
import { MdEdit } from "react-icons/md"
import EditForm from "../../components/edit-form/edit-form"
interface Applicant {
  id: string
  name: string
  arrival: string
  formurl: string
}

const Applicants = () => {
  const [showEdit, setShowEdit] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedEdit, setSelectedEdit] = useState<Applicant>({
    id: "",
    name: "",
    arrival: "",
    formurl: "",
  })
  const [result, reExecuteQuery] = useQuery({
    query: queryAllApplicants,
  })

  const { data, fetching, error } = result

  return (
    <Layout>
      <button
        onClick={() => {
          setEditMode(false)
          setSelectedEdit({
            arrival: "",
            name: "",
            id: "",
            formurl: "",
          })
          setShowEdit(true)
        }}
        className="absolute bottom-6 flex aspect-square h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white hover:bg-emerald-600"
      >
        <HiPlusSm />
      </button>
      {showEdit && (
        <EditForm
          mode={editMode ? "edit" : "create"}
          setter={(showEdit) => setShowEdit(showEdit)}
          applicant={selectedEdit}
          resetter={() =>
            reExecuteQuery({ requestPolicy: "cache-and-network" })
          }
        />
      )}

      {fetching ? (
        <Spinner />
      ) : (
        <div className="grid w-full md:grid-cols-3 lg:grid-cols-4">
          {data &&
            data.applicants_aggregate.nodes.map(
              (item: Applicant, id: number) => (
                <div
                  key={item.id}
                  className="flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-3 hover:border-emerald-500"
                >
                  <div className="flex items-center justify-center">
                    <div className="">
                      <p className="text-lg font-bold text-emerald-500">
                        {item.name}
                      </p>
                      <p className="text-sm">
                        {format(new Date(item.arrival), "yyyy.MM.dd hh:mm")}
                      </p>
                    </div>
                  </div>
                  <div className="ml-6 flex items-center justify-center space-x-3">
                    <HiExternalLink
                      onClick={() => window.open(item.formurl, "_blank")}
                      className="text-xl hover:text-emerald-500"
                    />
                    <MdEdit
                      onClick={() => {
                        setEditMode(true)
                        setSelectedEdit(item)
                        setShowEdit(true)
                      }}
                      className="text-xl hover:text-emerald-500"
                    />
                  </div>
                </div>
              )
            )}
        </div>
      )}
    </Layout>
  )
}

export default Applicants
