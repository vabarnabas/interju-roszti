import Image from "next/image"
import React, { useState } from "react"
import { HiPlusSm } from "react-icons/hi"
import { useQuery } from "urql"
import Layout from "../../components/layout"
import PlusButton from "../../components/plus-button/plus-button"
import ReviewForm from "../../components/review-form/review-form"
import Spinner from "../../components/spinner/spinner"
import { Review } from "../../services/interfaces"
import { queryAllApplicantsWithReviews } from "../../services/queries"

const Reviews = () => {
  const [showEdit, setShowEdit] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedEdit, setSelectedEdit] = useState<Review>()

  const [result, reExecuteQuery] = useQuery({
    query: queryAllApplicantsWithReviews,
  })

  const { data, fetching, error } = result

  const onPlusButtonClick = () => {
    setEditMode(false)
    // setSelectedEdit()
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
        <div className="grid w-full gap-4 border-inherit md:grid-cols-3 lg:grid-cols-4">
          {data && data.applicants_aggregate.nodes.length > 0 ? (
            data.applicants_aggregate.nodes.map((item: any) => (
              <div key={item.id} className=""></div>
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
        <ReviewForm
          mode={editMode ? "edit" : "create"}
          setter={(showEdit) => setShowEdit(showEdit)}
          review={selectedEdit}
          resetter={() =>
            reExecuteQuery({ requestPolicy: "cache-and-network" })
          }
        />
      )}
    </Layout>
  )
}

export default Reviews
