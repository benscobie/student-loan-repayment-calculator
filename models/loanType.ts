enum LoanType {
  Unselected = "Unselected",
  Type1 = "Type1",
  Type2 = "Type2",
  Type4 = "Type4",
  Postgraduate = "Postgraduate",
  Type5 = "Type5",
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
  } else if (type == LoanType.Type5) {
    return "Plan 5";
  }

  return "Unknown";
}

export default LoanType;
