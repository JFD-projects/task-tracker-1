const TOKEN_KEY = "jwt-token"
const REFRESH_TOKEN_KEY = "jwt-refresh-token"
const EXPIRES_KEY = "jwt-expires"
const USERID_KEY = "user-local-id"

export const setTokens = ({refreshToken, userId, accessToken, expiresIn = 3600}) => {
    const expiredDate = new Date().getTime() + expiresIn * 1000
    localStorage.setItem(TOKEN_KEY, accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    localStorage.setItem(EXPIRES_KEY, expiredDate)
    localStorage.setItem(USERID_KEY, userId)
}
export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY)
}
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
}
export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY)
}
export function getLocalId() {
    return localStorage.getItem(USERID_KEY)
}
export function removeAuthData() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(EXPIRES_KEY)
    localStorage.removeItem(USERID_KEY)
}
const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getLocalId,
    removeAuthData
}
export default localStorageService
