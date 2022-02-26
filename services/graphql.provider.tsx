import React from "react"
import { Provider, Client } from "urql"

const GraphqlProvider: React.FC = ({ children }) => {
  const client = new Client({
    url: `${process.env.NEXT_PUBLIC_API_URL}graphql`,
    fetchOptions: {
      headers: {
        "x-hasura-admin-secret":
          "NZ6nCp4dc7oBr5DRtwJ9SADIH2bpKeTK5tB42sOJh7ZnOkJb3bD00Rl82hhyvfwk",
      },
    },
  })

  return <Provider value={client}>{children}</Provider>
}

export default GraphqlProvider
