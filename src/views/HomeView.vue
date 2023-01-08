<template>
  <div class="container">
    <FeaturedSliderThree />
    <base-head style="margin-left: 10px">All Movies</base-head>
    <AllItems class="main-section" />  
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import BaseHead from "../components/ui/BaseHead.vue";
import FeaturedSliderThree from "../components/FeaturedSliderThree.vue";
import FeaturedSliderTwo from "../components/FeaturedSliderTwo.vue";
import FeaturedSlider from "../components/FeaturedSlider.vue";
import AllItems from "../components/AllItems.vue";
export default {
  components: {
    RouterView,
    RouterLink,
    FeaturedSlider,
    AllItems,
    BaseHead,
    FeaturedSliderTwo,
    FeaturedSliderThree
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
.container {
  width: 100%;
  position: relative;
  z-index: 0;
  margin: auto
}
.main-section{
  margin-top: 40px;
}

</style>
