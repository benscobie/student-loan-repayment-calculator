import { forwardRef } from "react";
import Tooltip from "./tooltip";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ReactDatePickerProps } from "react-datepicker";

interface DatePickerProps extends ReactDatePickerProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  tooltip?: string;
}

const DatePicker = forwardRef<ReactDatePicker, DatePickerProps>(
  function DatePicker(props: DatePickerProps, ref) {
    const {
      id,
      label = "",
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
          {tooltip && <Tooltip text={tooltip} />}
        </div>
        <ReactDatePicker
          ref={ref}
          className={`border bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 font-light block text-sm rounded ${
            error != null ? "border-red-600" : "border-gray-300"
          }`}
          id={id}
          {...rest}
        />
        {error != null && (
          <p className="text-xs pl-2 text-red-600 mt-1">{error}</p>
        )}
      </>
    );
  }
);

export default DatePicker;
