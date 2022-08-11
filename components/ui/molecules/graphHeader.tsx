interface GraphHeaderProps {
  text: string;
}

const GraphHeader = (props: GraphHeaderProps) => {
  return <h2 className="text-center">{props.text}</h2>;
};

export default GraphHeader;
