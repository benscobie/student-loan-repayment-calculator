import classNames from 'classnames'
import { useRef } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = {
  id: string
  disabled?: boolean
  style: 'primary' | 'secondary'
  children?: React.ReactNode
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'>

const Button = (props: ButtonProps) => {
  const {
    id,
    type = 'button',
    disabled = false,
    style,
    className,
    children,
    ...rest
  } = props

  const inputRef = useRef(null)

  const btnClass = classNames('rounded-lg text-sm px-5 py-2.5', {
    'text-white border border-sky-600 bg-sky-600': style == 'primary',
    'hover:bg-sky-700 hover:border-sky-700 focus:ring-2 focus:ring-sky-500 focus:outline-none':
      style == 'primary' && !disabled,

    'text-sky-700 border border-sky-600': style == 'secondary',
    'hover:bg-sky-700 hover:text-white focus:ring-2 focus:ring-slate-300 focus:outline-none':
      style == 'secondary' && !disabled,

    'opacity-50 cursor-not-allowed': disabled,
  })

  return (
    <button
      ref={inputRef}
      type={type}
      className={twMerge(btnClass, className)}
      id={id}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
