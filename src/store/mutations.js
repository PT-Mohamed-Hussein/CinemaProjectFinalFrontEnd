const DayInMs = 1000 * 60 * 60 * 24


export default {
    setAccessToken(state, payload) {
        state.accessToken = payload.accessToken
    },
    setUserState(state, payload) {
        if(payload.isAdmin) state.isAdmin = payload.isAdmin

        if(payload.user) state.user = payload.user
    },
    LoadingMessage(state, payload) {
        state.LoadingMessage = payload.message
    },
    setLoading(state, payload) {
        state.isLoading = payload.isLoading
    },
    async HandleMoviesMutation(state, payload) {
        state.AllMovies = []
        state.FeaturedMovies = []
        payload.forEach(async(e) => {
            e.Parties = JSON.parse(e.Parties)
        });
        state.LoadingMessage = 'Finalizing featured movies'
        for (let movie in payload) {
            state.AllMovies.push(payload[movie])
            let DayDiff = new Date() - new Date(payload[movie].releaseDate)
            if ((DayDiff / DayInMs) < 10 || movie < 5) { // 10 Days Featured Movies
                state.FeaturedMovies.push(payload[movie])
            }
        }
        state.LoadingMessage = ''
        state.isLoading = false
    },
    removeNotifById(state, payload) {
        let index = state.notifs.findIndex(notif => notif.id === payload)
        if (index != -1) {
            state.notifs.splice(index, 1)
        }
    },
    async addNotifWithId(state, payload) {

        const notif = {
            id: payload.id,
            title: payload.title,
            desc: payload.desc,
            type: payload.type
        }
        state.notifId += 1
        state.notifs.push(notif)
        setTimeout(() => {
            let index = state.notifs.findIndex(notif => notif.id === payload.id)
            if (index != -1) {
                state.notifs.splice(index, 1)
            }
        }, 10000)
    },
};