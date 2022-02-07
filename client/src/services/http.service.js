import axios from "axios";
import config from "../config.json"
import {toast} from 'react-toastify';
import localStorageService from "./local.storage.service";
import authService from "./auth.service";

axios.defaults.baseURL = config.apiEndpoint

axios.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate()
    const refreshToken = localStorageService.getRefreshToken()
    const isExpired = refreshToken && expiresDate < Date.now()
    if (isExpired) {
      const data = await authService.refresh()
      localStorageService.setTokens(data)
    }
    const accessToken = localStorageService.getAccessToken()
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`
      }
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
axios.interceptors.response.use(
  (res) => {
    return res
  }, function (err) {
    const expectedErrors =
      err.response &&
      err.response.status >= 400 &&
      err.response.status < 500
    if (!expectedErrors) {
      console.log(err)
      toast.error("Something was wrong. Try it later.");
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
