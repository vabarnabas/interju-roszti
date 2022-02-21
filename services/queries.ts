export const queryAllApplicants = `
  query {
    applicants_aggregate(order_by: {name: asc}) {
      nodes {
        id
        name
      }
    }
  }
`
