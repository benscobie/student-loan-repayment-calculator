import { forwardRef } from 'react'

type CheckboxProps = {
  id: string
  placeholder?: string
  label: string
  type?: string
  error?: boolean
  errorText?: string
  required?: boolean
  children?: React.ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function InputGroup(props: CheckboxProps, ref) {
    const {
      id,
      label = '',
      error = false,
      errorText = '',
      required = false,
      ...rest
    } = props

    return (
      <>
        <input
          ref={ref}
          type="checkbox"
          className={`size-4 rounded border bg-gray-50 p-2.5 text-sm font-light text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-600' : 'border-gray-300'
          }`}
          id={id}
          {...rest}
        />
        <label htmlFor={id} className="mb-1 ml-2">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
        {errorText && (
          <p className="mt-1 pl-2 text-xs text-red-600">{errorText}</p>
        )}
      </>
    )
  },
)

export default Checkbox
