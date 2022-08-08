enum LoanType {
    Unselected = 0,
    Type1 = 1,
    Type2 = 2,
    Type4 = 3,
    Postgraduate = 4,
  }

  export function LoanTypeToDescription(type?: LoanType): string {
    if (type == LoanType.Type1) {
      return "Plan 1";
    } else if (type == LoanType.Type2) {
      return "Plan 2";
    } else if (type == LoanType.Type4) {
      return "Plan 4";
    } else if (type == LoanType.Postgraduate) {
      return "Postgraduate Loan";
    }

    return "Unknown"
  }
  
  export default LoanType;