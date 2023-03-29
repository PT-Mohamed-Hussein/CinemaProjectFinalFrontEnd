<template>
    
    <div class="sub-cont">
        <base-modal :show="AddNewParty.state" :action="'Add Party'" @closeModal="CloseModal" @submitModal="handleAddParty">
            <template v-slot:title>
                <p>Add New Party</p>
            </template>
            <div class="section">
                <label for="PartyDate">Select Party Date</label>
                <input type="date" id="PartyDate" v-model="AddNewParty.date">
            </div>
            <div class="section">
                <label for="PartyTime">Enter Party Time</label>
                <input type="time" id="PartyTime" v-model="AddNewParty.time">
            </div>
        </base-modal>
        
        <div class="add-movie-cont">
            <button class="finish-movie" @click="FinishMovie">
                Finish
            </button>
        </div>

        <div class="api-section movie-information">
            <h3 class="sub-title"> Add Movie From API </h3>
            <div class="section">
                <label for="movieTitleApi">Enter Movie Title To Search For</label>
                <div class="search-area">
                    <span class="tag" v-if="SelectedMovieID">{{SelectedMovieName}} ( {{SelectedMovieID}} )<font-awesome-icon icon="fa-solid fa-xmark" class="close-icon" @click="removeSelectedMovie"/></span>
                    <input :disabled="disable" type="text" id="movieTitleApi" v-model="movieTitleApi">
                    <div class="search-btn" @click="APISearch">
                        <font-awesome-icon
                            icon="fa-solid fa-magnifying-glass"
                            class="search-icon"
                        />
                        <span>Search</span>
                    </div>
                    <div class="search-result-cont" v-if="ApiSearchResult.length > 0">
                        <div class="search-result" v-for="movie in FilteredApiSearchResult" :key="movie" @click="selectMovie(movie)">
                            <div class="img-cont">
                                <img :src="`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`">
                            </div>
                            <div class="title-cont">
                                {{movie.original_title}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
        <div class="movie-information">
            <h3 class="sub-title"> Movie Information </h3>
            <div class="section">
                <label for="movieName">Enter Movie Name</label>
                <input required :disabled="disable" type="text" id="movieName" v-model="movieName.value" @blur="handleError('movieName')">
                <div class="err-cont" v-if="!!movieName.error">{{movieName.error}}</div>
            </div>

            <div class="section">
                <label for="movieDesc">Enter Movie Description</label>
                <textarea required id="movieDesc" v-model="movieDesc.value" @blur="handleError('movieDesc')"></textarea>
                <div class="err-cont" v-if="!!movieDesc.error">{{movieDesc.error}}</div>
            </div>

            <div class="section">
                <label for="moviePicUrl">Enter Movie Picture Url</label>
                <input @blur="handleError('moviePicUrl')" required :disabled="disable" type="text" id="moviePicUrl" v-model="moviePicUrl.value">
                <div class="err-cont" v-if="!!moviePicUrl.error">{{moviePicUrl.error}}</div>
            </div>

            <div class="section">
                <label for="movieDirector">Enter Movie Director</label>
                <input @blur="handleError('movieDirector')" required :disabled="disable" type="text" id="movieDirector" v-model="movieDirector.value">
                <div class="err-cont" v-if="!!movieDirector.error">{{movieDirector.error}}</div>
            </div>

            <div class="section">
                <label for="movieDuration">Enter Movie Duration</label>
                <input @blur="handleError('movieDuration')" required :disabled="disable" type="text" id="movieDuration" v-model="movieDuration.value">
                <div class="err-cont" v-if="!!movieDuration.error">{{movieDuration.error}}</div>
            </div>

            <div class="section">
                <label for="movieCategory">Enter Movie Category</label>
                <input @blur="handleError('movieCategory')" required :disabled="disable" type="text" id="movieCategory" v-model="movieCategory.value">
                <div class="err-cont" v-if="!!movieCategory.error">{{movieCategory.error}}</div>
            </div>

            <div class="section">
                <label for="releaseDate">Enter Movie Release Date</label>
                <input @blur="handleError('releaseDate')" required :disabled="disable" type="string" id="releaseDate" v-model="releaseDate.value">
                <div class="err-cont" v-if="!!releaseDate.error">{{releaseDate.error}}</div>
            </div>
            
            <div class="section">
                <label for="ratingId">Enter Movie Rating ID</label>
                <input @blur="handleError('ratingId')" required :disabled="disable" type="number" id="ratingId" v-model="ratingId.value">
                <div class="err-cont" v-if="!!ratingId.error">{{ratingId.error}}</div>
            </div>

            <div class="section">
                <label for="movieTrailerUrl">Enter Movie Trailer Url</label>
                <input @blur="handleError('movieTrailerUrl')" required :disabled="disable" type="text" id="movieTrailerUrl" v-model="movieTrailerUrl.value">
                <div class="err-cont" v-if="!!movieTrailerUrl.error">{{movieTrailerUrl.error}}</div>
            </div>
        </div>

        <div class="movie-information">
            <h3 class="sub-title"> Cinema Information </h3>
            <div class="add-new-party">
                <button class="add-new-party-btn" @click="disable ? '' : AddNewParty.state = true">
                    Add New Party <font-awesome-icon icon="fa-solid fa-plus" class="add-new-party-icon"/>
                </button>
            </div>
            <div class="parties-cont">
                <div class="party" v-for="(party, date) in Parties" :key="party">
                    Party Date : <span class="pdate"> {{ date }} </span> 
                    <div class="time" v-for="(p, time) in party" :key="p">
                        At {{time}} : <span :class="GetSeatColors ? 'seats-available' : 'seats-notavailable'">Seats Available {{GetAvailableSeats(p)}}</span> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseModal from '../../components/ui/BaseModal.vue'
import fetchRequest from '../../FetchApi'

const MOVIES_API = 'https://watch-this-gjx8.onrender.com/movies/'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=140adb778fed4fe6d4165bd6f240f610&query='


export default {
    components: {BaseModal},
    props: ['movie'],
    async created(){
        if (this.movie == 'add-new'){
            this.movieName.value = ''
        }else {
            this.GetMovieInfo()
        }

        this.generes = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=140adb778fed4fe6d4165bd6f240f610').then(async (res) => await res.json())
        this.generes = this.generes['genres']
    },
    computed: {
        FilteredApiSearchResult(){
            return this.ApiSearchResult.filter((e) => e.id !== this.SelectedMovieID)
        },
        SelectedMovieName(){
            return this.ApiSearchResult.find((e)=> e.id === this.SelectedMovieID).original_title
        }
    },
    data() {
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
            movieTitleApi: null,
            ApiSearchResult: [],
            SelectedMovieID: null,
            generes: [],
            movieName: {
                value: "",
                error: false
            },
            movieDesc: {
                value: "",
                error: false
            },
            moviePicUrl: {
                value: "",
                error: false
            },
            movieDirector: {
                value: "",
                error: false
            },// i will write
            movieDuration: {
                value: "",
                error: false
            },// i will write
            movieTrailerUrl: {
                value: "",
                error: false
            },// i will write
            movieCategory: {
                value: "",
                error: false
            },
            releaseDate:{
                value: '',
                error: false
            },
            ratingId:{
                value: null,
                error: false
            },
            AddNewParty: {
                state: false,
                date: null,
                time: null,
                seatsNumber: 21
            },
            Parties:{},
            disable: false
        }
    },
    methods: {
        async checkValue() {
            if(this.movieName.value == '' || this.movieName.value == ' ') this.movieName.error = 'Movie Name Cannot Be Empty'
            if(this.movieDesc.value == '' || this.movieDesc.value == ' ') this.movieDesc.error = 'Movie Store/Description Cannot Be Empty'
            if(this.moviePicUrl.value == '' || this.moviePicUrl.value == ' ' || (!this.moviePicUrl.value.includes('.png') && !this.moviePicUrl.value.includes('.jpg')) ) this.moviePicUrl.error = 'Please Enter Valid Picture URL'
            if(this.movieDirector.value == '' || this.movieDirector.value == ' ') this.movieDirector.error = 'Movie Director Cannot Be Empty'
            if(this.movieDuration.value == '' || this.movieDuration.value == ' ') this.movieDuration.error = 'Movie Duration Cannot Be Empty'
            if(this.movieTrailerUrl.value == '' || this.movieTrailerUrl.value == ' ' || !this.movieTrailerUrl.value.includes('embed') ) this.movieTrailerUrl.error = 'Trailer URL Must Be Valid Iframe Link'
            if(this.movieCategory.value == '' || this.movieCategory.value == ' ') this.movieCategory.error = 'Movie Category Cannot Be Empty'
            if(this.releaseDate.value == '' || this.releaseDate.value == ' ') this.releaseDate.error = 'Movie Release Date Cannot Be Empty'
            if(typeof(this.ratingId.value) != 'number' || !this.ratingId.value ) this.ratingId.error = 'Movie Rating Must Be Valid Movie Id From the movie db list'
        },
        CloseModal(){
            this.AddNewParty.state = false
            this.AddNewParty.date = null
            this.AddNewParty.time = null
            this.AddNewParty.seatsNumber = 21
        },
        handleAddParty(){
            const PartyDate = this.AddNewParty.date
            const PartyTime = this.AddNewParty.time
            let seats = {}
            for (let i = 1; i<=this.AddNewParty.seatsNumber; i++){
                seats[`SeatID${i}`] = true
            }
            if (this.Parties[PartyDate]){
                if (this.Parties[PartyDate][PartyTime]){
                    return
                }
                Object.assign(this.Parties[PartyDate], {
                    [PartyTime]: seats
                })
            }else{
                this.Parties[PartyDate] = {
                    [PartyTime]: seats
                }
            }
            
            this.CloseModal()
        },
        GetAvailableSeats(seats){
            let AllSeats = 0
            let AvilableSeats = 0
            for (let seat in seats){
                AllSeats++
                if (seats[seat]){
                    AvilableSeats++
                }
            }

            return `${AvilableSeats} / ${AllSeats}`
        },
        GetSeatColors(seats) {
            let AvilableSeats = 0
            for (let seat in seats){
                if (seats[seat]){
                    AvilableSeats++
                }
            }
            if (AvilableSeats > 0) return true
            return false
        },
        async GetMovieInfo(){
            this.disable = true
            let notifId = this.$store.getters.getNotifId
            this.$store.dispatch('addNotif', { id: notifId, type: "info", title: 'Loading..', desc: "Gettting Movie Info."})
            try {
                const resp = await fetchRequest(MOVIES_API+this.movie, "GET")
                if(resp.ok) {
                    const result = await resp.json()
                    this.movieName.value = result.Title
                    this.movieDesc.value = result.Description
                    this.moviePicUrl.value = result.Picture
                    this.movieDirector.value = result.Director
                    this.movieDuration.value = result.Duration
                    this.movieCategory.value = result.Category
                    this.movieTrailerUrl.value = result.Trailer
                    this.ratingId.value = result.ratingID
                    this.releaseDate.value = result.releaseDate
                    

                    this.Parties = JSON.parse(result.Parties)
                    this.$store.dispatch('removeNotifById', {id: notifId})
                    let newNotifId = this.$store.getters.getNotifId
                    this.$store.dispatch('addNotif', { id: newNotifId, type: "success", title: 'Finished..', desc: "Movie Info Has Been Arrived."})
                    this.disable = false
                    return
                }else {
                    const result = await resp.json()
                    const err = new Error(result.message) 
                    throw err
                }
            }catch(e){
                this.$store.dispatch('removeNotifById', {id: notifId})
                let newNotifId = this.$store.getters.getNotifId
                this.$store.dispatch('addNotif', { id: newNotifId, type: "error", title: 'Failed..', desc: e.message})
                this.disable = false
                return
            }
        },
        async FinishMovie(){

            this.disable = true
            await this.checkValue()
            if(!!this.movieName.error || !!this.movieDesc.error || !!this.moviePicUrl.error || !!this.movieDirector.error || !!this.movieDuration.error || !!this.movieTrailerUrl.error || !!this.ratingId.error || !!this.releaseDate.error || !!this.movieCategory.error || !this.Parties || this.Parties == {}) return this.disable = false
            let notifId = this.$store.getters.getNotifId

            try {
                let meth, bod
                if (this.movie == 'add-new') {
                    this.$store.dispatch('addNotif', { id: notifId, type: "info", title: 'Loading..', desc: "Adding New Movie."})
                    meth = 'POST'
                    bod = {
                        title: this.movieName.value,
                        desc: this.movieDesc.value,
                        pic: this.moviePicUrl.value,
                        director: this.movieDirector.value,
                        duration: this.movieDuration.value,
                        trailer: this.movieTrailerUrl.value,
                        ratingid: this.ratingId.value,
                        releasedate: this.releaseDate.value,
                        parties: JSON.stringify (this.Parties),
                        category: this.movieCategory.value.toLowerCase()
                    }
                }else{
                    this.$store.dispatch('addNotif', { id: notifId, type: "info", title: 'Loading..', desc: "Apply You Modifications."})
                    meth = 'PUT'
                    bod = {
                        id: this.movie,
                        title: this.movieName.value,
                        desc: this.movieDesc.value,
                        pic: this.moviePicUrl.value,
                        director: this.movieDirector.value,
                        duration: this.movieDuration.value,
                        trailer: this.movieTrailerUrl.value,
                        ratingid: this.ratingId.value,
                        releasedate: this.releaseDate.value,
                        parties: JSON.stringify (this.Parties),
                        category: this.movieCategory.value.toLowerCase()
                    }
                }
                const resp = await fetchRequest(MOVIES_API, meth, bod)
                    
                
                if(resp.ok) {
                    this.$store.dispatch('removeNotifById', {id: notifId})
                    let newNotifId = this.$store.getters.getNotifId
                    this.$store.dispatch('addNotif', { id: newNotifId, type: "success", title: 'Finished..', desc: "Movie Added/Edited Successfully."})
                    this.disable = false
                    return
                }else {
                    const result = await resp.json()
                    const err = new Error(result.message)
                    throw err
                }
            }catch(e){
                this.$store.dispatch('removeNotifById', {id: notifId})
                let newNotifId = this.$store.getters.getNotifId
                this.$store.dispatch('addNotif', { id: newNotifId, type: "error", title: 'Failed..', desc: e.message})
                this.disable = false
                return
            }
        },
        async APISearch(){
            this.ApiSearchResult = []
            if (this.movieTitleApi == '' || this.movieTitleApi == ' ') {
                this.ApiSearchResult = [] 
                return
            }
            const resp = await fetch(SEARCH_API+this.movieTitleApi)
            const result = await resp.json()
            for (let movie in result.results){
                this.ApiSearchResult.push(result.results[movie])
            }
        },
        selectMovie(movie) {
            this.SelectedMovieID = movie.id
            this.movieName.value = movie.original_title
            this.movieDesc.value = movie.overview
            this.moviePicUrl.value = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
            this.movieCategory.value = this.generes.find((e) => e.id == movie.genre_ids[0]).name
            
            this.ratingId.value = movie.id
            this.releaseDate.value = movie.release_date
            
        },
        removeSelectedMovie(){
            this.SelectedMovieID = null
            this.movieName.value = ""
            this.movieDesc.value = ""
            this.moviePicUrl.value = ""
            this.movieCategory.value = ""
            
            this.ratingId.value = null
            this.releaseDate.value = null
            this.Parties = {}
        },
        handleError(data){
            this[data].error = false
        }
    }
}
</script>

<style scoped>
    .movie-information{
        position: relative;
        border: 1px solid #fff;
        border-radius: 20px;
        padding-top: 35px;
        margin-bottom: 30px
    }
    .sub-title{
        position: absolute;
        top: -15px;
        border-left:  1px solid white;
        padding: 0 10px;
        border-right: 1px solid white;
        background-color: v-bind(colors['page-bg']);
        left: 30px;
        color: white
    }
    .add-movie-cont{
        display: flex;
        justify-content: flex-end
    }
    .finish-movie{
        background-color: transparent;
        color: green;
        outline: none;
        border:0;
        padding: 10px 20px;
        border-radius: 10px;
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 10px;
        cursor: pointer;
        transition: 0.3s all
    }
    .finish-movie:hover{
        background-color: rgb(0, 39, 0) ;
    }
    .section {
        border-radius: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px;
        padding-bottom: 0;
        padding-top: 5px;
        margin-bottom: 10px;
        position: relative;
        background-color: v-bind(colors['page-bg']);
        color: v-bind(colors['primary-color']);
    }

   .section label {
        top: -5px;
        padding: 0 10px
    }
    input, textarea{
        padding: 3px;
        background-color: #c1bdb5;
        outline: none;
        border: 0;
        border-radius: 5px;
    }
    textarea{
        resize: none;
        height: 100px;
        padding: 5px;
        border-radius: 10px;
    }
    .add-new-party{
        display: flex;
        justify-content: flex-end;
        z-index:99
    }
    .add-new-party-btn{
        background: none;
        outline: none;
        color: rgb(155, 232, 255);
        border: 0;
        font-size: 1.2rem;
        cursor: pointer;
        margin: 0 20px;
        margin-bottom: 5px;
        border-radius: 10px;
        padding: 10px 20px;
        transition: all 0.3s
    }
    .add-new-party-btn:hover{
        background-color: rgb(0, 72, 94);
    }

    .parties-cont{
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        gap: 20px

    }

    .party{
        background: v-bind(colors['secondary-bg']);
        color: white;
        padding: 10px;
        border-radius: 10px;
    }

    .pdate, .time{
        color: v-bind(colors['header-txt-clr'])
    }

    .seats-available{
        color: green
    }

    .seats-notavailable{
        color: red
    }

    /* api section */
    .search-area{
        display:flex;
        flex-direction: row;
        padding: 10px;
        flex-wrap: wrap;
    }
    .search-area input{
        width: 91%;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        padding-top: 3px;
        padding-bottom: 3px;
    }
    .search-btn{
        display: flex;
        background: #c1bdb5;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        padding: 5px 3px;
        border-left: 1px solid #333;
        transition: all 0.3s;
        color: rgb(87, 87, 87);
        width: 9%;
    }
    .search-btn:hover {
        background-color: #6b6862;
        color: white
    }
    .search-icon {
        margin-right: 10px
    }

    .search-result-cont{
        background-color: #121212;
        width: 100%;
        display: flex;
        flex-direction: column;
        width: 91%;
        padding: 10px;
        max-height: 300px;
        overflow: hidden;
        overflow-y: auto;
    }
    .search-result{
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        max-height: 100px;
        margin-bottom: 10px;
        border-bottom: 1px solid #333;
        cursor: pointer;
        transition: 0.3s all;
        padding: 3px;
        gap: 10px
    }
    .search-result:hover{
        background: #6b6862;
    }
    .search-result .img-cont{
        width: 30%;
        height: 100%
    }
    .search-result .img-cont img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        overflow: hidden
    }
    .search-result .title-cont{
        width: 70%
    }
    .tag{
        background: rgba(255, 192, 203, 0.322);
        color: hotpink;
        padding: 3px;
        border-radius: 10px;
        margin-bottom: 5px
    }
    .close-icon{
        cursor: pointer;
        margin: 0 5px;
        border-radius: 10px;
    }
    @media (max-width: 500px) {
        .search-btn span{
            display: none
        }
        .search-btn{
            width: 19%
        }
        .search-area input{
            width: 80%
        }
        .search-result-cont{
            width: 82%
        }
    }
    .err-cont{
        padding: 3px;
        border-radius: 5px;
        color: rgb(145, 0, 0);
        margin-left: 5px;
        width: fit-content;
        font-size: 0.8em;
    }
</style>