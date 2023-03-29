import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store/index.js";

import fetchRequest from '../FetchApi'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
            path: "/",
            name: "home",
            component: HomeView,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/login",
            name: "login",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ("../views/LoginView.vue"),
            meta: {
                requiresUnAuth: true,
            },
        },
        {
            path: "/register",
            name: "register",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ("../views/RegisterView.vue"),
            meta: {
                requiresUnAuth: true,
            },
        },
        {
            path: "/support",
            name: "support",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ("../views/SupportView.vue"),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/editprofile",
            name: "edit my profile",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ("../views/EditProfile.vue"),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/mytickets",
            name: "My Tickets",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ("../views/MyTickets.vue"),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/movie:id",
            name: "movie",
            props: true,
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ("../views/MovieView.vue"),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/book:id",
            name: "book",
            props: true,
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ("../views/BookView.vue"),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/dashboard",
            name: "dashboard",
            props: true,
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ("../views/Dashboard/Dashboard.vue"),
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            },
            children: [{
                    // UserPosts will be rendered inside User's <router-view>
                    // when /user/:id/posts is matched
                    name: "Users",
                    path: 'users',
                    component: () =>
                        import ("../views/Dashboard/Users.vue"),
                },
                {
                    // UserPosts will be rendered inside User's <router-view>
                    // when /user/:id/posts is matched
                    name: "Tickets",
                    path: 'tickets',
                    component: () =>
                        import ("../views/Dashboard/Tickets.vue"),
                },
                {
                    // UserPosts will be rendered inside User's <router-view>
                    // when /user/:id/posts is matched
                    name: "Movies",
                    path: 'movies',
                    component: () =>
                        import ("../views/Dashboard/Movies.vue"),
                },
                {
                    // UserPosts will be rendered inside User's <router-view>
                    // when /user/:id/posts is matched
                    name: "Add-Edit Movie",
                    path: 'movie/:movie',
                    props: true,
                    component: () =>
                        import ("../views/Dashboard/Movie.vue"),
                },
            ],
        },
    ],
});

const AdminCheckAPI = 'https://watch-this-gjx8.onrender.com/admincheck'

router.beforeEach(async(to, _, next) => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
    if (to.meta.requiresAuth && !store.getters.accessToken) {
        const refresh = await store.dispatch("refresh")
        if (refresh.ok) {
            next()
        } else {
            next("/login");
        }
    } else if (to.meta.requiresUnAuth) {
        if (store.getters.accessToken) {
            next("/");
        } else {
            const refresh = await store.dispatch("refresh")
            if (refresh.ok) {
                next("/")
            } else {
                next();
            }
        }
    } else if (to.meta.requiresAdmin) {
        const result = await fetchRequest(AdminCheckAPI, 'GET')
        if (result.ok) {
            next()
        } else {
            next("/")
        }
    } else {
        next();
    }
});

export default router;