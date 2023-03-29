<template>
  <nav class="my-nav" :class="{'scrolled': scrollY > 60 && !pageRoute.includes('book') && !pageRoute.includes('movie'), 'not-home': pageRoute.includes('book') || pageRoute.includes('movie') || pageRoute.includes('tickets') }">
    <router-link to="/" class="logo">Watch <span class="title-second-half">This</span></router-link>
    
    <div class="info" v-if="user">
      <div class="img-holder">
        <img :src="user.profilePicture" alt="picture" />
      </div>
      <div class="username" @click="togMenu">
        <span>{{user.username}}</span>
        <font-awesome-icon icon="fa-solid fa-caret-down" class="down-icon" />
      </div>
    </div>
    <div class="dropdown-dashes" @click="togsidebar"></div>
    <div class="dropdown-info" v-if="dropdownActive">
      <div class="drop-personal-info">
        <div class="drop-img-holder">
          <img :src="user.profilePicture" alt="picture" />
        </div>
        <div class="drop-username">
          <span>{{user.username}}</span>
        </div>
      </div>
      <div class="drop-options">
        <RouterLink to="/mytickets" class="option"><font-awesome-icon icon="fa-solid fa-ticket" class="fa-fw" /> My Tickets</RouterLink>
        <RouterLink to="/support" class="option"><font-awesome-icon icon="fa-solid fa-envelope" class="fa-fw" /> Support</RouterLink>
        <RouterLink to="/editprofile" class="option"><font-awesome-icon icon="fa-solid fa-user" class="fa-fw" /> Edit My Profile</RouterLink>
        <RouterLink to="/dashboard" class="option" v-if="isAdmin"><font-awesome-icon icon="fa-regular fa-chart-bar" class="fa-fw"/> Dashboard</RouterLink>
      </div>
      <div class="logoutsection">
        <div to="/" class="option" @click="logout">
          <font-awesome-icon
            icon="fa-solid fa-right-from-bracket"
            class="down-icon"
          />
          Logout
        </div>
      </div>
    </div>
    <Transition name="slide-fade">
      <div class="sidebar-cont" v-if="sidebar">
        <div class="sidebar-info" v-if="sidebar">
          <div class="close-btn" >
            <font-awesome-icon icon="fa-solid fa-xmark" class="close-icon" @click="togsidebar" />
          </div>
          <div class="drop-personal-info">

            <div class="drop-img-holder">
              <img :src="user.profilePicture" alt="picture" />
            </div>
            <div class="drop-username">
              <span>{{user.username}}</span>
            </div>
          </div>
          <div class="drop-options">
            <RouterLink to="./" class="option">My Tickets</RouterLink>
            <RouterLink to="/support" class="option">Support</RouterLink>
            <RouterLink to="./" class="option">Edit My Profile</RouterLink>
            <RouterLink to="/dashboard" class="option" v-if="isAdmin">Dashboard</RouterLink>
          </div>
          <div class="logoutsection">
            <div to="/" class="option" @click="logout">
              <font-awesome-icon
                icon="fa-solid fa-right-from-bracket"
                class="down-icon"
              />
              Logout
            </div>
          </div>
        </div>
      </div>
    </Transition>

  </nav>
  
    
</template>

<script>
import { RouterLink } from "vue-router";
import fetchRequest from "../FetchApi";
 
const GET_MYUSER_API = 'https://watch-this-gjx8.onrender.com/user/getmyuserinfo'

export default {
  components: { RouterLink },

  async created(){
    window.addEventListener('scroll', ()=> {
      this.scrollY = window.pageYOffset
    })
    // getting user data
    try{
      const resp = await fetchRequest(GET_MYUSER_API, 'GET')
      if (resp.ok){
        const result = await resp.json()
        this.$store.dispatch('setUserState', result)
      }
    }catch (e){
      console.log(e)
    }
    
  },
  
  data() {
    return {
      dropdownActive: false,
      scrollY:0,
      sidebar: false
    };
  },
  computed: {
    color1() {
      return this.$store.getters.getPrimaryColor;
    },
    color2() {
      return this.$store.getters.getTextColor;
    },
    color3() {
      return this.$store.getters.getSecondaryColor;
    },
    color4() {
      return this.$store.getters.getExecColor;
    },
    isAdmin (){
      return this.$store.getters.isAdmin
    },
    user(){
      return this.$store.getters.TheUser
    },
    pageRoute(){
      return this.$router.currentRoute.value.path || ''
    },
  },
  methods: {
    togMenu() {
      this.dropdownActive = !this.dropdownActive;
    },
    async logout() {
      try {
        const result = await this.$store.dispatch('Logout')
        if (result.ok) this.$router.push('/login')
      }catch(err){
        console.log(err)
      }
    },
    togsidebar() {
      this.sidebar = !this.sidebar
    }
  },
};
</script>

<style scoped>
nav {
  display: grid;
  width: 100%;
  grid-template-columns: 25% 50% 25%;
  align-items: center;
  z-index: 10;
  color: v-bind(color2);
  background-color: transparent;
  position: fixed;
  top: 0;
  padding: 5px;

}

.scrolled{
  background-color: v-bind(color1);
  color: v-bind(color2); 
  box-shadow: 1px 1px 10px #000;
}
.not-home{
  position: relative;
  background-color: v-bind(color1);
}
.logo {
  grid-column: 1/2;
  width: 100%;
  display: flex;
  justify-content: center;
  letter-spacing: 0.1em;
  padding: 10px;
  text-transform: uppercase;
  align-items: center;
  font-weight: 600;
  text-decoration: none;
  color: white
}
.title-second-half{
  background-color: v-bind(color4);
  color: v-bind(color1);
  margin-left: 10px;
  padding: 5px 20px;
}
.info {
  grid-column: 3/4;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: relative;
  padding-top: 3px;
}
.img-holder {
  width: 15%;
  display: flex;
}
.img-holder img {
  width: 100%;
  object-fit: contain;
  border-radius: 50%;
}
.username {
  cursor: pointer;
}
.personalinfo,
.username {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}
.dropdown-info {
  position: absolute;
  top: 60px;
  background-color: v-bind(color1);
  width: 25%;
  right: 5px;
  overflow: hidden;
  transition: all 0.3s;
  border-radius: 6px;
  margin-top: 2px;
  z-index: 1;
}
.drop-personal-info {
  padding: 10px 20px;
  display: grid;
  grid-template-columns: 20% 75%;
  gap: 5%;
  align-items: center;
  justify-items: center;
  border-bottom: 1px solid v-bind(color2);
  margin-bottom: 10px;
}
.drop-img-holder {
  width: 100%;
  grid-column: 1/2;
}
.drop-img-holder img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 50%;
}
.drop-username {
  width: 100%;
  font-size: 1.2em;
  font-weight: 700;
  color: v-bind(color2);
}
.drop-options,
.logoutsection {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  font-size: 1.1em;
  font-weight: 500;
}
.option {
  width: 100%;
  padding: 10px;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  color: v-bind(color2);
  transition: 0.3s;
}
.option:hover {
  background-color: v-bind(color2);
  color: v-bind(color1);
}
.drop-options {
  border-bottom: 1px solid v-bind(color2);
}
.logoutsection {
  margin-top: 7px;
  margin-bottom: 7px;
}

.dropdown-dashes{
  display: none;
  position: relative;
  width: 100%;
  color: v-bind(color4);
  grid-column: 3/4;
  cursor: pointer
}

.dropdown-dashes::before, .dropdown-dashes::after{
  content: '';
  position: absolute;
  width: 35px;
  height: 5px;
  border-radius: 10px;
  background: v-bind(color4);
  top: -7px;
  right: 10px;
  transition: all 0.3s;
}
.dropdown-dashes::after{
  top: 3px;
  box-shadow: 0 -20px
}
.sidebar-cont{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4)
}
.sidebar-info{
  position: fixed;
  min-height: 100vh;
  width: 300px;
  background-color: v-bind(color1);
  top: 0;
  right: 0;
  box-shadow: 1px 1px 10px #000;
}
.close-btn{
  width :100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px
}
.close-icon{
  margin-right: 10px;
  cursor: pointer;
  z-index: 11;
}

@media (max-width: 768px) {
  nav{
    grid-template-columns: 50% 0% 50%;
  }
  .logo{
    letter-spacing: normal;
    justify-content: flex-start;
  }
  .title-second-half{
    margin-left: 5px;
    padding: 5px 10px;
  }
  .info{
    display: none;
  }
  .dropdown-dashes{
    display: block;
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

</style>
