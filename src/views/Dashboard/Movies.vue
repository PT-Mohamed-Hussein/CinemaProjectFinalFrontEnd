<template>
    <div class="sub-cont">
        <div class="control-btns">
            <router-link to="/dashboard/movie/add-new" class="add">
                Add New <font-awesome-icon icon="fa-solid fa-plus" class="add-new"/>
            </router-link> 
        </div>
        <div class="movies-cont">
            <TransitionGroup class="movies-border" name="movies" appear mode="out-in" tag="div">
                <MovieRow :header="true" :index="0"></MovieRow>
                <MovieRow  v-for="(movie, key) in movies" :key="movie._id" :header="false" :index="key" :name="movie.Title" :id="movie._id"></MovieRow>
                <p class="no-movies" v-if="movies.length == 0"> No Movies Found Start Add Some From <router-link to="/dashboard/movie/add-new">Here</router-link>  </p>
            </TransitionGroup>
        </div>
    </div>
</template>

<script>
    import MovieRow from '../../components/Dashboard/MovieRow.vue';
    const MOVIES_API = 'https://watch-this-gjx8.onrender.com/movies'
    export default {
        components:{
            MovieRow
        },
        created(){
            this.$store.dispatch("HandleMovies")
        },
        computed:{
            movies(){
                return this.$store.getters.AllMovies
            }
        },
        // methods:{
        //     async GetAllMovies(){
        //         let newNotifId = this.$store.getters.getNotifId
        //         this.$store.dispatch('addNotif', { id: newNotifId, type: "info", title: 'Loading..', desc: "Fetching Movies From Data Base."})
        //         try {
        //             const resp = await fetch (MOVIES_API, {
        //                 method: 'GET',
        //                 headers: {
        //                     'authentication': this.$store.getters.accessToken
        //                 }
        //             })
        //             const result = await resp.json()

        //             if (resp.ok){
        //                 this.$store.dispatch('removeNotifById', {id: newNotifId})
        //                 this.movies = result
        //             }else{
        //                 let newNotifId = this.$store.getters.getNotifId
        //                 this.$store.dispatch('addNotif', { id: newNotifId, type: "error", title: 'Failed..', desc: resp,message})
        //             }
        //         }catch (e){
        //             console.log(e)
        //             let newNotifId = this.$store.getters.getNotifId
        //             this.$store.dispatch('addNotif', { id: newNotifId, type: "error", title: 'Failed..', desc: e.message})
        //         }
        //     }
        // },
        data(){
            return {
                colors: {
                    'page-bg': '#232323',
                    'secondary-bg': '#000',
                    'header-txt-clr': 'goldenrod',
                    'primary-color': '#fff',
                    'secondary-color': '#323232',
                    'hover-bg': '#f6f6f6',
                    'shadow-clr': '#121212',
                },
                
            }
        }
    }
</script>

<style scoped>
    
    .control-btns{
        display: flex;
        justify-content: flex-end;
        margin-right: 20px;
    }
    .add{
        display: flex;
        color: white;
        background-color: green;
        align-items: center;
        padding: 10px;
        border-radius: 10px;
        transition: 0.3s all;
        cursor: pointer;
        outline: none;
        text-decoration: none;
    }
    .add:hover{
        opacity: brightness(70%)
    }
    .add-new{
        font-size: 1.4rem;
        margin-left: 10px
    }
    .movies-cont{
        padding: 10px;
        background: v-bind(colors['secondary-bg']);
        border-radius: 10px;
        margin-top: 10px
    }
    .movies-border{
        position: relative;
        display: flex;
        flex-direction: column;
        border: 1px solid v-bind(colors['secondary-color']);
        border-radius: 10px;
        padding: 10px;
    }
    .no-movies{
        text-align: center;
        color: white
    }

    .movies-enter-active,
    .movies-leave-active {
        transition: all 0.4s ease;
    }

    .movies-enter-from,
    .movies-leave-to {
        opacity: 0;
        transform: translateX(-20px);
    }
    .movies-leave-active{
        position: absolute;
    }
    .movies-move{
        transition: all 0.3s ease;
    }
</style>