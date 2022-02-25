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
mutation CreateApplicant($object: applicants_insert_input = {}) {
  insert_applicants_one(object: $object) {
    id
  }
}
`
