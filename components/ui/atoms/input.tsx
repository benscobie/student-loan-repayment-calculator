import { forwardRef } from "react";
import Tooltip from "./tooltip";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder?: string;
  label: string;
  type?: string;
  error?: string;
  required?: boolean;
  tooltip?: string;
  children?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function InputGroup(
  props: InputProps,
  ref
) {
  const {
    id,
    placeholder = "",
    label = "",
    type = "text",
    error,
    required = false,
    tooltip = "",
    ...rest
  } = props;

  return (
    <>
      <div className="block mb-1">
        <label htmlFor={id}>
          {label} {required && <span className="text-red">*</span>}
        </label>
        {tooltip && <Tooltip>{tooltip}</Tooltip>}
      </div>
      <input
        ref={ref}
        type={type}
        className={`border bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 font-light block text-sm rounded ${
          error != null ? "border-red-600" : "border-gray-300"
        }`}
        id={id}
        placeholder={placeholder}
        {...rest}
      />
      {error != null && (
        <p className="text-xs pl-2 text-red-600 mt-1">{error}</p>
      )}
    </>
  );
});

export default Input;
