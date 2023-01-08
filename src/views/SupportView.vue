<template>
<div class="cont">
    <div class="forumContainer">
      <div class="forum">
        <h1 class="title">Need Support</h1>
        <div class="mail">
          <input
            type="text"
            name="email"
            id="email"
            class="inputfield"
            v-model="email"
          />
          <span class="info" :class="!!email ? 'valid' : ''">Email</span>
        </div>
        <div class="message">
          <textarea
            name="message"
            id="message"
            class="inputfield"
            v-model="message"
          />
          <span class="info" :class="!!message ? 'valid' : ''">Enter Your Message</span>
        </div>
      </div>
      <div class="submit">
        <button>Send Message</button>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

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
    data() {
        return {
            email: null,
            message: null,
            remember: null,
        };
    },

}
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
}
.forumContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background-color: v-bind(color1);
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  position: relative;
  padding: 4rem;
  border-radius: 20px;
  justify-items: center;
  border: 1px solid black;
}
.forum {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
.mail,
.message {
  position: relative;
  width: 100%;
}
textarea {
    resize: none;
}
.inputfield {
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 10px;
  width: 100%;
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
</style>
