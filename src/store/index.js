import { createStore } from "vuex";
import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

const store = createStore({
    state() {
        return {
            notifId: 1,
            primaryColor: "#000",
            secondaryColor: "#212121",
            primaryText: "white",
            execlusiveColor: "goldenrod",
            accessToken: false,
            notifs: [],
            isAdmin: false,
            userInfo: null,
            AllMovies: [],
            FeaturedMovies: [],
            LoadingMessage: '',
            isLoading: false
        };
    },
    mutations,
    actions,
    getters,
});
export default store;