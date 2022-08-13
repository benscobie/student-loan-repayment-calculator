interface GraphHeaderProps {
  text: string;
}

const GraphHeader = (props: GraphHeaderProps) => {
  return <h2 className="text-center text-lg font-semibold">{props.text}</h2>;
};

export default GraphHeader;
