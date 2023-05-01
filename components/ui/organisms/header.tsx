import { useEffect, useState } from "react";
import { X } from "react-bootstrap-icons";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <header className="bg-sky-600 flex justify-center shadow">
        <div className="flex w-full max-w-7xl py-4 px-8 gap-x-4 text-white items-center">
          <div className="flex-grow font-semibold text-lg">
            Student Loan Repayment Calculator
          </div>
          <div className="hidden sm:block">
            <a href="https://forms.gle/FWqyT5SUgumSKJG46">Share feedback</a>
          </div>
          <div className="sm:hidden flex w-8 h-8 items-center justify-center">
            {!isNavOpen ? (
              <div
                className="block sm:hidden space-y-2 cursor-pointer p-2 group"
                onClick={() => setIsNavOpen(true)}
              >
                <div className="h-0.5 w-8 bg-white rounded-lg group-hover:bg-slate-200"></div>
                <div className="h-0.5 w-8 bg-white rounded-lg group-hover:bg-slate-200"></div>
                <div className="h-0.5 w-8 bg-white rounded-lg group-hover:bg-slate-200"></div>
              </div>
            ) : (
              <div
                className="flex items-center justify-center hover:bg-sky-700 p-1 rounded-lg cursor-pointer"
                onClick={() => setIsNavOpen(false)}
              >
                <X className="inline" size={30} />
              </div>
            )}
          </div>
        </div>
      </header>
      {isNavOpen && (
        <div className="flex sm:hidden items-center justify-center bg-white shadow">
          <div className="flex flex-col text-lg w-full">
            <a
              href="https://forms.gle/FWqyT5SUgumSKJG46"
              className="hover:decoration-sky-600 hover:underline-offset-4 hover:decoration-2 w-full text-center py-2"
            >
              Share feedback
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
