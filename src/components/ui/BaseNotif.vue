<template>
    <div class="notif" :class="type">
      <div class="cont" :class="type">
        <div class="icon">
            <font-awesome-icon icon="fa-solid fa-triangle-exclamation" v-if="type === 'error'" />
            <font-awesome-icon icon="fa-sharp fa-solid fa-circle-info" v-if="type === 'info'" />
            <font-awesome-icon icon="fa-solid fa-circle-exclamation" v-if="type === 'warn'"/>        
            <font-awesome-icon icon="fa-solid fa-circle-check" v-if="type === 'success'"/> 
        </div>
        <div class="body">
            <div class="title">{{title}}</div>
            <div class="desc">
                <p>{{desc}}</p>
            </div>
        </div>
        <div class="close-btn" @click="$emit('removeNotif', id)">x</div>
      </div>
    </div>
</template>
  
<script>
export default {
    props: {
        id:{
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: false,
            default: "No Title",
        },
        type: {
            type: String,
            required: true
        },
        desc:{
            type: String,
            required: true
        }
    },
    computed: {
        color1() {
            return this.$store.getters.getPrimaryColor;
        },
        color2() {
            return this.$store.getters.getTextColor;
        },
    },
};
</script>

<style scoped>
  .notif{
    width: 100%;
    min-height: 100px;
    border-radius: 10px;
    margin-bottom: 10px;
    opacity: 0;
    padding: 5px;
    transform: translateY(-10px);
    animation: appear 0.3s forwards linear, disappear 0.3s forwards linear 9s;
    visibility: hidden;
  }
  @keyframes appear {
    100%{
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
    }
  }
  @keyframes disappear {
    100%{
      opacity: 0;
      transform: translateY(10px);
      visibility: hidden;
    }
  }
  .cont{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 30% 65% 5%;
    grid-template-rows: 1fr 1fr;
    border-radius: 10px;
    padding: 10px;
  }
  .cont.warn {
    border: 1px solid goldenrod;
  }
  .cont.error {
    border: 1px solid red;
  }
  .cont.info {
    border: 1px solid white;
  }
  .cont.success {
    border: 1px solid green;
  }
  .icon{
    grid-row: 1/3;
    grid-column: 1/2;
    align-self: center;
    display: flex;
    align-items: center;
    height: 100%;
    width:100%;
    opacity: 0;
    animation: fade 3s infinite linear;
    position: relative;
  }
  
  @keyframes fade {
    50%{
        opacity: 1;
    }
    100%{
        opacity: 0
    }
  }
  .error{
    background: #222;
    color: red;
  }

  .warn{
    background: #333;
    color: goldenrod
  }
  .info{
    background: #002246;
    color: white
  }
  .success {
    background: #444;
    color: green
  }
  .icon svg{
    height: 75%;
    width: 75%;
  }
  .warn .icon svg {
    color: goldenrod;
    filter: drop-shadow(0 0 15px rgba(218, 165, 32, 0.5));

  }
  .error .icon svg {
    color: red;
    filter: drop-shadow(0 0 15px rgba(255, 0, 0, 0.5));

  }
  .info .icon svg{
    color: white;    
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
  }
  .success .icon svg {
    color: rgb(0, 96, 0);    
    filter: drop-shadow(0 0 5px rgba(0, 95, 0, 0.5));
  }
  .body{
    grid-row: 1/3;
    grid-column: 2/3;
    align-self: center;
  }
  .title{
    grid-row: 1/2;
    grid-column: 2/3;
    font-size: 1.2em
  }
  .desc{
    grid-row: 2/3;
    grid-column: 2/3;
    font-size: 0.8em
  }

  .close-btn{
    grid-row: 1/2;
    grid-column: 3/4;
    cursor: pointer;
    z-index: 3;
  }
</style>
  