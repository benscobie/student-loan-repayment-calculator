import { forwardRef } from 'react'
import Tooltip from './Tooltip'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  placeholder?: string
  label: string
  type?: string
  error?: string
  required?: boolean
  tooltip?: string
  symbol?: string
  children?: React.ReactNode
}

const InputGroup = forwardRef<HTMLInputElement, InputProps>(function InputGroup(
  props: InputProps,
  ref,
) {
  const {
    id,
    placeholder = '',
    label = '',
    type = 'text',
    error,
    required = false,
    tooltip = '',
    symbol = '',
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
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">{symbol}</span>
        </div>
        <input
          ref={ref}
          type={type}
          className={`block w-full appearance-none rounded border bg-gray-50 p-2.5 pl-7 text-sm font-light text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error != null ? 'border-red-600' : 'border-gray-300'
          }`}
          id={id}
          placeholder={placeholder}
          {...rest}
        />
      </div>
      {error != null && (
        <p className="mt-1 pl-2 text-xs text-red-600">{error}</p>
      )}
    </>
  )
})

export default InputGroup
