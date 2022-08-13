import Result from "../../../models/api/result";

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
        (new Date(periodResults!.periodDate).getMonth() + 1) %
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
    var date = new Date(label);

    if (date.getMonth() + 1 <= getMonthGrouping(results)) {
        return date.getFullYear().toString();
    }

    return "";
  }