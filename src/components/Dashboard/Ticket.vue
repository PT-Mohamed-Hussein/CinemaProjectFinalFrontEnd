<template>
  <div class="header" v-if="header">
    <p class="name"> Movie Name </p>
    <p class="date"> Party Date </p>
    <p class="number"> Ticket </p>
    <p class="number chair"> Chair </p>
    <p class="user"> User </p>
    <p class="actions"> Actions </p>
  </div>
  <div class="ticket" v-else @mouseenter="showDelete = true" @mouseleave="showDelete = false" :class="{'odd': index%2, 'even': index%2 == 0}">
    <p class="name">{{name}}</p>
    <p class="date"><span class="date-string">{{PartyDate}}</span><span class="time">At {{PartyTime}}</span></p>
    <p class="number">{{ticketno}}</p>
    <p class="number chair">{{chairno}}</p>
    <p class="user">{{user}}</p>
    <div class="actions"><button class="delete" @click="DeleteTicket">Delete</button> <button class="delete small-delete" @click="DeleteTicket">x</button></div>
  </div>
</template>

<script>
export default {
    computed:{
        PartyDate () {
            if (!this.header) {
                return new Date (JSON.parse(this.date).date).toLocaleDateString('default', { day: '2-digit',  month: 'short', year: "numeric" })
            }
        },
        PartyTime(){
            if (!this.header){
                return JSON.parse(this.date).time
            }
        }
    },
    props: {
        header: {
            required: true,
            type: Boolean
        },
        index: {
            required: true,
            type: Number
        },
        name: {
            required: false,
            type: String
        },
        date: {
            required: false,
            type: String
        },
        ticketno: {
            required: false,
            type: Number
        },
        chairno: {
            required: false,
            type: String
        },
        user: {
            required: false,
            type: String
        },
        movieId: {
            required: false,
            type: String
        }
    },
    methods:{
        DeleteTicket(){
            const Ticket = {
                MovieTitle: this.name,
                Chair: this.chairno,
                UserEmail: this.user,
                PartyDate: this.date,
                TicketNo: this.ticketno,
                MovieId: this.movieId
            }
            this.$emit('DeleteTicket', Ticket)
        }
    },
    emits: ['DeleteTicket'],
    data(){
        return{
            showDelete: false,
            colors: {
                'page-bg': '#232323',
                'secondary-bg': '#000',
                'header-txt-clr': 'goldenrod',
                'primary-color': '#fff',
                'secondary-color': '#323232',
                'hover-bg': '#f6f6f6',
                'shadow-clr': '#121212',
            }
        }
    }
}
</script>

<style scoped>
    .header{
        justify-content: center;
    }
    .header, .ticket{
        display: flex;
        align-content: center;
        align-items: center;
        width: 100%;
        color: white;
        text-align: center;
    }
    .header{
        margin-bottom: 20px;
        border-bottom: 1px solid #c3c3c3;
    }
    .ticket{
        padding:10px;
        overflow: hidden;
    }
    .header > *{
        flex-grow: 0;
        flex-shrink: 0;
    }
    .even{
        background: v-bind(colors['page-bg'])
    }
    
    .name{
        width: 25%
    }
    .date{
        width: 10%;
        display: flex;
        flex-direction: column;
    }
    .date-string{
        font-weight: 600;
    }
    .time{
        font-weight: 300;
        font-size: 0.7em;
    }
    .number{
        width: 15%
    }
    .user{
        width: 25%
    }
    .actions{
        width: 10%;
        position: relative;
    }
    .delete{
        border-radius: 10px;
        background-color: v-bind(colors['header-txt-clr']);
        padding: 5px 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        transition: 0.3s all;
        border: 0;
        outline: none
    }
    .delete:hover{
        cursor: pointer;
        filter: brightness(75%)
    }
    .small-delete{
        display: none;
    }
    @media (min-width: 769px) and (max-width: 1280px){
        p{
            font-size: 0.7em
        }
    }
    @media (max-width: 768px) {
        .delete{
            display: none
        }
        .small-delete{
            display: block
        }
        p{
            font-size: 0.8em
        }
    }
    @media (max-width: 500px) {
        .user{
            display: none
        }
        .name{
            width: 30%
        }
        .date{
            width: 30%;
            display: flex;
            flex-direction: column;
        }
        
        .number{
            width: 20%
        }
        .actions{
            width: 20%;
        }
        .chair{
            display: none;
        }
    }
    @media (max-width: 420px) {
        p{
            font-size: 0.6em
        }
    }
</style>