import React from "react"
import { Provider, Client } from "urql"

const GraphqlProvider: React.FC = ({ children }) => {
  const client = new Client({
    url: "https://prepared-lark-38.hasura.app/v1/graphql",
  })

  return <Provider value={client}>{children}</Provider>
}

export default GraphqlProvider
