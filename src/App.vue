<script>
import TheNavBar from "./components/NavBar.vue";
import TheFooter from "./components/TheFooter.vue"
import BaseNotif from "./components/ui/BaseNotif.vue";
import Loading from "./components/ui/Loading.vue";
export default {
  components: { TheNavBar, TheFooter, BaseNotif, Loading },
  computed: {
    accessToken() {
      return this.$store.getters.accessToken;
    },
    color1() {
      return this.$store.getters.getPrimaryColor;
    },
    color2() {
      return this.$store.getters.getTextColor;
    },
    notifs() {
      return this.$store.getters.notifs
    },
    currRoute () {
      return this.$route.path
    },
    isLoading() {
      return this.$store.getters.isLoading
    }
  },
  methods:{
    removeNotif(id) {
      this.$store.dispatch('removeNotifById', {id})
    }
  },

};
</script>

<template>
  <transition name="loading">
    <Loading v-if="accessToken && isLoading"></Loading>
  </transition>
  <the-nav-bar v-if="accessToken && (!currRoute.includes('dashboard')) && !isLoading"></the-nav-bar>
  <div class="page" v-if="(currRoute.includes('dashboard') ) && !isLoading">
    <div class="sidebar">
        <h3 class="header" to="/"><router-link class="header" to="/">Watch This</router-link></h3>
        <ul class="header-menu">
            <li>
              <router-link to="/dashboard" class="link">
                  <font-awesome-icon icon="fa-regular fa-chart-bar" class="fa-fw"></font-awesome-icon>
                  <span class="hide-mobile">Dashboard</span>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/users" class="link">
                  <font-awesome-icon icon="fa-solid fa-users" class="fa-fw" />
                  <span class="hide-mobile">Users</span>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/tickets" class="link">
                  <font-awesome-icon icon="fa-solid fa-ticket" class="fa-fw" />                        
                  <span class="hide-mobile">Tickets</span>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/movies" class="link">
                  <font-awesome-icon icon="fa-solid fa-film" class="fa-fw" />                        
                  <span class="hide-mobile">Movies</span>
              </router-link>
            </li>
        </ul>
    </div>
    <div class="content">
      <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </div>
  </div>
  <div class="base-cont" v-else-if="(!currRoute.includes('dashboard') )&& !isLoading">
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
  <div class="notif-container" v-if="notifs[0] && !isLoading">
    <transition v-for="notif in notifs" :key="notif.id">
      <BaseNotif :type="notif.type" :id="notif.id" :title="notif.title" :desc="notif.desc" @removeNotif="removeNotif"></BaseNotif>
    </transition>
  </div>
  <the-footer class="footer" v-if="accessToken && !isLoading && (!currRoute.includes('dashboard') )"></the-footer>

</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  scroll-margin-top: 100px; /* whatever is a nice number that gets you past the header */

}
*:focus{
  outline: none
}
#app {
  background-color: #212121;
  z-index: -2 !important;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

}
.base-cont{
  /*width: 95%;*/
  width: 100%;
  flex-grow: 1;
}

::-webkit-scrollbar{
    width: 10px
}
::-webkit-scrollbar-track{
    background-color: #232323
}
::-webkit-scrollbar-thumb{
    background-color: #323232;
    transition: 0.1s;
}
::-webkit-scrollbar-thumb:hover{
    background-color: #424242
}
</style>

<style scoped>
  .notif-container{
    width: 28%;
    position:fixed;
    z-index: 2;
    right: 1vw;
    bottom: 0;
    display: flex;
    flex-direction: column-reverse;
    padding: 10px;
    overflow: hidden
  }
  @media (max-width: 500px) {
    .notif-container{
      width: 80%
    }
  }
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.loading-enter-active,
.loading-leave-active {
  transition: all 0.5s ease;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}

/* DashBoard Styling */
.page{ 
  --page-bg: #232323;
  --secondary-bg: #000;
  --header-txt-clr: goldenrod;
  --primary-color: #fff;
  --secondary-color: #323232;
  --hover-bg: #f6f6f6;
  --shadow-clr: #121212;
}

a{
  text-decoration: none;
}
.page{
  background-color: var(--page-bg);
  display: flex;
  min-height: 100vh;
  width: 100%;
}
.sidebar{
  background-color: var(--secondary-bg);
  padding: 20px;
  position: relative;
  width: 300px;
  box-shadow: 0 0 10px var(--shadow-clr);
  margin-right: 20px
}
  @media (max-width: 900px) { 
      .sidebar{
        margin-right: 5px
      }
     
  }
.header{
  position: sticky;
  top: 20px;
  text-align: center;
  margin:1em;
  margin-bottom: 50px;
  margin-top: 0;
  color: var(--header-txt-clr);
}
.header::before{
  content: '';
  background-color: var(--primary-color);
  width: 80px;
  height: 2px;
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%)
}
.header::after{
  content: '';
  background-color: var(--primary-color);
  width: 12px;
  height: 12px;
  border: 4px solid var(--secondary-bg);
  border-radius: 50%;
  position: absolute;
  bottom: -29px;
  left: 50%;
  transform: translateX(-50%)
}
ul{
  list-style: none;
  padding: 0;
}
.header-menu{
  position: sticky;
  top: 100px;
}
.link{
  display: flex;
  align-items: center;
  color: var(--primary-color);
  font-size: 14px;
  border-radius: 6px;
  padding: 10px;
  transition: 0.3s all; 
  margin-bottom: 5px;
}
.link:hover, .router-link-exact-active{
  background-color: var(--hover-bg);
  color: var(--secondary-color);
}
.link span{
  font-size: 14px;
  margin-left: 10px
}
@media (max-width: 767px) {
  .sidebar{
      width: 58px;
      padding: 10px
  }
  .hide-mobile {
      display: none;
  }
  .header{ 
      font-size: 10px;
      margin: 0.5em;
      margin-bottom: 15px;

  }
  .header::before, .header::after{
      display: none;
  }
}
.content{
  width: 100%;
  margin-right: 5px;
}


.route-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}


</style>
