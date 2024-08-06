import { forwardRef } from 'react'
import Tooltip from './Tooltip'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ReactDatePickerProps } from 'react-datepicker'

interface DatePickerProps extends ReactDatePickerProps {
  id: string
  label: string
  error?: string
  required?: boolean
  tooltip?: string
}

const DatePicker = forwardRef<ReactDatePicker, DatePickerProps>(
  function DatePicker(props: DatePickerProps, ref) {
    const {
      id,
      label = '',
      error,
      required = false,
      tooltip = '',
      ...rest
    } = props

    return (
      <>
        <div className="mb-1 block">
          <label htmlFor={id}>
            {label} {required && <span className="text-red-600">*</span>}
          </label>
          {tooltip && <Tooltip text={tooltip} />}
        </div>
        <ReactDatePicker
          ref={ref}
          className={`block w-full rounded border bg-gray-50 p-2.5 text-sm font-light text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error != null ? 'border-red-600' : 'border-gray-300'
          }`}
          id={id}
          {...rest}
        />
        {error != null && (
          <p className="mt-1 pl-2 text-xs text-red-600">{error}</p>
        )}
      </>
    )
  },
)

export default DatePicker
