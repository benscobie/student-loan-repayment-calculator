import { useRef } from "react";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  id: string;
  disabled?: boolean;
  style: string;
  wrapperClass?: string;
  children?: React.ReactNode;
}

const Input = (props: ButtonProps) => {
  const {
    id,
    type = "button",
    disabled = false,
    style = "success",
    wrapperClass = "",
    className,
    children,
    ...rest
  } = props;

  const inputRef = useRef(null);

  const getStyle = () => {
    var classNames = ["text-white rounded-lg text-sm px-5 py-2.5"];

    if (style == "primary") {
      classNames.push("bg-green-700");

      if (!disabled) {
        classNames.push(
          "hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none"
        );
      } else {
        classNames.push("opacity-50 cursor-not-allowed");
      }
    } else if (style == "cancel") {
      classNames.push("bg-slate-600");

      if (!disabled) {
        classNames.push(
          "hover:bg-slate-700 focus:ring-4 focus:ring-slate-300 focus:outline-none"
        );
      } else {
        classNames.push("opacity-50 cursor-not-allowed");
      }
    }

    return classNames.join(" ");
  };

  return (
    <div className={wrapperClass}>
      <button
        ref={inputRef}
        type={type}
        className={`${getStyle()} ${props.className}`}
        id={id}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};

export default Input;
