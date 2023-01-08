<template>
    <div class="feature-holder" v-if="featuredMovies.length>0">
        <swiper
            :pagination="{
                dynamicBullets: true,
            }"
            :modules="modules"
            class="mySwiper"
            :loop="true"
            :autoplay="{delay: 10000, disableOnInteraction: false}"
        >
            <swiper-slide v-for="movie in featuredMovies" :key="movie._id">
                <img
                    class="img-holder"
                    :src=movie.Picture
                >
                <div class="img-caption-cont">
                    <div class="Featured">
                        New
                    </div>
                    <div class="img-caption">
                        <div class="img-title">
                            {{ movie.Title }}
                        </div>
                        <div class="img-info">
                            <p class="img-duation">
                            <font-awesome-icon icon="fa-solid fa-clock" />
                                {{ movie.Duration }}
                            </p>
                            <p class="img-auth">By : {{ movie.Director }}</p>
                        </div>
                        <div class="img-story">{{ movie.Description }}</div>
                        <router-link class="book-now" :to="`/book:${movie._id}`" >Book Now ></router-link>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/autoplay";

import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper";
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    computed: {
      featuredMovies() {
        return this.$store.getters.FeaturedMovies
      }
    },
    
    setup() {
        return {
            modules: [Pagination, Autoplay],
        };
    },
  };
</script>
  
<style scoped>
.swiper {
  width: 100%;
  height: 95vh;
}
.swiper-slide{
    width: 100%
}
.img-holder{
    width: 100%;
    min-height: 95vh;
    position:relative;
    
}
.img-caption-cont{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    min-height: 95vh;
    width: 100%;
    background-image: linear-gradient(90deg, rgba(33,33,33,1) 0%, rgba(33,33,33,0) 100%);
    background-blend-mode: multiply;
    color: white;
    padding:20px
}
.Featured{
    position: absolute;
    top: 10px;
    right: 20px;
    color: #333;
    background: gold;
    padding: 5px 10px;    
    border-radius: 10px;
    font-weight: 600;
}
.img-caption{
    width: 40%
}
.img-title{
    margin-top: 10%;
    font-size: 3rem;
    font-weight: 600
}
.img-info{
    margin: 20px 20px;
    font-size: 1rem;
}
.img-story{
    margin: 0 30px;
    text-align: justify;
}
    .book-now{
        background: transparent;
        color: white;
        border: 1px solid white;
        cursor: pointer;
        z-index: 3;
        transition: all 0.3s;
        font-weight: 600;
        font-size: 1.05em;
        text-decoration: none;
        position: absolute;
        bottom: 40px;
        left: 60px;
        padding: 10px 20px
    }
    .book-now:hover{
        color: gold;
        background-color: #333;
        border: 1px solid #333;
    }
    @media (max-width: 768px) {
        .img-caption{
            width: 50%
        }
        .img-title{
            font-size: 2rem
        }
        .img-story{
            text-align: left
        }
    }
    @media (max-width: 510px) {
        .img-caption{
            width: 80%;
            font-size: 0.9rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 80%
        }
        .img-title{
            font-size: 1.5rem
        }
       
    }
</style>
  