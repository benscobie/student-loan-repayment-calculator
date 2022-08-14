import useSWRImmutable from "swr";
import getAxios from "../../utils/useAxios";
import Assumptions from "../models/assumptions";

const fetcher = (url: string) =>
  getAxios()
    .get<Assumptions>(url)
    .then((res) => res.data);

export function useAssumptions() {
  const { data, error } = useSWRImmutable(process.env.NEXT_PUBLIC_API_URL +`/ukstudentloans/assumptions`, fetcher);

  return {
    assumptions: data,
    isLoading: !error && !data,
    isError: error,
  };
}
