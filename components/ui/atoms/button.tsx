import { useRef } from "react";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  id: string;
  disabled?: boolean;
  style: "primary" | "cancel";
  wrapperClass?: string;
  children?: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const {
    id,
    type = "button",
    disabled = false,
    style,
    wrapperClass = "",
    className,
    children,
    ...rest
  } = props;

  const inputRef = useRef(null);

  const getStyle = () => {
    var classNames = ["rounded-lg text-sm px-5 py-2.5"];

    if (style == "primary") {
      classNames.push("text-white border border-sky-600 bg-sky-600");

      if (!disabled) {
        classNames.push(
          "hover:bg-sky-700 hover:border-sky-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
        );
      } else {
        classNames.push("opacity-50 cursor-not-allowed");
      }
    } else if (style == "cancel") {
      classNames.push("text-sky-700 border border-sky-600");

      if (!disabled) {
        classNames.push(
          "hover:bg-sky-700 hover:text-white focus:ring-2 focus:ring-slate-300 focus:outline-none"
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

export default Button;
