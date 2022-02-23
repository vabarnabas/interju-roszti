export const mutationUpdateApplicant = `
mutation MyMutation($id: uuid = "", $_set: applicants_set_input = {arrival: "", formurl: "", name: ""}) {
  update_applicants_by_pk(pk_columns: {id: $id}, _set: $_set) {
    arrival
    formurl
    id
    name
  }
}
`
