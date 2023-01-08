<template>
    <div class="sub-cont">
        <div class="pg-body">
            <aside class="side-bar">
                <div>
                    <a :class="ActiveSection === 'upcoming' ? 'active' : ''" href="#upcoming">Upcoming Events</a>
                    <a :class="ActiveSection === 'old' ? 'active' : ''" href="#old">Old Events</a>
                </div>
            </aside>
            <div class="content">
                <div class="main-section">
                    <h3 class="sub-title" id="upcoming"> Upcoming Events </h3>
                    <transition appear mode="out-in">
                        <base-panel :items="UpcomingTickets" v-if="UpcomingTickets.length > 0"></base-panel>
                    </transition>
                </div>
                <div class="main-section" >
                    <h3 class="sub-title" id="old"> Old Events </h3>
                    <transition appear mode="out-in">
                        <base-panel :items="OldTickets" v-if="OldTickets.length > 0"></base-panel>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import fetchRequest from '../FetchApi'
import BasePanel from '../components/ui/BasePanel.vue'
const GET_MYTICKETS_API = 'http://localhost:3500/tickets/mytickets'
export default {
    components:{BasePanel},
    async created(){
        const resp = await fetchRequest(GET_MYTICKETS_API, 'GET').then(res=> res.json())
        this.AllTickets = resp
        this.UpcomingTickets = this.AllTickets.filter((ticket) => {
            const partydatetime = JSON.parse(ticket.PartyDate)
            const partytime = partydatetime.time + ":00"
            const partydate = partydatetime.date
            return new Date(partydate) > new Date() || (new Date(partydate) == new Date() && new Date().toTimeString().split(' ')[0] < partytime)
        }) 
        this.OldTickets = this.AllTickets.filter((ticket) => {
            const partydatetime = JSON.parse(ticket.PartyDate)
            const partytime = partydatetime.time + ":00"
            const partydate = partydatetime.date
            return new Date(partydate) < new Date() || (new Date(partydate) == new Date() && new Date().toTimeString().split(' ')[0] > partytime)
        }) 

    },
    mounted(){
        this.handleScroll();
        document.querySelectorAll('aside div a').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();

                document.querySelector(el.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                })
            })
        })
        window.addEventListener('scroll', () => {
            this.sections.sort((a,b) => b.ratio-a.ratio)
            this.ActiveSection = this.sections[0].id
        })
    },
    methods:{
        handleScroll(){

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry)=>{
                    const index = this.sections.findIndex(e => e.id === entry.target.getAttribute('id'))
                    if (index >= 0){
                        this.sections[index].ratio = entry.intersectionRatio
                        this.sections[index].intersecing = entry.isIntersecting
                    }else{
                        this.sections.push({
                            id: entry.target.getAttribute('id'),
                            ratio: entry.intersectionRatio,
                            intersecing: entry.isIntersecting
                        })
                    }
                })
            })

            document.querySelectorAll('.sub-title').forEach((elem) => {
                observer.observe(elem)
            })

            window.scrollTo({top:0, left:0, behavior:'smooth'})

        },
    },
    data(){
        return {
            AllTickets: [],
            UpcomingTickets: [],
            OldTickets: [],
            ActiveSection: 'upcoming',
            sections: []
        }
    },
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
    },
}
</script>

<style scoped>

/* Main Styles */
    .sub-cont{
        position: relative;
    }
    .pg-body{
        margin-top: 40px;
        display: flex;
        gap: 1%;
        flex-direction: row-reverse;
    }
    .side-bar{
        width: 20%;
        padding-left: 10px;
    }
    .side-bar div{
        position: sticky;
        top: 100px
    }
    .side-bar div a{
        display: block;
        text-decoration: none;
        color: #c3c3c3;
        padding-left: 10px;
    }


    .side-bar div a.active{
        font-weight: 600;
        border-left: 2px solid v-bind(color2);
        color: v-bind(color2);
    }
    .content{
        width: 75%
    }
    .main-section{
        position: relative;
        border: 1px solid #fff;
        border-radius: 20px;
        padding: 10px;
        padding-top: 25px;
        margin-bottom: 30px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    .sub-title{
        position: absolute;
        top: -15px;
        border-left:  1px solid white;
        padding: 0 10px;
        border-right: 1px solid white;
        background-color: v-bind(color3);
        left: 30px;
        color: white
    }

     /* transitions */
     .v-enter-active,
    .v-leave-active {
        transition: all 0.4s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
        transform: translateX(-20px);
    }
    .v-move{
        transition: all 0.3s ease;
    }

</style>