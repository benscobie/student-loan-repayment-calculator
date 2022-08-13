import { DateTime } from "luxon";
import Result from "./result";

export interface Results {
    results: Result[];
    debtClearedDate: DateTime;
    debtClearedNumberOfPeriods: number;
    totalPaid: number;
    totalInterestPaid: number;
}