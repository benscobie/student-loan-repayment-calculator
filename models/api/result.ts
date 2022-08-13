import { DateTime } from "luxon";
import Projection from "./projection";

export default interface Result {
    period: number;
    periodDate: DateTime;
    salary: number;
    projections: Projection[];
    aggregatedDebtRemaining: number;
    aggregatedPaidInPeriod: number;
    aggregatedInterestAppliedInPeriod: number;
    aggregatedTotalInterestPaid: number;
    aggregatedTotalPaid: number;
}