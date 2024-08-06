import { QuestionCircle } from 'react-bootstrap-icons'

interface TooltipProps {
  text: string
}

const Tooltip = (props: TooltipProps) => {
  return (
    <>
      <div
        data-tooltip-id="tooltip"
        className="inline cursor-pointer"
        data-tooltip-content={props.text}
      >
        <QuestionCircle className="mb-1 ml-1 inline" size={14} />
      </div>
    </>
  )
}
export default Tooltip
