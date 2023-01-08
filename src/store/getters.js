export default {
    getPrimaryColor(state) {
        return state.primaryColor;
    },
    getSecondaryColor(state) {
        return state.secondaryColor;
    },
    getTextColor(state) {
        return state.primaryText;
    },
    getExecColor(state) {
        return state.execlusiveColor;
    },
    accessToken(state) {
        return state.accessToken;
    },
    notifs(state) {
        return state.notifs;
    },
    getNotifId(state) {
        return state.notifId;
    },
    isAdmin(state) {
        return state.isAdmin
    },
    TheUser(state) {
        return state.user
    },
    AllMovies(state) {
        return state.AllMovies
    },
    FeaturedMovies(state) {
        return state.FeaturedMovies
    },
    LoadingMessage(state) {
        return state.LoadingMessage
    },
    isLoading(state) {
        return state.isLoading
    }
};