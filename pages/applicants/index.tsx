import React, { useState } from "react"
import Layout from "../../components/layout"
import { useQuery } from "urql"
import { queryAllApplicants } from "../../services/queries"
import Spinner from "../../components/spinner/spinner"
import ApplicantForm from "../../components/applicant-form/applicant-form"
import ApplicantCard from "../../components/applicant-card/applicant-card"
import { Applicant } from "../../services/interfaces"
import Image from "next/image"
import PlusButton from "../../components/plus-button/plus-button"

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

  const { data, fetching } = result

  const onPlusButtonClick = () => {
    setEditMode(false)
    setSelectedEdit({
      arrival: "",
      name: "",
      id: "",
      formurl: "",
    })
    setShowEdit(true)
  }

  return (
    <Layout>
      {!fetching && data && (
        <PlusButton onClickFunction={() => onPlusButtonClick()} />
      )}
      {fetching ? (
        <Spinner />
      ) : (
        <div className="grid h-min w-full gap-4 border-inherit pt-6 pb-24 md:grid-cols-3 md:py-0 lg:grid-cols-4">
          {data && data.applicants_aggregate.nodes.length > 0 ? (
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
            ))
          ) : (
            <div className="relative col-span-4 flex w-min flex-col items-center justify-center justify-self-center">
              <div className="relative h-48 w-48">
                <Image
                  layout="fill"
                  objectFit="contain"
                  src="/images/search_result.svg"
                />
              </div>
              <p className="mt-8 text-center text-sm font-semibold">
                Úgy néz ki, nincsenek még jelentkezők feltöltve.
              </p>
            </div>
          )}
        </div>
      )}
      {showEdit && (
        <ApplicantForm
          mode={editMode ? "edit" : "create"}
          setter={(showEdit) => setShowEdit(showEdit)}
          applicant={selectedEdit}
          resetter={() =>
            reExecuteQuery({ requestPolicy: "cache-and-network" })
          }
        />
      )}
    </Layout>
  )
}

export default Applicants
