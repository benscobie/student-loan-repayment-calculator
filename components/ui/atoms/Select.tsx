import { forwardRef } from "react";

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement | HTMLInputElement> {
  id: string;
  placeholder?: string;
  label: string;
  error?: string;
  required?: boolean;
  children?: React.ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  props: SelectProps,
  ref,
) {
  const {
    id,
    placeholder = "",
    label = "",
    required = false,
    children,
    error,
    ...rest
  } = props;

  return (
    <>
      <label htmlFor={id} className="block mb-1">
        {label} {required && <span className="text-red">*</span>}
      </label>
      <select
        id="loanType"
        ref={ref}
        className={`border bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 font-light block text-sm rounded appearance-none ${
          error != null ? "border-red-600" : "border-gray-300"
        }`}
        {...rest}
      >
        {children}
      </select>
      {error && <p className="text-xs pl-2 text-red-600 mt-1">{error}</p>}
    </>
  );
});

export default Select;
