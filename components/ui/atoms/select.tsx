import { useRef } from "react";

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement | HTMLInputElement> {
  id: string;
  placeholder?: string;
  label: string;
  error?: boolean;
  errorText?: string;
  required?: boolean;
  wrapperClass?: string;
  children?: React.ReactNode;
}

const Input = (props: SelectProps) => {
  const {
    id,
    placeholder = "",
    label = "",
    error = false,
    errorText = "",
    required = false,
    wrapperClass = "",
    children,
    ...rest
  } = props;

  const inputRef = useRef(null);

  return (
    <div className={wrapperClass}>
      <label htmlFor={id} className="block mb-1">
        {label} {required && <span className="text-red">*</span>}
      </label>
      <select
        id="loanType"
        ref={inputRef}
        className={`border bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 font-light block text-sm rounded-md ${
          error ? "border-red-600" : "border-gray-300"
        }`}
        {...rest}
      >
        {children}
      </select>
      {errorText && (
        <p className="text-xs pl-2 text-red-600 mt-1">{errorText}</p>
      )}
    </div>
  );
};

export default Input;
