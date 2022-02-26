import React, { useState } from "react"
import Layout from "../../components/layout"
import { useQuery } from "urql"
import { queryAllApplicants } from "../../services/queries"
import Spinner from "../../components/spinner/spinner"
import { HiPlusSm } from "react-icons/hi"
import EditForm from "../../components/edit-form/edit-form"
import ApplicantCard from "../../components/applicant-card/applicant-card"
import { Applicant } from "../../services/props"

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
      {!fetching && data && (
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
      )}
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
        <div className="grid w-full gap-4 border-inherit md:grid-cols-3 lg:grid-cols-4">
          {data &&
            data.applicants_aggregate.nodes.map((item: Applicant) => (
              <ApplicantCard
                applicant={item}
                setEditMode={(editMode) => setEditMode(editMode)}
                setSelectedEdit={(selectedEdit) =>
                  setSelectedEdit(selectedEdit)
                }
                setShowEdit={(showEdit) => setShowEdit(showEdit)}
                key={item.id}
              />
            ))}
        </div>
      )}
    </Layout>
  )
}

export default Applicants
