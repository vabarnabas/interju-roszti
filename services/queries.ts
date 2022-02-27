export const queryAllApplicants = `
  query getAllApplicants{
    applicants_aggregate(order_by: {arrival: asc}) {
      nodes {
        id
        name
        arrival
        formurl
      }
    }
  }
`

export const queryAllApplicantsWithReviews = `
query getAllApplicantsWithReviews{
  applicants_aggregate(order_by: {arrival: asc}) {
    nodes {
      arrival
      formurl
      id
      name
      reviews_aggregate {
        nodes {
          id
          leadership
          note
          phraseology
          problemsolving
          reviewer {
            name
            id
          }
          creativity
          confidence
          communication
        }
        aggregate {
          avg {
            communication
            confidence
            creativity
            leadership
            phraseology
            problemsolving
          }
        }
      }
    }
  }
}
`

export const queryAllReviewers = `
query getAllReviewers{
  reviewer_aggregate {
    nodes {
      id
    }
  }
}
`
