// Source: https://styko.github.io/posts/axios-interceptor/

import { DateTime } from 'luxon'

const keywords = ['Date']

export default function adaptIsoStrings(input: string) {
  const adaptRecursive = (obj: any) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== null && typeof obj[key] === 'object') {
        adaptRecursive(obj[key])
      } else if (
        keywords.some((keyword) => key.includes(keyword)) ||
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d*Z/.test(obj[key])
      ) {
        obj[key] = DateTime.fromISO(obj[key])
      }
    })
  }
  adaptRecursive(input)
}
