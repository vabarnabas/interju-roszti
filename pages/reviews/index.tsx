import Image from "next/image"
import React, { useState } from "react"
import { useQuery } from "urql"
import Layout from "../../components/layout"
import PlusButton from "../../components/plus-button/plus-button"
import RefreshButton from "../../components/refresh-button/refresh-button"
import ReviewCard from "../../components/review-card/review-card"
import ReviewForm from "../../components/review-form/review-form"
import Spinner from "../../components/spinner/spinner"
import { ApplicantsAggregateNode, Review } from "../../services/interfaces"
import { queryAllApplicantsWithReviews } from "../../services/queries"

const Reviews = () => {
  const [showEdit, setShowEdit] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedEdit, setSelectedEdit] = useState<ApplicantsAggregateNode>()

  const [result, reExecuteQuery] = useQuery({
    query: queryAllApplicantsWithReviews,
  })

  const { data, fetching } = result

  const onRefreshButtonClick = async () => {
    await reExecuteQuery({ requestPolicy: "network-only" })
  }

  return (
    <Layout>
      {!fetching && data && (
        <RefreshButton onClickFunction={() => onRefreshButtonClick()} />
      )}
      {fetching ? (
        <Spinner />
      ) : (
        <div className="grid w-full gap-4 border-inherit py-6 md:grid-cols-2 md:py-0 lg:grid-cols-2 xl:grid-cols-4">
          {data && data.applicants_aggregate.nodes.length > 0 ? (
            data.applicants_aggregate.nodes.map(
              (item: ApplicantsAggregateNode) => (
                <ReviewCard
                  key={item.id}
                  review={item}
                  setEditMode={(editMode: boolean) => setEditMode(editMode)}
                  setSelectedEdit={(selectedEdit: ApplicantsAggregateNode) =>
                    setSelectedEdit(selectedEdit)
                  }
                  setShowEdit={(showEdit: boolean) => setShowEdit(showEdit)}
                ></ReviewCard>
              )
            )
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
        <ReviewForm
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

export default Reviews
