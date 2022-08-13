interface HighlightProps {
  children: React.ReactNode;
}

const Input = (props: HighlightProps) => {
  const { children } = props;

  return (
    <span className="font-bold background bg-slate-600 px-1 mx-0.5 py-0.5 text-white rounded">
      {children}
    </span>
  );
};

export default Input;
