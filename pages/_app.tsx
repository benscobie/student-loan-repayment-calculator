import '../styles/globals.css'
import 'react-tooltip/dist/react-tooltip.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
// import { Open_Sans } from 'next/font/google'
import { Tooltip } from 'react-tooltip'
import Script from 'next/script'

// If loading a variable font, you don't need to specify the font weight
// const openSans = Open_Sans({
//   subsets: ['latin'],
//   fallback: ['Arial', 'sans-serif'],
// })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout className="">
      {/* Using fallback fonts instead of openSans.className */}
      <Script
        async
        src="/t.js"
        data-website-id="bc37a9e4-da7b-4e96-a848-120ab3d33703"
      />
      <Component {...pageProps} />
      <Tooltip
        id="tooltip"
        style={{
          backgroundColor: 'rgb(71, 85, 105)',
          color: '#fff',
          opacity: 1,
          maxWidth: '80vw',
        }}
      />
    </Layout>
  )
}

export default MyApp
