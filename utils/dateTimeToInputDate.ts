
/* Credit https://github.com/orgs/react-hook-form/discussions/4718#discussioncomment-2738053 */

import { DateTime } from "luxon";

/**
 * Create a date YYYY-MM-DD date string from a Luxon DateTime that is typecasted as a `Date`.
 * Hack when using `defaultValues` in `react-hook-form`
 * This is because `react-hook-form` doesn't support `defaultValue` of type `Date` even if the types say so
 */
export function dateTimeToInputDate(date?: DateTime) {
    if (!date || !date.isValid) {
        return undefined;
    }
    
    return date.toJSON().slice(0, 10) as unknown as Date;
}