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
  symbol?: string;
  children?: React.ReactNode;
}

const InputGroup = forwardRef<HTMLInputElement, InputProps>(function InputGroup(
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
    symbol = "",
    ...rest
  } = props;

  return (
    <>
      <div className="block mb-1">
        <label htmlFor={id}>
          {label} {required && <span className="text-red">*</span>}
        </label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{symbol}</span>
        </div>
        <input
          ref={ref}
          type={type}
          className={`pl-7 border bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 font-light block text-sm rounded ${
            error != null ? "border-red-600" : "border-gray-300"
          }`}
          id={id}
          placeholder={placeholder}
          {...rest}
        />
      </div>
      {error != null && (
        <p className="text-xs pl-2 text-red-600 mt-1">{error}</p>
      )}
    </>
  );
});

export default InputGroup;
