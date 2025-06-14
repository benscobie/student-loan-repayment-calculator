import * as Sentry from '@sentry/nextjs'
import { handleSentryBeforeSend } from './utils/sentryUtils'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  sendDefaultPii: true,
  tracesSampleRate: 1,
  debug: false,
  integrations: [],
  beforeSend: handleSentryBeforeSend,
})

// This export will instrument router navigations, and is only relevant if you enable tracing.
// `captureRouterTransitionStart` is available from SDK version 9.12.0 onwards
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
