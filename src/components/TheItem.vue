<template>
    <div class="film-cont" :data-category="category" :style="{'--bg-img': `url(${picture})`, '--tag': `${category}`}" :class="[category == 'action' || category == 'horror' || category == 'drama' ? `${category}` : 'normal-categ', featured ? 'featured' : '']" >
        <div class="rate-cont">
            <font-awesome-layers full-width class="fa-2x">
                <font-awesome-icon icon="fa-solid fa-star"/>
                <font-awesome-layers-text class="gray8" transform="down-1 right-1 shrink-8" :value="rate" />
            </font-awesome-layers>
        </div>
    </div>
    <router-link class="film-link" :to="`/movie:${movieID}`" :title="title" :rate="rate" :picture="picture" :category="category" :dir="dir" :duration="duration" :story="story" :movieID="movieID">{{title}}</router-link>
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
        color3() {
            return this.$store.getters.getSecondaryColor;
        },
        color4() {
            return this.$store.getters.getExecColor;
        },
        featured(){
            const FMovies = this.$store.getters.FeaturedMovies
            return FMovies.find((e) => e._id == this.movieID)
        }
    },

    props: {
        title: {
            type: String,
            required: false,
            default: "No Title",
        },
        rate: {
            type: Number,
            required: true
        },
        picture: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: false,
            default: "No Category"
        },
        dir: {
            type: String,
            required: false,
            default: "No Director"
        },
        duration: {
            type: String,
            required: false,
            default: "99999 hrs"
        },
        movieID: {
            type: String,
            required: true
        },
        story: {
            type: String,
            required: false,
            default: 'no story'
        }
    }
}
</script>

<style scoped>
    .film-link{
        color: v-bind(color2);
        cursor: pointer;
        text-decoration: none;
        font-weight: 600;
        font-size: 1.2em;
        display: flex;
        justify-content: center;
        transition: all 0.3s;
        text-transform: capitalize;
        text-align: center
    }
    .film-link:hover{
        color: v-bind(color4)
    }
    .film-cont{
        width: 100%;
        min-height: 300px;
        background: var(--bg-img) center no-repeat;
        background-size: cover;
        border: 1px solid v-bind(color1);
        border-radius: 10px;
        position: relative;
    }
    .action::before, .horror::before, .drama::before, .normal-categ::before {
        content: attr(data-category);
        position: absolute;
        top: 10px;
        right: -10px;
        background-color: v-bind(color1);
        color: v-bind(color2);
        padding: 5px 10px;
        border-radius: 5px;
        box-shadow: 0px 4px 8px #333;
        text-transform: uppercase;
        font-weight: 600;
    }
    .horror::before{
        content: 'horror';
        background-color: black;
        color: white;
    }
    .drama::before{
        content: 'drama';
        background-color: #96C5F7;
        color: #333;
    }
    .featured::after{
        content: 'new';
        position: absolute;
        top: 10px;
        left: -10px;
        padding: 5px 10px;
        border-radius: 5px;
        box-shadow: 0px 4px 8px #333;
        text-transform: uppercase;
        background-color: gold;
        color: #333;
        font-weight: 600;
    }
    .rate-cont{
        color: gold;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
    .rate-cont .fa-layers span.fa-layers-text{
        font-size: 0.8em;
        font-weight: 600;
    }
    .gray8{
        color: #333;
    }
    .fa-star{
        stroke: #333;
        stroke-width: 10px;    
    }
</style>