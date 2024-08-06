import { ReactNode } from 'react'
import Footer from './ui/organisms/Footer'
import Header from './ui/organisms/Header'
import Head from 'next/head'

interface LayoutProps {
  children?: ReactNode | undefined
  className?: string
}

function Layout({ children, className }: LayoutProps) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className={className}>
        <Header />
        <main className="container mx-auto my-8 max-w-7xl">{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
