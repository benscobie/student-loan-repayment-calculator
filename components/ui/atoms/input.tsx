import { useRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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

const Input = (props: InputProps) => {
  const {
    id,
    placeholder = "",
    label = "",
    type = "text",
    error = false,
    errorText = "",
    required = false,
    wrapperClass = "",
    ...rest
  } = props;

  const inputRef = useRef(null);

  return (
    <div className={wrapperClass}>
      <label htmlFor={id} className="block mb-1">
        {label} {required && <span className="text-red">*</span>}
      </label>
      <input
        ref={inputRef}
        type={type}
        className={`border transition duration-150 ease-in-out bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 font-light block text-sm rounded-md ${
          error
            ? "focus-within:border-red border-red"
            : "focus-within:border-primary border-gray-gray4"
        }`}
        id={id}
        placeholder={placeholder}
        {...rest}
      />
      {errorText && <p className="text-xs pl-2 text-red mb-4">{errorText}</p>}
    </div>
  );
};

export default Input;