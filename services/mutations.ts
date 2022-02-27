export const mutationUpdateApplicant = `
mutation UpdateApplicant($id: uuid = "", $_set: applicants_set_input = {arrival: "", formurl: "", name: ""}) {
  update_applicants_by_pk(pk_columns: {id: $id}, _set: $_set) {
    arrival
    formurl
    id
    name
  }
}
`

export const mutationCreateApplicant = `
mutation CreateApplicants($object: applicants_insert_input = {arrival: "", formurl: "", id: "", name: ""}) {
  insert_applicants_one(object: $object) {
    id
  }
}
`

export const mutationDeleteApplicant = `
mutation DeleteApplicant($id: uuid = "") {
  delete_applicants_by_pk(id: $id) {
    id
  }
}
`
export const mutationCreateReview = `
mutation MyMutation($object: reviews_insert_input = {applicantid: "", communication: 0, confidence: 0, creativity: 0, id: "", leadership: 0, note: "", phraseology: 0, problemsolving: 0, reviewerid: ""}) {
  insert_reviews_one(object: $object) {
    id
    applicantid
    reviewerid
  }
}
`
