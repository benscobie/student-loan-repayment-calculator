import * as Sentry from '@sentry/nextjs'

export function register() {
  const SENTRY_DSN =
    process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    if (SENTRY_DSN) {
      Sentry.init({
        dsn: SENTRY_DSN,
        tracesSampleRate: 1,
        debug: false,
      })
    }
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    if (SENTRY_DSN) {
      Sentry.init({
        dsn: SENTRY_DSN,
        tracesSampleRate: 1,
        debug: false,
      })
    }
  }
}
