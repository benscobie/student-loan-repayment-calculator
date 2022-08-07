import Loan from "../models/loan";
import LoanType from "../models/loanType";


export default interface LoanInputProps {
    loan: Loan;

    onChange: Function;

    availableLoanTypes: LoanType[]
}