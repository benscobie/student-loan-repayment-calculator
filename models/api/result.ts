import Projection from "./projection";

export default interface Result {
    period: number;
    periodDate: Date;
    salary: number;
    projections: Projection[];
    aggregatedDebtRemaining: number;
    aggregatedPaidInPeriod: number;
    aggregatedInterestAppliedInPeriod: number;
    aggregatedTotalInterestPaid: number;
    aggregatedTotalPaid: number;
}