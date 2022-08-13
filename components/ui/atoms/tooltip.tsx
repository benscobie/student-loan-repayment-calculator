import { QuestionCircle } from "react-bootstrap-icons";

interface TooltipProps {
  children?: React.ReactNode;
}

const Tooltip = (props: TooltipProps) => {
  return (
    <div className="has-tooltip inline cursor-pointer">
      <span className="tooltip -mt-8  py-2 px-3 text-sm font-medium text-white bg-slate-600 rounded-lg shadow-sm">
        {props.children}
      </span>
      <QuestionCircle className="ml-1 inline" size={14} />
    </div>
  );
};
export default Tooltip;
