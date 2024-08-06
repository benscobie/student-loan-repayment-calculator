import { useState } from 'react'
import { X } from 'react-bootstrap-icons'

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <>
      <header className="flex justify-center bg-sky-600 shadow">
        <div className="flex w-full max-w-7xl items-center gap-x-4 px-8 py-4 text-white">
          <div className="grow text-lg font-semibold">
            Student Loan Repayment Calculator
          </div>
          <div className="hidden sm:block">
            <a
              href="https://forms.gle/FWqyT5SUgumSKJG46"
              className="hover:underline-offset-4"
            >
              Share feedback
            </a>
          </div>
          <div className="flex size-8 items-center justify-center sm:hidden">
            {!isNavOpen ? (
              <button
                type="button"
                className="group block cursor-pointer space-y-2 p-2 sm:hidden"
                onClick={() => setIsNavOpen(true)}
              >
                <div className="h-0.5 w-8 rounded-lg bg-white group-hover:bg-slate-200"></div>
                <div className="h-0.5 w-8 rounded-lg bg-white group-hover:bg-slate-200"></div>
                <div className="h-0.5 w-8 rounded-lg bg-white group-hover:bg-slate-200"></div>
              </button>
            ) : (
              <button
                type="button"
                className="flex cursor-pointer items-center justify-center rounded-lg p-1 hover:bg-sky-700"
                onClick={() => setIsNavOpen(false)}
              >
                <X className="inline" size={30} />
              </button>
            )}
          </div>
        </div>
      </header>
      {isNavOpen && (
        <div className="mb-4 flex items-center justify-center bg-white shadow sm:hidden">
          <div className="flex w-full flex-col text-lg">
            <a
              href="https://forms.gle/FWqyT5SUgumSKJG46"
              className="w-full py-2 text-center hover:decoration-sky-600 hover:decoration-2 hover:underline-offset-4"
            >
              Share feedback
            </a>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
