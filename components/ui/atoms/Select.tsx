import { forwardRef } from 'react'

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement | HTMLInputElement> {
  id: string
  placeholder?: string
  label: string
  error?: string
  required?: boolean
  children?: React.ReactNode
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  props: SelectProps,
  ref,
) {
  const {
    id,
    placeholder = '',
    label = '',
    required = false,
    children,
    error,
    ...rest
  } = props

  return (
    <>
      <label htmlFor={id} className="mb-1 block">
        {label} {required && <span className="text-red">*</span>}
      </label>
      <select
        id="loanType"
        ref={ref}
        className={`block w-full appearance-none rounded border bg-gray-50 p-2.5 text-sm font-light text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error != null ? 'border-red-600' : 'border-gray-300'
        }`}
        {...rest}
      >
        {children}
      </select>
      {error && <p className="mt-1 pl-2 text-xs text-red-600">{error}</p>}
    </>
  )
})

export default Select
