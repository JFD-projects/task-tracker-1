import axios from "axios";
import localStorageService from "./local.storage.service";
import config from '../config.json'
import httpService from "./http.service";

export const httpAuth = axios.create({
  baseURL: config.apiEndpoint + 'auth/'
})

const authService = {
  register: async (payload) => {
    const {data} = await httpAuth.post("signUp", payload)
    return data
  },
  login: async ({email, password}) => {
    const {data} = await httpAuth.post("signInWithPassword", {
      email, password, returnSecureToken: true
    })
    return data
  },
  refresh: async () => {
    const {data} = await httpAuth.post("token", {
      refresh_token: localStorageService.getRefreshToken()
    })
    return data
  },
  getCurrentUser: async (userId) => {
    const {data} = await httpService.get('user/' + userId)
    return data
  }
}

export default authService
