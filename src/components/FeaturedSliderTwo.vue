<template>
  <div class="feature-holder">
    <div class="curr-active">
      <div
        id="img-preview"
        class="img-holder active-image"
        @mouseenter="startHoverEffect"
        @mouseleave="endHoverEffect"
        :style="{'--bg-img': `url(${featuredMovies[currentIndex].picture})`}" 
      >
        <div
          class="img-caption active-image-caption"
          id="img-caption"
          style="--top: 10%"
        >
          <div class="img-title">
            {{ featuredMovies[currentIndex].title }}
          </div>
          <div class="img-info">
            <p class="img-duation">
              <font-awesome-icon icon="fa-solid fa-clock" />
              {{ featuredMovies[currentIndex].duration }}
            </p>
            <p class="img-auth">By : {{ featuredMovies[currentIndex].dir }}</p>
          </div>
          <div class="img-story">{{ featuredMovies[currentIndex].story }}</div>
        </div>
      </div>
    </div>
    <div class="slider-indicator">
        <div class="single-indicator"
        v-for="(movie, index) in featuredMovies"
          :key="movie.id"
          :class="index == currentIndex ? 'active' : ''"
          @click="setActiveImage(index)"></div>
    </div>
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
  data() {
    return {
      featuredMovies: [
        {
          title: "Spider Man No Way Home",
          rate: 5,
          picture: "https://i.imgur.com/H5WhVj6.jpg",
          story:
            "With Spider-Man's identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer able to separate his normal life as Peter Parker from the high stakes of being a superhero. When Peter asks for help from Doctor Strange, the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
          dir: "Jon Watts",
          duration: "2hrs",
          id: "film-1",
        },
        {
          title: "Spider Man No Way Home",
          rate: 5,
          picture: "https://cdn.wallpapersafari.com/28/3/GmnYPS.jpg",
          story:
            "With Spider-Man's identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer able to separate his normal life as Peter Parker from the high stakes of being a superhero. When Peter asks for help from Doctor Strange, the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
          dir: "Jon Watts",
          duration: "2hrs",
          id: "film-2",
        },
        {
          title: "Spider Man No Way Home",
          rate: 5,
          picture: "https://i.imgur.com/H5WhVj6.jpg",
          story:
            "With Spider-Man's identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer able to separate his normal life as Peter Parker from the high stakes of being a superhero. When Peter asks for help from Doctor Strange, the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
          dir: "Jon Watts",
          duration: "2hrs",
          id: "film-2",
        },
        {
          title: "Spider Man No Way Home",
          rate: 5,
          picture: "https://i.imgur.com/H5WhVj6.jpg",
          story:
            "With Spider-Man's identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer able to separate his normal life as Peter Parker from the high stakes of being a superhero. When Peter asks for help from Doctor Strange, the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
          dir: "Jon Watts",
          duration: "2hrs",
          id: "film-1",
        },
        {
          title: "Spider Man No Way Home",
          rate: 5,
          picture: "https://i.imgur.com/H5WhVj6.jpg",
          story:
            "With Spider-Man's identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer able to separate his normal life as Peter Parker from the high stakes of being a superhero. When Peter asks for help from Doctor Strange, the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
          dir: "Jon Watts",
          duration: "2hrs",
          id: "film-2",
        },
        {
          title: "Spider Man No Way Home",
          rate: 5,
          picture: "https://i.imgur.com/H5WhVj6.jpg",
          story:
            "With Spider-Man's identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer able to separate his normal life as Peter Parker from the high stakes of being a superhero. When Peter asks for help from Doctor Strange, the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
          dir: "Jon Watts",
          duration: "2hrs",
          id: "film-2",
        },
        {
          title: "Spider Man No Way Home",
          rate: 5,
          picture: "https://i.imgur.com/H5WhVj6.jpg",
          story:
            "With Spider-Man's identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer able to separate his normal life as Peter Parker from the high stakes of being a superhero. When Peter asks for help from Doctor Strange, the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
          dir: "Jon Watts",
          duration: "2hrs",
          id: "film-1",
        },
        {
          title: "Spider Man No Way Home",
          rate: 5,
          picture: "https://i.imgur.com/H5WhVj6.jpg",
          story:
            "With Spider-Man's identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer able to separate his normal life as Peter Parker from the high stakes of being a superhero. When Peter asks for help from Doctor Strange, the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
          dir: "Jon Watts",
          duration: "2hrs",
          id: "film-2",
        },
        {
          title: "Spider Man No Way Home",
          rate: 5,
          picture: "https://i.imgur.com/H5WhVj6.jpg",
          story:
            "With Spider-Man's identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer able to separate his normal life as Peter Parker from the high stakes of being a superhero. When Peter asks for help from Doctor Strange, the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
          dir: "Jon Watts",
          duration: "2hrs",
          id: "film-2",
        },
      ],
      currentIndex: 0,
      activeInterval: null,
    };
  },
  watch: {
    currentIndex() {
      let img = document.querySelector("#img-preview");
      let caption = document.querySelector("#img-caption");
      //let back = document.querySelector('#active-back')
      img.style.setProperty('--bg-img', '');
      img.classList.remove("active-image");
      //back.classList.remove('active')
      caption.classList.remove("active-image-caption");
      setTimeout(() => {
        img.style.setProperty('--bg-img', `url(${this.featuredMovies[this.currentIndex].picture}`);
        //back.style.setProperty('--bg-img-active', `url(${this.featuredMovies[this.currentIndex].picture}`);
        img.classList.add("active-image");
        //back.classList.add('active')
        caption.classList.add("active-image-caption");
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
};
</script>

<style scoped>
.feature-holder {
  width: 100%;
  display: flex;
  flex-direction: column;
    align-items: center;

}

@media (max-width: 1023px) {
  .feature-holder {
    flex-direction: column;
  }
}
.curr-active {
  width: 100%;
  position: relative;
  overflow: hidden
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
  width: 100%;
  overflow: hidden;
  min-height: 75vh;
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
  transform: translateX(-50%)
}
.img-caption {
  position: absolute;
  padding: 10px;
  top: calc(75vh - var(--top));
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
  margin: 5px 0 20px;
}

.img-info {
  font-size: 0.8em;
  margin-bottom: 10px;
}

.slider-indicator{
    width: 50%;
    display: flex;
    justify-content: center;
    gap: 2%;
}
.single-indicator{
    padding: 3px 10px;
    border: 1px solid #333;
    background-color: v-bind(color1);
    cursor: pointer;
    transition: all 0.3s;
}

.single-indicator:hover, .single-indicator.active{
    background-color:  v-bind(color2);

}
</style>
