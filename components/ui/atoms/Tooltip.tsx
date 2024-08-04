import { QuestionCircle } from "react-bootstrap-icons";

interface TooltipProps {
  text: string;
}

const Tooltip = (props: TooltipProps) => {
  return (
    <>
      <div
        data-tooltip-id="tooltip"
        className="inline cursor-pointer"
        data-tooltip-content={props.text}
      >
        <QuestionCircle className="ml-1 inline mb-1" size={14} />
      </div>
    </>
  );
};
export default Tooltip;
