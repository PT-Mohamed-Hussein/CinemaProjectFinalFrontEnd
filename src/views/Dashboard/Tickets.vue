<template>
    <div class="sub-cont">
        <transition name="tickets" mode="out-in">
            <div v-if="tickets.length >= 0">
                <TransitionGroup class="tickets-table" name="tickets" appear mode="out-in" tag="div">
                    <ticket :header="true" :index="0"></ticket>
                    <ticket :header="false" @DeleteTicket="RemoveTicket" v-for="(ticket, index) in tickets" :key="ticket" :movieId="ticket.MovieId" :index="index" :date="ticket.PartyDate" :name="ticket.MovieTitle" :ticketno="ticket.TicketNo" :chairno="ticket.Chair" :user="ticket.UserEmail"></ticket>
                </TransitionGroup>

            </div>
            <p class="no-data" v-else> There Is No Tickets To Display Right Now</p>
        </transition>
    </div>
</template>

<script>
    import Ticket from '../../components/Dashboard/Ticket.vue';
    import fetchRequest from '../../FetchApi';
    const TICKETS_API = 'https://watch-this-gjx8.onrender.com/tickets'
    export default {
        components:{
            Ticket
        },
        created(){
            this.GetAllTickets()
        },
        methods: {
            async GetAllTickets(){
                let notifId = this.$store.getters.getNotifId
                this.$store.dispatch('addNotif', { id: notifId, type: "info", title: 'Loading..', desc: "Fetching Tickets From Data Base."})
                try {
                    const resp = await fetchRequest (TICKETS_API, "GET")
                    const result = await resp.json()
                    if (resp.ok){
                        this.$store.dispatch('removeNotifById', {id: notifId})
                        this.tickets = result
                    }else {
                        const err = new Error (result.message)
                        throw err
                    }
                }catch (e){
                    this.$store.dispatch('removeNotifById', {id: notifId})
                    let newNotifId = this.$store.getters.getNotifId
                    this.$store.dispatch('addNotif', { id: newNotifId, type: "error", title: 'Failed..', desc: e.message})
                }
            },
            async RemoveTicket(ticket){
                let notifId = this.$store.getters.getNotifId
                this.$store.dispatch('addNotif', { id: notifId, type: "info", title: 'Loading..', desc: "Removing Ticket From Data Base."})
                try {
                    const resp = await fetchRequest (TICKETS_API, "PUT",
                        {
                            title: ticket.MovieTitle,
                            chair: ticket.Chair,
                            email: ticket.UserEmail,
                            partydate: ticket.PartyDate,
                            id: ticket.TicketNo,
                            movieid: ticket.MovieId
                        }
                    )
                    if (resp.ok){
                        this.$store.dispatch('removeNotifById', {id: notifId})
                        this.GetAllTickets()
                        return
                    }else{
                        const result = await resp.json()
                        const err = new Error(result.message)
                        throw err
                    }
                }catch (e){
                    this.$store.dispatch('removeNotifById', {id: notifId})
                    let newNotifId = this.$store.getters.getNotifId
                    this.$store.dispatch('addNotif', { id: newNotifId, type: "error", title: 'Failed..', desc: e.message})
                }
            }
        },
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
                tickets: []
            }
        }
    }
</script>

<style scoped>
    .sub-cont{
        border-radius: 10px;
        padding: 10px;
        background: v-bind(colors['secondary-bg']);
    }
    .tickets-table{
        border-radius: 10px;
        border: 1px solid v-bind(colors['secondary-color']);
        display: flex;
        flex-direction: column;
        padding: 10px;
        position: relative
    }
    .no-data{
        color: white;
        text-align: center;
    }
    .tickets-enter-active,
    .tickets-leave-active {
        transition: all 0.4s ease;
    }

    .tickets-enter-from,
    .tickets-leave-to {
        opacity: 0;
        transform: translateX(-20px);
    }
    .tickets-leave-active{
        position: absolute;
    }
    .tickets-move{
        transition: all 0.3s ease;
    }

</style>