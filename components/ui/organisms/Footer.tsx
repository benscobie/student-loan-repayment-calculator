import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="mb-5 px-5 text-center text-sm text-gray-500">
      <div className="flex flex-col items-center space-y-2 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
        <span>An app by <a href="https://www.benscobie.com">Ben Scobie</a>.</span>
        <Link href="/privacy" className="hover:text-gray-700 hover:underline">
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}

export default Footer
