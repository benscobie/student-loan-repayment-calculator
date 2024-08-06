interface HighlightProps {
  children: React.ReactNode
}

const Highlight = (props: HighlightProps) => {
  const { children } = props

  return (
    <span className="mx-0.5 whitespace-nowrap rounded bg-slate-200 px-1 py-px font-semibold">
      {children}
    </span>
  )
}

export default Highlight
