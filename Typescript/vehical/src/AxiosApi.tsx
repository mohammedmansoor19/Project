import axios from "axios";


export const url = "http://localhost:8080"


const AxiosApi = axios.create({
    baseURL:url
});

export default AxiosApi