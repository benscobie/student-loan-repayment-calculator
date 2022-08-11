import { useRef } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder?: string;
  label: string;
  type?: string;
  error?: boolean;
  errorText?: string;
  required?: boolean;
  wrapperClass?: string;
  children?: React.ReactNode;
}

const Checkbox = (props: CheckboxProps) => {
  const {
    id,
    label = "",
    error = false,
    errorText = "",
    required = false,
    wrapperClass = "",
    ...rest
  } = props;

  const inputRef = useRef(null);

  return (
    <div className={wrapperClass}>
      <input
        ref={inputRef}
        type="checkbox"
        className={`border transition duration-150 ease-in-out bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 p-2.5 font-light text-sm w-4 h-4 rounded-md ${
          error
            ? "focus-within:border-red border-red"
            : "focus-within:border-primary border-gray-gray4"
        }`}
        id={id}
        {...rest}
      />
      <label htmlFor={id} className="ml-2 mb-1">
        {label} {required && <span className="text-red">*</span>}
      </label>
      {errorText && <p className="text-xs pl-2 text-red mb-4">{errorText}</p>}
    </div>
  );
};

export default Checkbox;
