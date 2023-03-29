<template>
    

    <div class="sub-cont">
        <base-modal :show="ConfirmReserve" :action="'Confirm'" @closeModal="CloseModal" @submitModal="ConfirmTakeChair">
            <template v-slot:title>
                <p>Confirm .. ?</p>
            </template>
            <div class="modal-section">
                <h3> Are You Sure That You Want To Reserve Seat Number <span>{{CurrentReservedSeat.replace(/SeatID/, '')}}</span> For Movie <span>{{Movie.Title}}</span> On <span>{{date}}</span> At <span>{{selectedparty}}</span> ? </h3>
            </div>
            
        </base-modal>
        <aside class="sidebar">
            <div class="film-cover">
                <img class="img-preview-film-cover" :src="Movie.Picture" alt="">
            </div>
            <div class="film-title">{{Movie.Title}}</div>
            <div class="film-info">
                <div class="film-dir">By {{Movie.Director}}</div>
                <div class="film-duration"> <font-awesome-icon icon="fa-solid fa-clock" /> {{Movie.Duration}}</div>
            </div>
            <div class="rate-cont">
               <font-awesome-layers full-width class="fa-3x">
                    <font-awesome-icon icon="fa-solid fa-star"/>
                    <font-awesome-layers-text class="gray8" transform="down-1 right-1 shrink-8" :value="Movie.rate" />
                </font-awesome-layers>
            </div>
            <div class="story-cont">
                {{Movie.Description}}
            </div>
            <div class="trailer-cont">
                <h3 class="trailer-title">
                    Watch Trailer 
                </h3>
                <iframe width="100%" height="315"
                    :src="Movie.Trailer">
                </iframe>
            </div>
        </aside>
        <section class="main-content">
            <h1 class="reservation-form-title">{{Movie.Title}} Ticket Reservation Form</h1>
            <div class="section">
                <p>Pick Up Watch Date</p>
                <select v-model="date">
                    <option disabled default>Pick Up Watch Date</option>
                    <option v-for="(party, index) in Movie.Parties" :key="index" :value="index" :disabled="disabled || partyDateLate(index)">{{index}}</option>
                </select>
            </div>

            <div class="section">
                <p>Pick Up Party Time</p>
                <select id="PartyTime" v-model="selectedparty">
                    <option default>{{invaliddate ? 'No Parties Avillable On This Date' : 'Pick Up Party Time'}}</option>
                    <option v-for="(party, index) in watchtime" :key="party" :disabled="disabled || partyTimeLate(index)">{{index}}</option>
                </select>
            </div>

            <div class="section">
                <p>Pick Up Seat</p>
                <div class="seatContainer" v-if="seats">
                    <div class ="screen"> Screen Here </div>
                    <svg v-for="(seat, id) in seats" :key="id" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 297 297" style="enable-background:new 0 0 297 297;" xml:space="preserve" :id ='id' class='chair' :class="seat ? 'avilableChair' : 'reservedChair'" @click="ReserveChair(id)">
                        <path d="M287.631,242.893c5.174,0,9.369-4.195,9.369-9.369V125.312c0-5.174-4.195-9.369-9.369-9.369h-6.09V78.935
                        c0-39.262-31.943-71.205-71.205-71.205c-26.448,0-49.557,14.506-61.836,35.968C136.221,22.235,113.112,7.729,86.664,7.729
                        c-39.262,0-71.205,31.943-71.205,71.205v37.008h-6.09c-5.174,0-9.369,4.195-9.369,9.369v108.213c0,5.174,4.195,9.369,9.369,9.369
                        h67.926v27.639H63.476c-5.174,0-9.369,4.195-9.369,9.369c0,5.174,4.195,9.369,9.369,9.369h46.377c5.174,0,9.369-4.195,9.369-9.369
                        c0-5.174-4.195-9.369-9.369-9.369H96.033v-27.639h104.934v27.639h-13.819c-5.174,0-9.369,4.195-9.369,9.369
                        c0,5.174,4.195,9.369,9.369,9.369h46.377c5.174,0,9.369-4.195,9.369-9.369c0-5.174-4.195-9.369-9.369-9.369h-13.819v-27.639H287.631
                        z M173.328,224.155v-27.639h74.016v27.639H173.328z M49.656,224.155v-27.639h74.016v27.639H49.656z M210.336,26.468
                        c28.931,0,52.467,23.536,52.467,52.467v37.008h-6.09c-5.174,0-9.369,4.195-9.369,9.369v52.467h-74.016v-52.467
                        c0-5.174-4.195-9.369-9.369-9.369h-6.09V78.935C157.869,50.004,181.405,26.468,210.336,26.468z M34.197,78.935
                        c0-28.931,23.536-52.467,52.467-52.467s52.467,23.536,52.467,52.467v37.008h-6.09c-5.174,0-9.369,4.195-9.369,9.369v52.467H49.656
                        v-52.467c0-5.174-4.195-9.369-9.369-9.369h-6.09V78.935z M18.738,134.681h12.18v89.475h-12.18V134.681z M142.41,134.681h12.18
                        v89.475h-12.18V134.681z M278.262,224.155h-12.18v-89.475h12.18V224.155z"/>
                    </svg>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import BaseModal from '../components/ui/BaseModal.vue';
import fetchRequest from '../FetchApi';
const TICKETS_API = 'http://127.0.0.1:3500/tickets/'
export default {
    props: ['id'],
    components: {BaseModal},
    computed: {
        filmId () {
            return this.$route.params.id.substring(1, this.$route.params.id.length)
        },
        color1() {
            return this.$store.getters.getPrimaryColor;
        },
        color2() {
            return this.$store.getters.getTextColor;
        },
        Movie () {
            return this.$store.getters.AllMovies.find((e) => e._id == this.filmId)
        },
    },
    watch: {
        date (neww, _){
            this.seats = null
            if(!this.Movie.Parties[neww]){
                this.invaliddate = true
            }else {
                this.watchtime = this.Movie.Parties[neww]
            }
        },
        selectedparty(neww, _){
            if(neww != 'Pick Up Party Time'){

                this.seats = this.Movie.Parties[this.date][neww]
            }
        }
    },
    data() {
        return {
            date: null,
            invaliddate: false,
            watchtime: null,
            selectedparty: null,
            seats: null,
            ConfirmReserve: false,
            CurrentReservedSeat: '',
            disabled: false
        }
    },

    methods: {
        ReserveChair(id){
            if (this.disabled || !this.seats[id]) return
            this.CurrentReservedSeat = id
            this.ConfirmReserve = true
        },
        CloseModal (){
            this.ConfirmReserve = false
        },
        async ConfirmTakeChair(){
            this.disabled = true
            this.ConfirmReserve = false
            let notifId = this.$store.getters.getNotifId
            try {
                this.$store.dispatch('addNotif', { id: notifId, type: "info", title: 'Loading..', desc: "Reserving Ticket For You."})
                
                
                const resp = await fetchRequest(TICKETS_API, "POST",
                    {
                        id: this.Movie._id,
                        title: this.Movie.Title,
                        chair: this.CurrentReservedSeat,
                        email: this.$store.getters.TheUser.email,
                        partydate: JSON.stringify({
                            date: this.date,
                            time: this.selectedparty
                        })
                    }
                )
                
                if(resp.ok) {
                    this.$store.dispatch('removeNotifById', {id: notifId})
                    let newNotifId = this.$store.getters.getNotifId
                    this.$store.dispatch('addNotif', { id: newNotifId, type: "success", title: 'Finished..', desc: "Ticket Reserved Successfully."})
                    await this.$store.dispatch("HandleMovies")
                    this.seats = this.Movie.Parties[this.date][this.selectedparty]
                    this.disabled = false
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
                this.disabled = false
                return
            }
        },
        partyDateLate(pdate){
            return new Date ().getDate() > new Date(pdate).getDate()
        },
        partyTimeLate(ptime){
            const actuallptime = ptime + ':00'
            if (new Date ().getDate() == new Date(this.date).getDate()){
                if(new Date().toTimeString().split(' ')[0] > actuallptime){
                    return true
                }else{
                    return false
                }
            }else if(new Date ().getDate() > new Date(this.date).getDate()){
                return true
            }else{
                return false
            }
        }

    }
}
</script>

<style scoped>
    .sub-cont{
        width: 100%;
        display: flex;
    }
    .sidebar{
        width: 30%;
        display: flex;
        flex-direction: column;
        background-color: v-bind(color1);
        border-top: 1px solid rgba(255, 255, 255, 0.3);
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        min-height: calc(100vh - 155px); /* 100px footer 55px header */
    }
    
    .film-cover{
        width: 50%;
        margin: 10px auto;
        background: var(--bg-img) center no-repeat;
        background-size: cover;
    }
    .img-preview-film-cover{
        width: 100%;
        aspect-ratio: 1/1;
        border: 1px solid #fff;
    }
    .main-content {
        width: 65%;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 30px;
        margin-left: 20px;
    }
    .film-title{
        color: v-bind(color2);
        font-size: 1.2em;
        font-weight: 600;
        text-align: center;
    }
    .film-info{
        display: flex;
        color: v-bind(color2);
        justify-content: space-evenly;
        margin-top: 10px ;
        align-items: center;
    }
    .film-dir{
        font-weight: 600;
        font-size: 0.7em;
    }
    .film-duration{
        padding: 5px 10px;
        border: 1px solid v-bind(color2);
    }
    .rate-cont{
        color: gold;
        margin: auto;
    }
    
    .gray8{
        color: #333;
    }
    .story-cont{
        color: v-bind(color2);
        padding: 10px;
        text-align: justify;
        letter-spacing: 0.1em;
        line-height: 1.2em;
    }
    .trailer-cont{
        color: v-bind(color2);
        text-align: center;
        margin: auto;
        transition: all 0.3s;
        width: 95%;
    }
    
    .reservation-form-title{
        font-weight: 600;
        width: 100%;
        text-align: center;
        letter-spacing: 0.1em;
        font-size: 1.7em;
        color: v-bind(color2)
    }

   .section {
        border-radius: 20px;
        border: 1px solid v-bind(color1);
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 30px 20px 20px;
        position: relative;
        color: v-bind(color2)
    }

   .section p {
        background-color: #212121;
        border-left: 1px solid v-bind(color1);
        border-right: 1px solid v-bind(color1);
        position: absolute;
        top: -10px;
        padding: 0 10px
    }
    .seatContainer {
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        align-content: flex-start;
        justify-content: flex-start;
        align-items: center;
        justify-items: center;
        text-align: center;
        padding: 10px;
        border-radius: 10px;
    }
    .screen{
        grid-column: 4 / 7;
        align-self: center;
        justify-self: center;
        width: 100%;
        padding: 10px;
        background-color: green;
        border-radius: 10px;
    }
#SeatID1 {
  grid-column: 1 / 2;
}

#SeatID2 {
    grid-column: 2 / 3;
}

#SeatID3 {
    grid-column: 3 / 4;
}

#SeatID4 {
    grid-column: 7 / 8;
}

#SeatID5 {
    grid-column: 8 / 9;
}

#SeatID6 {
    grid-column: 9 / 10;
}

#SeatID7 {
    grid-column: 1 / 2;
}

#SeatID8 {
    grid-column: 2 / 3;
}

#SeatID9 {
    grid-column: 3 / 4;
}

#SeatID10 {
    grid-column: 7 / 8;
}

#SeatID11 {
    grid-column: 8 / 9;
}

#SeatID12 {
    grid-column: 9 / 10;
}

.chair {
  width: 100%;
  height: 100%;
  margin: 10px;
  transition: all 0.5s;
}

.avilableChair {
  fill: rgb(0, 60, 0);
  cursor: pointer;
}

.avilableChair:hover {
  fill: rgb(0, 100, 0);
}

.reservedChair {
  fill: red;
}
.modal-section{
    padding: 10px
}
.modal-section span{
    font-weight: 900;
    color: goldenrod
}
    .rate-cont .fa-layers span.fa-layers-text{
        font-size: 0.8em;
        font-weight: 600;
    }
    @media (max-width: 890px) {
        .sidebar{
            display: none
        }
        .main-content{
            width: 95%;
            margin-bottom: 10px
        }
    }
    @media (max-width: 550px) {
        .reservation-form-title{
            font-size: 1em
        }
        
    }
</style>