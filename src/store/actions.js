import store from "."
import router from "../router"

import fetchRequest from "../FetchApi"
const registerAPI = 'https://watch-this-gjx8.onrender.com/register'
const loginAPI = 'https://watch-this-gjx8.onrender.com/login'
const refreshAPI = 'https://watch-this-gjx8.onrender.com/refresh'
const logoutAPI = 'https://watch-this-gjx8.onrender.com/logout'

const MOVIES_API = 'https://watch-this-gjx8.onrender.com/movies/'


const MOVIE_INFO_API = `https://api.themoviedb.org/3/movie/`

const MOVIE_INFO_API_KEY = `?api_key=140adb778fed4fe6d4165bd6f240f610`

window.addEventListener('storage', function(event) {
    console.log(typeof(event.key), typeof(event.newValue))
    if (event.key == 'loggedout' && event.newValue == 'true') {
        console.log('Logged out from another tab!');
        console.log(window)
        window.location.reload()
            // do whatever you need after logout
    }
});

export default {
    //APIS
    // Users API
    async registerNewAccount(_, data) {
        const response = await fetch(registerAPI, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": data.username,
                "password": data.password,
                "email": data.email,
                "phoneno": data.phoneno
            }),
        });
        return response
    },

    async Login(context, data) {

        const response = await fetch(loginAPI, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "password": data.password,
                "email": data.email,
            }),
        })

        if (response.ok) {
            const responseData = await response.json()
            context.commit('setAccessToken', { accessToken: responseData.accessToken })
            store.dispatch('setLoadingState', { isLoading: true })
            localStorage.setItem('loggedout', false)

            // setInterval(async() => {
            //         console.log('getting new access token')
            //         const refreshResp = await fetch(refreshAPI, {
            //             method: "GET",
            //             credentials: 'include',
            //             headers: {
            //                 'Content-Type': 'application/json'
            //             },
            //         })

            //         const refreshRespData = await refreshResp.json()
            //         context.commit('setAccessToken', { accessToken: refreshRespData.accessToken })
            //     }, 13 * 60 * 1000)
            //     //13 * 60 * 1000
        }
        return response
    },

    async RequestNewAccessToken(context, _){
        const response = await fetch(refreshAPI, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (response.ok) {
            const responseData = await response.json()
            context.commit('setAccessToken', { accessToken: responseData.accessToken })
        }
        return response
    },

    async refresh(context, _) {

        const response = await fetch(refreshAPI, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (response.ok) {
            const responseData = await response.json()
            context.commit('setAccessToken', { accessToken: responseData.accessToken })
            store.dispatch('setLoadingState', { isLoading: true })
            localStorage.setItem('loggedout', false)

            await store.dispatch("HandleMovies")

            // setInterval(async() => {
            //     const refreshResp = await fetch(refreshAPI, {
            //         method: "GET",
            //         credentials: 'include',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //     })

            //     const refreshRespData = await refreshResp.json()
            //     context.commit('setAccessToken', { accessToken: refreshRespData.accessToken, isAdmin: refreshRespData.isAdmin, user: refreshRespData.user })

            // }, 14 * 60 * 1000)
        }
        return response
    },

    async Logout(context, data) {
        const response = await fetchRequest(logoutAPI, "POST")

        if (response.ok) {
            context.commit('setAccessToken', { accessToken: '' })
            localStorage.setItem('loggedout', true)
        }
        return response
    },

    // Movies API
    async HandleMovies(context, _) {
        store.dispatch('setLoadingMessage', { message: 'Fetching movies from dataBase' })
        const response = await fetchRequest(MOVIES_API, "GET")

        if (response.ok) {
            const result = await response.json()
            for (let movie in result) {
                const movieInfo = await fetch(MOVIE_INFO_API + result[movie].ratingID + MOVIE_INFO_API_KEY).then(async(e) => await e.json())
                result[movie].rate = Number(movieInfo.vote_average.toFixed(1))
            }
            store.dispatch('setLoadingMessage', { message: 'Sorting movies for you' })
            await context.commit('HandleMoviesMutation', result)
        }
        return response
    },

    removeNotifById(context, data) {
        context.commit('removeNotifById', data.id)
    },

    addNotif(context, data) {
        context.commit('addNotifWithId', data)
    },

    setLoadingState(context, data) {
        context.commit('setLoading', data)
    },

    setLoadingMessage(context, data) {
        context.commit('LoadingMessage', data)
    },
    setUserState(context, data) {
        context.commit('setUserState', data)
    },

};