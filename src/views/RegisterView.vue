<template>
  <div class="cont">
    <div class="forumContainer">
      <div class="forum">
        <h1 class="title">Register</h1>
        <div class="mail">
          <input type="text" class="inputfield" v-model="username" @change="CheckField('username')"/>
          <span class="info" :class="!!username ? 'valid' : ''">username</span>
          <p class="error" v-if="!!error.username">{{error.username}}</p>
        </div>
        <div class="mail">
          <input type="text" class="inputfield" v-model="email" @change="CheckField('email')" />
          <span class="info" :class="!!email ? 'valid' : ''">E-Mail</span>
          <p class="error" v-if="error.email">Please Enter Valid E-Mail</p>
        </div>
        <div class="mail">
          <input type="text" class="inputfield" v-model="phone" @change="CheckField('phone')"/>
          <span class="info" :class="!!phone ? 'valid' : ''">Phone Number</span>
          <p class="error" v-if="error.phone">Please Enter Phone Number</p>
        </div>

        <div class="password">
          <input :type="passwordtype" class="inputfield" v-model="password" @change="CheckField('password')"/>
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
        <div class="password">
          <input
            :type="passwordconfirmationtype"
            class="inputfield"
            v-model="passwordconfirmation"
            @change="CheckField('password')"
          />
          <span class="info" :class="!!passwordconfirmation ? 'valid' : ''"
            >Confirm Password</span
          >
          <font-awesome-icon
            icon="fa-solid fa-eye"
            class="passIcon"
            v-if="passwordconfirmationtype == 'password'"
            @click="changePassConfirmationType"
          />
          <font-awesome-icon
            icon="fa-solid fa-eye-slash"
            class="passIcon"
            v-else
            @click="changePassConfirmationType"
          />
        </div>
      </div>
      <div class="login">
        <span
          >Already Have Account?<RouterLink to="/login" class="loginbutton">
            Login
          </RouterLink></span
        >
      </div>
      <div class="tos">
        <input type="checkbox" id="tos" ref="tos" v-model="tos" @change="CheckField('tos')" />
        <label for="tos"
          >I've Already Read All
          <RouterLink to="/" class="loginbutton">
            Terms Of Service
          </RouterLink></label
        >
      </div>
      <p class="error" v-if="error.tos">Please Confirm To Terms Of Service</p>
      <div class="submit">
        <button @click="ConfirmRegister" :disabled="disabledBtn">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import mix from "../mixin/mixins";

export default {
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
      username: null,
      email: null,
      phone: null,
      password: null,
      passwordconfirmation: null,
      tos: null,
      disabledBtn: false,
      error: {
        username: false,
        email: false,
        phone: false,
        password: false,
        tos: false
      }
    };
  },
  methods: {
    async ConfirmRegister() {
      if (!this.username) this.error.username = 'Please Enter Valid Username'
      if (!this.email) this.error.email = true
      if (!this.phone) this.error.phone = true
      if (!this.password) this.error.password = 'Please Enter Valid Password'
      if (!this.tos) this.error.tos = true 
      if(this.password !== this.passwordconfirmation) this.error.password = 'Password Mismatch'
      if (!!this.error.username || !!this.error.password || this.error.email || this.error.phone || this.error.tos ) return
      this.disabledBtn = true
      const notifId = this.$store.getters.getNotifId
      await this.$store.dispatch('addNotif', {id: notifId, type: "warn", title: "Please Wait", desc: "We Are The Doing The Job Now"})

      //lodaing and error modal modal required here
      try {
        const result = await this.$store.dispatch("registerNewAccount", {
          email: this.email,
          password: this.password,
          phoneno: this.phone,
          username: this.username
        });
        if (result.ok) {
          this.$store.dispatch('removeNotifById', {id: notifId})
          this.$router.push('/login')
          let sucessNotifId = this.$store.getters.getNotifId
          await this.$store.dispatch('addNotif', {id: sucessNotifId, type: "success", title: "Success.. ", desc: "Your Account Has Been Created Successfully Please Loging With It Now."})
          this.disabledBtn = false
        }else {
          const resp = await result.json()
          const err = new Error(resp.message)
          throw err
        }
      }catch (err){
        this.$store.dispatch('removeNotifById', {id: notifId})
        let newNotifId = this.$store.getters.getNotifId
        await this.$store.dispatch('addNotif', { id: newNotifId, type: "error", title: "Failed!", desc: err.message})
        this.disabledBtn = false
      }
      
    },
    CheckField(type){
      switch(type){
        case 'username':
          if (this.username && this.username.includes(' ')) {
            this.error.username = 'User Name Cannot Contain Whitespaces' 
            break
          }
          if (this.username && this.username.length == 0){
            this.error.username = 'User Name Cannot Be Empty' 
            break
          }
          this.error.username = false
          break;
        case 'email':
          if (!this.email.includes('@') || this.email.length == 0) {
            this.error.email = true
            break
          }
          this.error.email = false
          break;
        case 'password':
          if (this.password !== this.passwordconfirmation){
            this.error.password = 'Password Mismatch' 
            break
          }
          this.error.password = false
          break
        case 'phone':
          if (this.phone.length == 0 || this.phone.length == 0){
            this.error.phone = 'Please Enter Valid Phone No.' 
            break
          }
          this.error.phone = false
          break
        case 'tos':
          this.error.tos = !this.$refs.tos.checked
        default :
          break
      }
    }
  },
  components: { RouterLink },
};
</script>

<style scoped>
#app {
  background-color: #ece6d8;
}
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
.login,
.tos {
  width: 100%;
}
.tos {
  display: flex;
  gap: 3px;
  align-items: center;
  font-size: 1.1em;
}
.login {
  color: v-bind(color4);
}
.loginbutton {
  color: v-bind(color2);
  text-decoration: none;
  transition: all 0.3s;
}
.loginbutton:hover {
  color: #696861;
}
.submit {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.tos {
  color:v-bind(color4);
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
