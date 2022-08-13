import axios from 'axios'
import adaptIsoStrings from './adaptIsoStrings';

const getInstance = () => {
    const axiosApiInstance = axios.create()

    axiosApiInstance.interceptors.response.use((response) => {
        adaptIsoStrings(response.data);
        return response;
      });

    return axiosApiInstance
}

export default function getAxios() {
    return getInstance()
}