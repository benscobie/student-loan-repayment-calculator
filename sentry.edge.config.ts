import * as Sentry from '@sentry/nextjs'
import { handleSentryBeforeSend } from './utils/sentryUtils'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN,
  sendDefaultPii: true,
  tracesSampleRate: 1,
  debug: false,
  beforeSend: handleSentryBeforeSend,
})
