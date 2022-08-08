function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div>
      <header className="py-4 bg-slate-700 font-semibold text-lg px-5">
        Student Loan Repayment Calculator
      </header>
      <main className="px-5 pt-4">{children}</main>
      <footer className="px-5 text-sm text-gray-500">
        A product of <a href="https://www.benscobie.com">Ben Scobie</a>.
      </footer>
      <style jsx>{`
        header {
          color: white;
        }
      `}</style>
    </div>
  );
}

export default Layout;
