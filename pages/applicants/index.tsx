import React from "react"
import Layout from "../../components/layout"
import { useQuery } from "urql"
import { queryAllApplicants } from "../../services/queries"
import Spinner from "../../components/spinner/spinner"

interface Applicant {
  id: string
  name: string
  arrival: string
}

const Applicants = () => {
  const [result, reexecuteQuery] = useQuery({
    query: queryAllApplicants,
  })

  const { data, fetching, error } = result

  return (
    <Layout>
      {fetching ? (
        <Spinner />
      ) : (
        <div className="grid md:grid-cols-4">
          {data &&
            data.applicants_aggregate.nodes.map((item: Applicant) => (
              <div
                key={item.id}
                className="flex cursor-pointer flex-col items-start justify-center rounded-lg border px-6 py-4 hover:border-emerald-500"
              >
                <p className="text-lg font-bold text-emerald-500">
                  {item.name}
                </p>
                <p className="">{item.arrival}</p>
              </div>
            ))}
        </div>
      )}
    </Layout>
  )
}

export default Applicants
