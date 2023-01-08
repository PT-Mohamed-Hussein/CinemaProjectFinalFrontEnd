<template>
  <div class="base-cont">
    <slot></slot>
  </div>
</template>

<script>
export default {
    props: {

    }
}
</script>

<style scoped>
    .base-cont{
      background-color: #161616;
      color: #fff;
      width: 30%;
      box-shadow: 0 0 10px #121212;
      border-radius: 20px;
      padding: 20px
    }
</style>