import {createAction, createSlice} from "@reduxjs/toolkit";
import authService from "../../services/auth.service";
import localStorageService, {setTokens} from "../../services/local.storage.service";
import {removeListsData} from "./listsReducer";
import {removeTasksData} from "./tasksReducer";

const isLogged = localStorageService.getAccessToken()

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: isLogged ? localStorageService.getLocalId() : null,
    name: null,
    email: null,
    error: null,
    isLoggedIn: isLogged ? true : false,
  },
  reducers: {
    authRequestSuccess: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
      state.error = null
    },
    userRequestSuccess: (state, action) => {
      state.name = action.payload.name
      state.email = action.payload.email
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
    userLogOut: state => {
      state.isLoggedIn = false
      state.auth = null
      state.error = null
      state.name = null
      state.email = null
    },
  }
})

const {actions, reducer: authReducer} = authSlice
const {
  authRequestSuccess,
  authRequestFailed,
  userRequestSuccess,
  userLogOut
} = actions

const authRequested = createAction("users/authRequested")

export const signIn = (payload) => async dispatch => {
  const {email, password} = payload
  dispatch(authRequested())
  try {
    const data = await authService.login({email, password})
    await setTokens(data)
    dispatch(authRequestSuccess(data.userId))
  } catch (error) {
    dispatch(authRequestFailed(error.message))
  }
}

export const signUp = (payload) => async dispatch => {
  dispatch(authRequested())
  try {
    const data = await authService.register(payload)
    await setTokens(data)
    dispatch(authRequestSuccess(data.userId))
  } catch (e) {
    dispatch(authRequestFailed(e.message))
  }
}

export const getCurrentUser = (id) => async dispatch => {
  try {
    const data = await authService.getCurrentUser(id)
    dispatch(userRequestSuccess(data))
  } catch (e) {
    dispatch(authRequestFailed(e.message))
  }
}

export const logOut = () => dispatch => {
  localStorageService.removeAuthData()
  dispatch(userLogOut())
  dispatch(removeListsData())
  dispatch(removeTasksData())
}


export const getError = () => state =>
  state.auth.error
export const getIsLoggedIn = () => state =>
  state.auth.isLoggedIn
export const getCurrentUserId = () => state =>
  state.auth.auth
export const getUser = () => state => {
  return {name: state.auth.name, email: state.auth.email}
}


export default authReducer
