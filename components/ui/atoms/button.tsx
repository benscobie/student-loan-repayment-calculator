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
    children,
    ...rest
  } = props;

  const inputRef = useRef(null);

  const getStyle = () => {
    var classNames = [];

    if (style == "primary") {
      classNames.push("text-white rounded-lg text-sm px-5 py-2.5 mr-2 mb-2");

      if (!disabled) {
        classNames.push(
          "bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none"
        );
      } else {
        classNames.push("bg-green-400 cursor-not-allowed");
      }
    }

    return classNames.join(" ");
  };

  return (
    <div className={wrapperClass}>
      <button
        ref={inputRef}
        type={type}
        className={getStyle()}
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
