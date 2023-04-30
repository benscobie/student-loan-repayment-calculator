import { QuestionCircle } from "react-bootstrap-icons";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface TooltipProps {
  children?: React.ReactNode;
}

const Tooltip = (props: TooltipProps) => {
  return (
    <>
      <div data-tooltip-id="tooltip" className="inline cursor-pointer">
        <QuestionCircle className="ml-1 inline mb-1" size={14} />
      </div>
      <ReactTooltip
        id="tooltip"
        style={{
          backgroundColor: "rgb(71, 85, 105)",
          color: "#fff",
          opacity: 1,
        }}
      >
        {props.children}
      </ReactTooltip>
    </>
  );
};
export default Tooltip;
