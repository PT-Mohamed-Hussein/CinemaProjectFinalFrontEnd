<template>
  <div class="cont">
    <div class="forumContainer">
      <div class="forum">
        <h1 class="title">Login</h1>
        <div class="mail">
          <input
            type="text"
            name="email"
            id="email"
            class="inputfield"
            v-model="email"
            @change="CheckField('email')"

          />
          <span class="info" :class="!!email ? 'valid' : ''">email</span>
          <p class="error" v-if="!!error.email">Please Enter Valid E-mail</p>
        </div>
        <div class="password">
          <input
            :type="passwordtype"
            name="password"
            id="password"
            class="inputfield"
            v-model="password"
            @change="CheckField('password')"
          />
          <span class="info" :class="!!password ? 'valid' : ''">Password</span>
          <font-awesome-icon
            icon="fa-solid fa-eye"
            class="passIcon"
            v-if="passwordtype == 'password'"
            @click="changePassType"
          />
          <font-awesome-icon
            icon="fa-solid fa-eye-slash"
            class="passIcon"
            v-else
            @click="changePassType"
          />
          <p class="error" v-if="!!error.password">{{error.password}}</p>
        </div>
      </div>
      <div class="signup">
        <span
          >Dont Have Account?<RouterLink to="/register" class="signupbutton">
            Create One
          </RouterLink></span
        >
      </div>
      <div class="submit">
        <button @click="ConfirmLogin" :disabled="disabledBtn">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

import mix from "../mixin/mixins";
export default {
  components: { RouterLink },
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
  },
  mixins: [mix],
  data() {
    return {
      disabledBtn: false,
      email: null,
      password: null,
      error: {
        email: false,
        password: false,
      }
    };
  },
  methods: {
    async ConfirmLogin() {
      // form validation required here
      if (!this.email) this.error.email = true
      if (!this.password) this.error.password = 'Please Enter Valid Password'
      if (!!this.error.password || this.error.email ) return
      this.disabledBtn = true
      let notifId = this.$store.getters.getNotifId
      await this.$store.dispatch('addNotif', {id: notifId, type: "warn", title: "Loging In.. ", desc: "Verfying Your Info With The Server"})
      //lodaing and error modal modal required here
      try {
        const result = await this.$store.dispatch("Login", {
          email: this.email,
          password: this.password,
        });
        if (result.ok) {
          await this.$store.dispatch("HandleMovies")
          this.$store.dispatch('removeNotifById', {id: notifId})
          this.$router.push('/')
          this.disabledBtn = false
        }else{
          const resp = await result.json()
          const err = new Error(resp.message)
          throw err
        }
      }catch(err) {
        this.$store.dispatch('removeNotifById', {id: notifId})
        let newNotifId = this.$store.getters.getNotifId
        await this.$store.dispatch('addNotif', { id: newNotifId, type: "error", title: "Failed!", desc: err.message})
        this.disabledBtn = false
      }
    },
    CheckField(type){
      switch(type){
        case 'email':
          if (!this.email.includes('@') || this.email.length == 0) {
            this.error.email = true
            break
          }
          this.error.email = false
          break;
        case 'password':
          if (!this.password || this.password.length == 0) {
            this.error.password = 'Password Is Required' 
            break
          }
          this.error.password = false
          break
        default :
          break
      }
    }
  },
};
</script>

<style scoped>
.cont {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  /*background-color: #ece6d8;*/
  background-color: rgba(83, 93, 108, 0.3);
  justify-content: center;
}
.title {
  color: v-bind(color2);
  text-transform: uppercase;
  letter-spacing: 10px;
  width: 100%;
  text-align: center;
}
.forumContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background-color: v-bind(color1);
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  position: relative;
  padding: 4rem 20px;
  border-radius: 20px;
  justify-items: center;
  border: 1px solid black;
}
@media (max-width: 1192px) {
  .forumContainer{
    width: 45%
  }
}
@media (max-width: 720px) {
  .forumContainer{
    width: 80%
  }
}
@media (max-width: 540px) {
  .forumContainer{
    width: 90%
  }
}
.forum {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
.forum div{
  width: 90%;
  
}
.mail,
.password {
  position: relative;
}
.inputfield {
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 10px;
  width: 98%;
  background-color: v-bind(color1);
  border-radius: 10px;
  font-size: 1em;
  color: rgba(255, 255, 255, 1);
}
.info {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1em;
  color: rgba(255, 255, 255, 0.25);
  pointer-events: none;
  transition: all 0.3s ease-in-out;
  text-transform: uppercase;
}
.passIcon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.25);
  font-size: 1.1em;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.passIcon:hover {
  color: v-bind(color2);
}

.inputfield:focus ~ .info,
.valid {
  transform: translate(10px, -17px);
  color: v-bind(color2);
  font-size: 0.9em;
  padding: 0 10px;
  background-color: v-bind(color1);
  border-left: 1px solid v-bind(color2);
  border-right: 1px solid v-bind(color2);
}
.inputfield:focus {
  border-color: v-bind(color2);
}
.signup,
.rememberme {
  width: 100%;
}
.rememberme {
  display: flex;
  gap: 3px;
  align-items: center;
  font-size: 1.1em;
}
.signup {
  color: v-bind(color4);
}
.signupbutton {
  color: v-bind(color2);
  text-decoration: none;
  transition: all 0.3s;
}
.signupbutton:hover {
  color: #696861;
}
.submit {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.rememberme {
  color: v-bind(color2);
  font-size: 1em;
}

.submit button {
  outline: none;
  color: v-bind(color1);
  background-color: v-bind(color2);
  border: 0;
  padding: 10px;
  border-radius: 10px;
  font-size: 1em;
  font-weight: 700;
  transition: all 0.3s;
}

.submit button:hover {
  background-color: #696861;
  color: #b5b194;
}


.error{
  padding-left:10px;
  padding-top: 5px;
  color: red;
  font-size: 12px;
}
</style>
