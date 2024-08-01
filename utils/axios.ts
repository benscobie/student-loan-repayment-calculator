import axiosClient from "axios";
import adaptIsoStrings from "./adaptIsoStrings";

export const axios = axiosClient.create();

axios.interceptors.response.use((response) => {
  adaptIsoStrings(response.data);
  return response;
});
