interface HighlightProps {
  children: React.ReactNode;
}

const Highlight = (props: HighlightProps) => {
  const { children } = props;

  return (
    <span className="font-semibold bg-slate-200 px-1 mx-0.5 py-px rounded whitespace-nowrap">
      {children}
    </span>
  );
};

export default Highlight;
