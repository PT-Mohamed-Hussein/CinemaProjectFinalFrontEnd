<template>
  <div class="feature-holder" v-if="featuredMovies.length>0">
    <div class="curr-active">
      <div class="curr-active-back active" id="active-back" :style="{'--bg-img-active': `url(${featuredMovies[currentIndex].Picture})`}" ></div>

      <div
        id="img-preview"
        class="img-holder active-image"
        @mouseenter="startHoverEffect"
        @mouseleave="endHoverEffect"
        :style="{'--bg-img': `url(${featuredMovies[currentIndex].Picture})`}" 
      >
        <div
          class="img-caption active-image-caption"
          id="img-caption"
          style="--top: 10%"
        >
          <div class="img-title">
            {{ featuredMovies[currentIndex].Title }}
          </div>
          <div class="img-info">
            <p class="img-duation">
              <font-awesome-icon icon="fa-solid fa-clock" />
              {{ featuredMovies[currentIndex].Duration }}
            </p>
            <p class="img-auth">By : {{ featuredMovies[currentIndex].Director }}</p>
          </div>
          <div class="img-story">{{ featuredMovies[currentIndex].Description }}</div>
        </div>
      </div>
    </div>

    <div class="sidebar">
      <div class="side-title">Featured Movies</div>
      <div class="sidebar-items-holder">
        <div
          class="sidebar-item"
          v-for="(movie, index) in featuredMovies"
          :key="movie._id"
          :class="index == currentIndex ? 'active' : ''"
          @click="setActiveImage(index)"
        >
          <div class="side-img-holder">
            <img :src="movie.Picture" />
          </div>
          <div class="side-info">
            <p class="side-movie-title">{{ movie.Title }}</p>
            <p class="side-director">By {{ movie.Director }}</p>
          </div>
          <div class="side-subinfo">
            <p class="side-duration">
              <font-awesome-icon icon="fa-solid fa-clock" />{{ movie.Duration }}
            </p>
            <div class="side-rate">
              <p>
                {{ movie.rate || 5 }}
                <font-awesome-icon
                  icon="fa-solid fa-star"
                  class="icon"
                  borderd
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHead from "./ui/BaseHead.vue";
export default {
  computed: {
    color1() {
      return this.$store.getters.getPrimaryColor;
    },
    color2() {
      return this.$store.getters.getTextColor;
    },
    featuredMovies() {
      return this.$store.getters.FeaturedMovies
    }
  },
  data() {
    return {
      currentIndex: 0,
      activeInterval: null,
    };
  },
  watch: {
    currentIndex() {
      let img = document.querySelector("#img-preview");
      let caption = document.querySelector("#img-caption");
      let back = document.querySelector('#active-back')
      img.style.setProperty('--bg-img', '');
      img.classList.remove("active-image");
      back.classList.remove('active')
      caption.classList.remove("active-image-caption");
      setTimeout(() => {
        img.classList.add("active-image");
        back.classList.add('active');
        caption.classList.add("active-image-caption");
        img.style.setProperty('--bg-img', `url(${this.featuredMovies[this.currentIndex].Picture}`);
        back.style.setProperty('--bg-img-active', `url(${this.featuredMovies[this.currentIndex].Picture}`);
      }, 1000);
    },
  },
  methods: {
    StartSlideShow() {
      this.activeInterval = setInterval(() => {
        if (this.currentIndex + 1 < this.featuredMovies.length) {
          this.currentIndex++;
        } else {
          this.currentIndex = 0;
        }
      }, 5000);
    },
    setActiveImage(index) {
      clearInterval(this.activeInterval);
      this.currentIndex = index;
      this.StartSlideShow();
    },
    startHoverEffect() {
      let caption = document.querySelector("#img-caption");
      let height = caption.offsetHeight;
      caption.style.setProperty("--top", `${height}px`);
    },
    endHoverEffect() {
      let caption = document.querySelector("#img-caption");
      caption.style.setProperty("--top", "10%");
    },
  },
  mounted() {
    this.StartSlideShow();
  },
  components: { BaseHead },
};
</script>

<style scoped>
.feature-holder {
  width: 95%;
  display: flex;
  gap: 4%;
  align-items: center;
  margin:auto;
}

@media (max-width: 1023px) {
  .feature-holder {
    flex-direction: column;
  }
}
.curr-active {
  width: 68%;
  position: relative;

}

@media (max-width: 1023px) {
  .curr-active {
    width: 100%;
  }
}
.curr-active-back{
  position: absolute;
  width: 100%;
  height:102%;
  background: var(--bg-img-active) center no-repeat ;
  background-size: cover;
  filter: blur(5px);
  z-index: -1;
  left: 50%;
  top: 50%;
  opacity: 0;
  transform: translateX(-50%) translateY(-50%) scale(0.5);
  transition: all 1s;
}

.curr-active-back.active{
  opacity: 1;
  transform: translateX(-50%) translateY(-50%) scale(1);
}
.img-holder {
  position: relative;
  width: 95%;
  overflow: hidden;
  min-height: 500px;
  background: var(--bg-img) center no-repeat;
  background-size: cover;
  opacity: 0;
  transform: translateX(-60px);
  transition: transform 1s, opacity 1s, filter 0.3s;
  margin-bottom: 10px;
  left: 50%;
  top: 50%;
}
.img-holder:hover{
  filter: grayscale(0.5);
  transform: translateX(-50%) scale(1.02)
}
.img-caption {
  position: absolute;
  padding: 10px;
  width: 100%;
  top: calc(100% - var(--top));
  background: rgb(42, 53, 62);
  background: linear-gradient(
    180deg,
    rgba(42, 53, 62, 1) 0%,
    rgba(42, 53, 62, 0.5298494397759104) 62%
  );
  color: v-bind(color2);
  opacity: 0;
  transform: translateX(-60px);
  transition: transform 1s, opacity 1s, top 0.3s;
}
.active-image,
.active-image-caption {
  opacity: 1;
  transform: translateX(0);
}
.active-image{
  transform: translateX(-50%) ;
}
.img-title {
  font-size: 1.4em;
  font-weight: 600;
  margin-bottom: 10px;
}

.img-info {
  font-size: 0.8em;
  margin-bottom: 10px;
}

.sidebar {
  width: 28%;
  display: flex;
  flex-direction: column;
  max-height: 500px;
  overflow: hidden;
  overflow-y: auto;
  border: 1px solid v-bind(color1);
}
.sidebar-items-holder {
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 500px;
}
@media (max-width: 1023px) {
  .sidebar {
    width: 100%;
    flex-direction: row;
    overflow-y: hidden;
    overflow-x: auto;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .sidebar-items-holder {
    flex-direction: row;
    flex-wrap: nowrap;
  }
}

.sidebar::-webkit-scrollbar {
  width: 10px;

}

/* Track */
.sidebar::-webkit-scrollbar-track {
  border-radius: 10px;

}

/* Handle */
.sidebar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

/* Handle on hover */
.sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.4);
}

.side-title {
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 0.1em;
  padding: 10px;
  text-align: center;
  position: sticky;
  font-size: 1.2em;
  color: v-bind(color1);
  background-color: v-bind(color2);
  width: 99.7%;
}
@media (max-width: 1023px) {
  .side-title {
    width: 100%;
  }
}
.sidebar-item {
  width: 99.7%;
  display: grid;
  padding: 10px;
  grid-template-columns: 20% 55% 20%;
  grid-template-rows: repeat(2, 50%);
  justify-items: center;
  justify-content: center;
  gap: 1%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  transition: all 0.3s;
  cursor: pointer;
}
@media (max-width: 1023px) {
  .sidebar-item {
    width: 30%;
    flex-grow: 0;
    flex-shrink: 0;
    grid-template-columns: 50% 50% 0%;
    grid-template-rows: repeat(2, auto);
    border-bottom: 0;
    border-right: 1px solid rgba(0, 0, 0, 0.4);
  }
}
@media (max-width: 475px) {
  .sidebar-item {
    margin: 0;
  }
}
.sidebar-item.active,
.sidebar-item:hover {
  background-color: v-bind(color1);
  color: v-bind(color2);
}
.side-img-holder {
  grid-column: 1/2;
  grid-row: 1/3;
  display: flex;
  align-self: center;
}
.side-img-holder img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border: 1px solid black;
}
.side-info {
  grid-column: 2/3;
  justify-self: center;
}
.side-movie-title {
  grid-row: 1/2;
}
@media (max-width: 475px) {
  .side-movie-title {
    font-size: 0.6em;
  }
}

.side-director {
  grid-row: 2/3;
  font-size: 0.6em;
  font-weight: 600;
}
@media (max-width: 475px) {
  .side-director {
    font-size: 0.4em;
  }
}
.side-subinfo {
  grid-column: 3/4;
}
.side-duration {
  grid-row: 1/2;
  margin-bottom: 10px;
}
.side-rate {
  grid-row: 2/3;
  align-self: flex-end;
  position: relative;
}
@media (max-width: 1023px) {
  .side-img-holder {
    grid-column: 1/3;
    grid-row: 1/2;
  }
  .side-info {
    grid-row: 2/3;
    grid-column: 1/3;
    justify-self: center;
  }
  .side-movie-title {
    grid-column: 1/2;
  }
  .side-director {
    grid-column: 2/3;
  }
  .side-subinfo {
    visibility: none;
    opacity: 0;
  }
}
.icon {
  font-size: 1.5em;
  color: gold;
}
</style>
