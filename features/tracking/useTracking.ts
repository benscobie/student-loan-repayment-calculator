import { useCallback } from 'react'
import { CustomEventFunction, EventData, PageViewProperties } from './umami'

export const useTracking = () => {
  function track(): Promise<string>
  function track(eventName: string): Promise<string>
  function track(eventName: string, obj: EventData): Promise<string>
  function track(properties: PageViewProperties): Promise<string>
  function track(eventFunction: CustomEventFunction): Promise<string>
  function track(
    event?: string | PageViewProperties | CustomEventFunction,
    obj?: EventData,
  ) {
    const umami = window.umami

    if (!umami) return

    if (!event) {
      return umami.track()
    } else if (typeof event === 'string') {
      if (obj) {
        return umami.track(event, obj)
      } else {
        return umami.track(event)
      }
    } else if (typeof event === 'object') {
      return umami.track(event)
    } else if (typeof event === 'function') {
      return umami.track(event)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(track, [])

  return {
    track: callback,
  }
}
