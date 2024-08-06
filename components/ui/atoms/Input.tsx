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
  children?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(function InputGroup(
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
    ...rest
  } = props

  return (
    <>
      <div className="mb-1 block">
        <label htmlFor={id}>
          {label} {required && <span className="text-red">*</span>}
        </label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <input
        ref={ref}
        type={type}
        className={`block w-full appearance-none rounded border bg-gray-50 p-2.5 text-sm font-light text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error != null ? 'border-red-600' : 'border-gray-300'
        }`}
        id={id}
        placeholder={placeholder}
        {...rest}
      />
      {error != null && (
        <p className="mt-1 pl-2 text-xs text-red-600">{error}</p>
      )}
    </>
  )
})

export default Input
