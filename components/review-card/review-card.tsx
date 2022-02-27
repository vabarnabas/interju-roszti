import React from "react"
import { HiExternalLink } from "react-icons/hi"
import { AiTwotoneStar } from "react-icons/ai"
import {
  ApplicantsAggregateNode,
  ApplicantsWithReview,
  Review,
} from "../../services/interfaces"
import { useQuery } from "urql"
import { querySpecificReview } from "../../services/queries"

interface Props {
  review: ApplicantsAggregateNode
  setEditMode: (editMode: boolean) => void
  setSelectedEdit: (applicant: ApplicantsAggregateNode) => void
  setShowEdit: (showEdit: boolean) => void
}

const ReviewCard: React.FC<Props> = ({
  review,
  setEditMode,
  setSelectedEdit,
  setShowEdit,
}) => {
  const { name, id } = review || {}

  const {
    confidence,
    communication,
    phraseology,
    leadership,
    creativity,
    problemsolving,
  } = review.reviews_aggregate.aggregate.avg

  const [specificReview, getSpecificReview] = useQuery({
    query: querySpecificReview,
    variables: { _eq: localStorage.getItem("rosztiToken"), _eq1: id },
  })

  const { data } = specificReview

  return (
    <div className="flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-3 hover:border-emerald-500 dark:border-transparent dark:bg-medium-gray">
      <div className="flex items-center justify-center">
        <div className="divide-y dark:divide-slate-600">
          <p className="mb-1 text-lg font-bold text-emerald-500">{name}</p>
          {review.reviews_aggregate.nodes.length > 0 ? (
            <div className="grid gap-x-4 gap-y-1 pt-2 md:grid-cols-2">
              <div className="flex items-center justify-start text-sm font-bold">
                Magabiztosság:
                <p className="ml-1 text-emerald-500">{confidence.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-start text-sm font-bold">
                Kommunikáció:
                <p className="ml-1 text-emerald-500">
                  {communication.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-start text-sm font-bold">
                Kifejezésmód:
                <p className="ml-1 text-emerald-500">
                  {phraseology.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-start text-sm font-bold">
                Vezető:
                <p className="ml-1 text-emerald-500">{leadership.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-start text-sm font-bold">
                Kreativitás:
                <p className="ml-1 text-emerald-500">{creativity.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-start text-sm font-bold">
                Megoldó Kész.:
                <p className="ml-1 text-emerald-500">
                  {problemsolving.toFixed(2)}
                </p>
              </div>
            </div>
          ) : (
            <p className="pt-1">Nincenek még értékelések.</p>
          )}
        </div>
      </div>
      <div className="ml-6 flex items-center justify-center space-x-3">
        <AiTwotoneStar
          onClick={async () => {
            try {
              await getSpecificReview({ requestPolicy: "network-only" })
              console.log(data)
            } finally {
              setEditMode(false)
              setSelectedEdit(review)
              setShowEdit(true)
            }
          }}
          className="text-xl hover:text-emerald-500"
        />
      </div>
    </div>
  )
}

export default ReviewCard
