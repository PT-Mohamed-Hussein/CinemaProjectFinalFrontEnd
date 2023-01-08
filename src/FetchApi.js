import store from "./store"

const REFRESH_API = 'http://localhost:3500/refresh'

const fetchRequest = async(api, method, body, isupload) => {
    let requestArgs = {
        method,
        credentials: 'include',
        headers: {
            authentication: 'Bearer ' + store.getters.accessToken
        },
    }
    if (method != 'GET' && !isupload) {
        requestArgs.body = JSON.stringify(body) || JSON.stringify({})
        requestArgs.headers['Content-Type'] = 'application/json'
    }
    if(isupload) requestArgs.body = body
    const resp = await fetch(api, requestArgs) // making our original resp with current access token

    if (resp.ok) return resp // if resp is valid return it immediatley
    const dumResp = resp.clone()

    const result = await dumResp.json()
    if (result.message == 'Access Token Expired.' || result.message == 'jwt malformed') { // check if this token is expired
        const resp2 = await fetch(REFRESH_API, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }) // trying to get new access token so the user can follow up
        if (resp2.ok) { // if we managed to get the access token so the refresh token is still valid
            const responseData = await resp2.json()
            store.commit('setAccessToken', { accessToken: responseData.accessToken }) // store the new access token

            requestArgs.headers.authentication = 'Bearer ' + store.getters.accessToken

            const originalResp = await fetch(api, requestArgs) // make the original request back 

            return originalResp //return it even it has error but in this case the error isn't jwt
        } else {
            return resp // if the refresh token is invalid then return the original blocked request 
        }
    }
    return resp // if token not expired then return the resp back even if it has error
}

export default fetchRequest;