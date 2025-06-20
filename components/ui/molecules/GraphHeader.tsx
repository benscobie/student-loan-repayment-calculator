type GraphHeaderProps = {
  text: string
}

const GraphHeader = (props: GraphHeaderProps) => {
  return <h2 className="text-center text-lg">{props.text}</h2>
}

export default GraphHeader
