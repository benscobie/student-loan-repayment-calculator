import Result from "./result";

export interface Results {
    results: Result[];
    debtClearedDate: Date;
    debtClearedNumberOfPeriods: number;
    totalPaid: number;
    totalInterestPaid: number;
}