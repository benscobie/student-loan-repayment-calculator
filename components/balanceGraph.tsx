import { useRef } from "react";
import { Results } from "../models/api/results";

interface BalanceGraphProps {
  results: Results;
}

const Input = (props: BalanceGraphProps) => {
  return (
    <div>
      {props.results.totalPaid} - {props.results.totalInterestPaid}
    </div>
  );
};

export default Input;
