<template>
  <div class="title">
    <slot></slot>
  </div>
</template>

<script>
export default {
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
.title {
  text-transform: capitalize;
  margin: 10px 0;
  width: 30%;
  clip-path: polygon(0 0, 65% 0, 100% 100%, 100% 100%, 0 100%, 0% 50%);
  padding: 10px;
  background-color: v-bind(color1);
  color: v-bind(color2);
  box-shadow: 0 2px 8px v-bind(color1);
  font-weight: 600;
  font-size: 1.1em
}

@media (min-width: 1280px){
  .title{
    max-width: 360px;
  }
}

@media (max-width: 768px) {
  .title {
    width: 40%;
  }
}


@media (max-width: 425px) {
  .title {
    width: 70%;
  }
}
</style>
