interface HighlightProps {
  children: React.ReactNode;
}

const Highlight = (props: HighlightProps) => {
  const { children } = props;

  return (
    <span className="font-bold background bg-slate-500 px-1 mx-0.5 py-0.5 text-white rounded whitespace-nowrap">
      {children}
    </span>
  );
};

export default Highlight;
