<template>
    <div class="sub-cont">
        <div class="img-preview" :style="{'--bg-img': `url(${Movie.Picture}` }"></div>
        <div class="ving-effect"></div>
        <div class="enligten-effect"></div>
        <div class="movie-duration">
            <font-awesome-icon icon="fa-solid fa-clock" /> {{Movie.Duration}}
        </div>
        <div class="rate-cont">
            <font-awesome-layers full-width class="fa-4x">
                <font-awesome-icon icon="fa-solid fa-star"/>
                <font-awesome-layers-text class="gray8" transform="down-1 right-1 shrink-8" :value="Movie.rate || 5" />
            </font-awesome-layers>
        </div>
        <div class="trailer-cont" :class="ActiveTrailer ? 'active' : ''">
            <h3 class="trailer-title">
                Watch Trailer 
            </h3>
            <iframe width="420" height="315"
                :src="Movie.Trailer">
            </iframe>
        </div>
        <div class="movie-info">
            <h1 class="movie-title">{{Movie.Title}}</h1>
            <h4 class="movie-dir"> By {{Movie.Director}}</h4>
            <p class="movie-story">{{Movie.Description}}</p>
            <router-link class="book-now" :to="`/book:${filmId}`" >Book Now ></router-link>
            <button class="watch-trailer" @click="TogTrailerState">Watch Trailer</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['id'],
    computed: {
        filmId () {
            return this.$route.params.id.substring(1, this.$route.params.id.length)
        },
        Movie () {
            return this.$store.getters.AllMovies.find((e) => e._id == this.filmId)
        }
    },
    
    data() {
        return {
            ActiveTrailer: false,
        }
    },
    methods: {
        TogTrailerState(){
            this.ActiveTrailer = !this.ActiveTrailer
        }
    }
}
</script>

<style scoped>
    .sub-cont{
        width: 100%;
        position: relative;
        overflow: hidden;
    }
    .img-preview{
        width: 100%;
        position: relative;
        background: var(--bg-img) center no-repeat;
        background-size: cover;
        min-height: 95vh;
        transition: all 0.3s;
    }
    .ving-effect, .enligten-effect{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
    }
    .ving-effect{
        background: rgb(255,255,255);
        background: radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(0,0,0,0.8407738095238095) 86%);    
    }
    .enligten-effect{
        opacity: 0;
        background-color: rgba(255, 255, 255, 0.05);
        transition: all 0.3s;
    }
    .sub-cont:hover .enligten-effect{
        opacity: 1;
    }
    .sub-cont:hover .img-preview{
        transform: scale(1.02);
    }
    .movie-duration{
        position: absolute;
        color: white;
        top: 10px;
        padding: 5px 10px;
        z-index: 1;
        border: 1px solid white;
        margin: 30px;
    }
    .rate-cont{
        position: absolute;
        color: gold;
        top: 10px;
        z-index: 1;
        margin: 30px;
        right: 10px;
    }
    .trailer-cont{
        position: absolute;
        color: white;
        text-align: center;
        top: 50px;
        right: 10px;
        margin: 30px;
        opacity: 0;
        transition: all 0.3s;
        visibility: hidden;
    }
    .trailer-cont.active {
        opacity: 1;
        visibility: visible;
    }
    .gray8{
        color: #333;
    }
    .movie-info{
        position: absolute;
        color: white;
        bottom: 0;
        margin: 30px;
        padding: 5px 10px;
    }
    .movie-title{
        font-size: 2.5em;
    }
    .book-now, .watch-trailer{
        outline: none;
        background: transparent;
        color: white;
        border: 1px solid white;
        padding: 10px 20px;
        margin: 10px 0;
        cursor: pointer;
        z-index: 3;
        transition: all 0.3s;
        position: relative;
        font-weight: 600;
        font-size: 1.05em;
        margin-left: 10px;
        text-decoration: none;
    }
    .book-now:hover, .watch-trailer:hover{
        color: gold;
        background-color: #333;
        border: 1px solid #333;
    }
    .rate-cont .fa-layers span.fa-layers-text{
        font-size: 0.8em;
        font-weight: 600;
    }
    @media (max-width: 768px) {
        iframe{
            width: 300px;
            height: 200px
        }
    }
    @media (max-width: 500px) {
        iframe{
            width: 250px;
            height: 200px
        }
        .movie-title{
            font-size: 1em
        }
        .movie-story{
            font-size: 0.9em
        }
        .book-now, .watch-trailer{
            font-size: 0.8em;
            padding: 5px 10px;
            margin: 5px;
            max-height: 32px;
            height: 29px
        }
    }
</style>