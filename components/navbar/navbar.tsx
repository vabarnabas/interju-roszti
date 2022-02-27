import Link from "next/link"
import { SyntheticEvent, useEffect, useState } from "react"
import { BsFillKeyFill } from "react-icons/bs"
import { HiX } from "react-icons/hi"
import { IoLogIn } from "react-icons/io5"
import { useQuery } from "urql"
import { queryAllReviewers } from "../../services/queries"
import Spinner from "../spinner/spinner"

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [loginToken, setLoginToken] = useState("")
  const [rosztiToken, setRosztiToken] = useState("")
  const [renderCount, setRenderCount] = useState(0)
  const [reviewer, getReviewer] = useQuery({ query: queryAllReviewers })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("rosztiToken") !== null) {
      setRosztiToken(localStorage.getItem("rosztiToken") || "")
    }
  }, [renderCount])

  const { data, fetching } = reviewer

  const onLogin = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await getReviewer({ requestPolicy: "network-only" })
      if (
        data.reviewer_aggregate.nodes
          .map((item: { id: string }) => {
            return item.id
          })
          .includes(loginToken)
      ) {
        localStorage.setItem("rosztiToken", loginToken)
        setRenderCount(renderCount + 1)
        setIsLogin(false)
      }
    } finally {
      setLoginToken("")
      setLoading(false)
    }
  }

  return (
    <div className="fixed top-0 left-0 flex h-14 w-full items-center justify-between border-b border-inherit bg-inherit px-6">
      <Link href="/">
        <div className="flex cursor-pointer select-none items-baseline justify-center font-semibold">
          <p className="">Interjú</p>
          <p className="ml-1 font-bold text-emerald-500">RÖszTI</p>
          <p className="text-sm">v6</p>
        </div>
      </Link>
      {isLogin && (
        <div className="fixed inset-0 flex items-center justify-center border-inherit bg-black bg-opacity-30">
          <form
            onSubmit={(e) => onLogin(e)}
            action=""
            className="relative mx-6 grid gap-x-2 overflow-hidden rounded-md border border-inherit bg-slate-50 p-4 dark:border-transparent dark:bg-medium-gray"
          >
            {fetching && (
              <div className="absolute inset-0 flex items-center justify-center bg-dark-gray/60">
                <Spinner />
              </div>
            )}
            <div className="col-span-2 flex items-center justify-between">
              <p className=" text-sm font-semibold">Bejelentkezés</p>
              <HiX
                onClick={() => setIsLogin(false)}
                className=" cursor-pointer hover:text-slate-500 dark:hover:text-slate-400"
              />
            </div>
            <div>
              <p className="mt-3 mb-1 pl-1 text-xs font-light">Login Token</p>
              <div className="relative flex items-center justify-center">
                <div className="absolute left-2 text-slate-500 dark:text-slate-200">
                  <BsFillKeyFill />
                </div>
                <input
                  placeholder=""
                  value={loginToken}
                  onChange={(e) => setLoginToken(e.target.value)}
                  type="text"
                  className="form-input"
                  required
                />
              </div>
            </div>
            <div></div>
            <button className="mt-4 w-full rounded-md bg-emerald-500 px-24 py-1.5 text-sm hover:bg-emerald-600">
              Tovább
            </button>
          </form>
        </div>
      )}
      {rosztiToken ? (
        <p className="text-sm text-emerald-500 hover:text-emerald-600">
          {rosztiToken}
        </p>
      ) : (
        <div className="">
          <button
            onClick={() => setIsLogin(true)}
            className="flex items-center justify-center py-0.5 px-1 font-semibold text-emerald-500 hover:text-emerald-600"
          >
            <IoLogIn className="mr-0.5" /> Belépés
          </button>
        </div>
      )}
    </div>
  )
}

export default Navbar
