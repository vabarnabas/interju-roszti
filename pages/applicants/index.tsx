import React from "react"
import Layout from "../../components/layout"
import { useQuery } from "urql"
import { queryAllApplicants } from "../../services/queries"
import Spinner from "../../components/spinner/spinner"
import { format } from "date-fns"
import { HiExternalLink } from "react-icons/hi"
import { MdEdit } from "react-icons/md"

interface Applicant {
  id: string
  name: string
  arrival: string
  formurl: string
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
                className="flex cursor-pointer items-center justify-between rounded-lg border p-4 hover:border-emerald-500"
              >
                <div className="">
                  <p className="text-lg font-bold text-emerald-500">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-sm">
                    {format(new Date(item.arrival), "yyyy.MM.dd hh:mm")}
                  </p>
                </div>
                <div className="ml-6 flex items-center justify-center space-x-2">
                  <HiExternalLink
                    onClick={() => window.open(item.formurl, "_blank")}
                    className="text-xl hover:text-emerald-500"
                  />
                  <MdEdit
                    onClick={() => window.open(item.formurl, "_blank")}
                    className="text-xl hover:text-emerald-500"
                  />
                </div>
              </div>
            ))}
        </div>
      )}
    </Layout>
  )
}

export default Applicants
