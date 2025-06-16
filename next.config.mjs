import { withSentryConfig } from '@sentry/nextjs'
import bundleAnalyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  transpilePackages: ['chart.js'],
  rewrites: async () => {
    return [
      { source: '/t.js', destination: 'https://umami.benscobie.com/script.js' },
      {
        source: '/api/send',
        destination: 'https://umami.benscobie.com/api/send',
      },
    ]
  },
}

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withSentryConfig(withBundleAnalyzer(nextConfig), {
  org: 'none-rai',
  project: 'slrc-frontend',
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  debug: true,
})
