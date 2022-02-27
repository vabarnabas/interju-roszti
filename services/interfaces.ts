export interface MenuTileProps {
  title: string
  description: string
  link: string
}

export interface PlusButtonProps {
  onClickFunction: () => void
}

export interface Applicant {
  id: string
  name: string
  arrival: string
  formurl: string
}

export interface Review {
  applicantid: string
  communication: number
  confidence: number
  creativity: number
  leadership: number
  note: string
  phraseology: number
  problemsolving: number
  reviewerid: string
  id: string
}

export interface ApplicantsWithReview {
  data: Data
}

export interface Data {
  applicants_aggregate: ApplicantsAggregate
}

export interface ApplicantsAggregate {
  nodes: ApplicantsAggregateNode[]
}

export interface ApplicantsAggregateNode {
  arrival: Date
  formurl: string
  id: string
  name: string
  reviews_aggregate: ReviewsAggregate
}

export interface ReviewsAggregate {
  nodes: ReviewsAggregateNode[]
  aggregate: Aggregate
}

export interface Aggregate {
  avg: Avg
}

export interface Avg {
  communication: number
  confidence: number
  creativity: number
  leadership: number
  phraseology: number
  problemsolving: number
}

export interface ReviewsAggregateNode {
  communication: number
  confidence: number
  creativity: number
  id: string
  leadership: number
  note: string
  phraseology: number
  problemsolving: number
  reviewer: Reviewer
}

export interface Reviewer {
  name: string
  id: string
}
