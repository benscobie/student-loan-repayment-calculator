import { useRef } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder?: string;
  label: string;
  type?: string;
  error?: boolean;
  errorText?: string;
  required?: boolean;
  children?: React.ReactNode;
}

const Checkbox = (props: CheckboxProps) => {
  const {
    id,
    label = "",
    error = false,
    errorText = "",
    required = false,
    ...rest
  } = props;

  const inputRef = useRef(null);

  return (
    <>
      <input
        ref={inputRef}
        type="checkbox"
        className={`border bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2.5 font-light text-sm w-4 h-4 rounded ${
          error ? "border-red-600" : "border-gray-300"
        }`}
        id={id}
        {...rest}
      />
      <label htmlFor={id} className="ml-2 mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {errorText && (
        <p className="text-xs pl-2 text-red-600 mt-1">{errorText}</p>
      )}
    </>
  );
};

export default Checkbox;
