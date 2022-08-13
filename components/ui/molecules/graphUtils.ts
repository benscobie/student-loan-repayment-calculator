import Result from "../../../models/api/result";
import { DateTime } from "luxon";

export function getMonthGrouping(results: Result[]) {
    const periods = results.map((x) => x.period);

    // TODO Change this depending on graph x,y size too?
    if (periods.length >= 5 * 12) {
        return 3;
    }

    return 1;
}

export function groupDataEveryNthPeriod(results: Result[]) {
    const periods = results.map((x) => x.period);
    const groupedResults: Result[] = [];
    const groupedLabels: string[] = [];

    periods.forEach((period) => {
      const periodResults = results.find(
        (r) => r.period == period
      );

      if (
        period == 1 ||
        (periodResults!.periodDate.month) %
          getMonthGrouping(results) ==
          0
      ) {
        groupedResults.push(periodResults!);
        groupedLabels.push(periodResults?.periodDate.toString() ?? "");
      }
    });

    return { data: groupedResults, labels: groupedLabels };
  };

  export function getLabelsForGroupedDataCallback(results: Result[], label: string) {
    var date = DateTime.fromISO(label);

    if (results.length <= 12) {
      return date.monthShort + " " + date.year.toString();
    }

    if (date.month <= getMonthGrouping(results)) {
        return date.year.toString();
    }

    return "";
  }