import axios from "axios";
import config from "../config.json"

axios.defaults.baseURL = config.apiEndpoint
axios.interceptors.response.use((res) => res, function (err) {
    const expectedErrors =
        err.response &&
        err.response.status >= 400 &&
        err.response.status < 500
    if (!expectedErrors) {
        console.log("Something was wrong. Try it later.");
    }
    return Promise.reject(err)
})
const httpService = {
    get: axios.get,
    put: axios.put,
    patch: axios.patch,
    post: axios.post,
    delete: axios.delete
}
export default httpService