<template>
<div class="sub-container">
  <div class="item" v-for="movie in AllMovies" :key="movie._id">
    <the-item :title="movie.Title" :rate="movie.rate" :picture="movie.Picture" :category="movie.Category" :dir="movie.Director" :duration="movie.Duration" :movieID="movie._id"></the-item>
  </div>
</div>
</template>

<script>
import TheItem from './TheItem.vue';
export default {
  components: {TheItem},
  computed:{
    AllMovies () {
      return this.$store.getters.AllMovies
    }
  },
  data() {
    return {
      // AllMovies: [
      //   {
      //     title: "Spider Man No Way Home",
      //     rate: 5,
      //     picture: "https://i.imgur.com/H5WhVj6.jpg",
      //     category: 'action',
      //     dir: "Jon Watts",
      //     duration: "2hrs",
      //     id: "film-1",
      //     featured: true
      //   },
      //   {
      //     title: "Spider Man No Way Home",
      //     rate: 5,
      //     picture: "https://i.imgur.com/H5WhVj6.jpg",
      //     category: 'horror',
      //     dir: "Jon Watts",
      //     duration: "2hrs",
      //     id: "film-2",

      //   },
      //   {
      //     title: "Spider Man No Way Home",
      //     rate: 5,
      //     picture: "https://i.imgur.com/H5WhVj6.jpg",
      //     dir: "Jon Watts",
      //     duration: "2hrs",
      //     id: "film-2",
      //     category: 'drama'
      //   },
      //   {
      //     title: "Spider Man No Way Home",
      //     rate: 5,
      //     picture: "https://i.imgur.com/H5WhVj6.jpg",
      //     category: 'action',
      //     dir: "Jon Watts",
      //     duration: "2hrs",
      //     id: "film-1",
      //   },
      //   {
      //     title: "Spider Man No Way Home",
      //     rate: 5,
      //     picture: "https://i.imgur.com/H5WhVj6.jpg",
      //     category: 'action',
      //     dir: "Jon Watts",
      //     duration: "2hrs",
      //     id: "film-2",
      //   },
      //   {
      //     title: "Spider Man No Way Home",
      //     rate: 5,
      //     picture: "https://i.imgur.com/H5WhVj6.jpg",
      //     category: 'action',
      //     dir: "Jon Watts",
      //     duration: "2hrs",
      //     id: "film-2",
      //   },
      //   {
      //     title: "Spider Man No Way Home",
      //     rate: 5,
      //     picture: "https://i.imgur.com/H5WhVj6.jpg",
      //     category: 'action',
      //     dir: "Jon Watts",
      //     duration: "2hrs",
      //     id: "film-1",
      //   },
      //   {
      //     title: "Spider Man No Way Home",
      //     rate: 5,
      //     picture: "https://i.imgur.com/H5WhVj6.jpg",
      //     category: 'action',
      //     dir: "Jon Watts",
      //     duration: "2hrs",
      //     id: "film-2",
      //   },
      //   {
      //     title: "Spider Man No Way Home",
      //     rate: 5,
      //     picture: "https://i.imgur.com/H5WhVj6.jpg",
      //     category: 'action',
      //     dir: "Jon Watts",
      //     duration: "2hrs",
      //     id: "film-2",
      //   },
      // ],
    }
  }
};
</script>

<style scoped>
  .sub-container{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 4%;
    justify-content: center;
  }
  .item{
    width: 20%;
    margin-bottom: 10px;
    position: relative;
  }

  @media (max-width: 1023px) {
    .item {
      width: 30%
    }
  }

  @media (max-width: 720px) {
    .item {
      width: 40%
    }
  }
  @media (max-width: 475px) {
    .item {
      width: 90%
    }
  }
</style>