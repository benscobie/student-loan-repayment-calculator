import { EventHint, ErrorEvent } from '@sentry/nextjs'
import { isAxiosError, AxiosError } from 'axios'

// https://github.com/getsentry/sentry-javascript/issues/4377#issuecomment-2017757609
export const handleSentryBeforeSend = (event: ErrorEvent, hint: EventHint) => {
  addAxiosContextRecursive(event, hint?.originalException)
  return event
}

const addAxiosContextRecursive = (event: ErrorEvent, error: unknown) => {
  if (isAxiosError(error)) {
    addAxiosContext(event, error)
  } else if (error instanceof Error && error.cause) {
    addAxiosContextRecursive(event, error.cause)
  }
}

const addAxiosContext = (event: ErrorEvent, error: AxiosError) => {
  if (error.response) {
    const contexts = { ...event.contexts }
    contexts.Axios = { Response: error.response }
    event.contexts = contexts
  }
}
