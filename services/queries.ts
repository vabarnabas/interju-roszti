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
          communication
          confidence
          creativity
          id
          leadership
          note
          phraseology
          problemsolving
          reviewer {
            name
            id
          }
        }
      }
    }
  }
}

`
