
<script>
import { TransitionGroup } from 'vue';

export default {
    props: {
        header: {
            type: Boolean,
            required: true
        },
        ticket: {
            type: Object,
            required: false
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
    data() {
        return {
            infoactive: false
        };
    },
    components: { TransitionGroup }
}
</script>

<template>
    <div class="row header" v-if="header">
        <p class="title movie-name">Movie Name</p>
        <p class="title ticket-no">Ticket No.</p>
        <p class="title actions">Actions</p>
    </div>
    <div class="row" v-else>
        <p class="movie-name">{{ticket.MovieTitle}}</p>
        <p class="ticket-no">{{ticket.TicketNo}}</p>
        <p class="actions"><span class="arrow" @click="infoactive = !infoactive" :class="{'info-active': infoactive}"></span></p>
        <transition mode="out-in" appear>
            <div v-if="!header && infoactive" class="ticket-info">
                <h3>Ticket Info</h3>
                <div class="info">
                    <span class="info-title">
                        Seat No. >
                    </span>
                    <span class="info-value">
                        {{ticket.Chair}}
                    </span>
                </div>
                <div class="info">
                    <span class="info-title">
                        Bought On >
                    </span>
                    <span class="info-value">
                        {{ticket.BuyDate.split('T')[0]}}
                    </span>
                    <span class="info-title bought-at">
                        Bought At >
                    </span>
                    <span class="info-value ">
                        {{ticket.BuyDate.split('T')[1].slice(0, 8)}}
                    </span>
                </div>
                <div class="info">
                    <span class="info-title">
                        Party Date >
                    </span>
                    <span class="info-value">
                        {{JSON.parse(ticket.PartyDate).date}}
                    </span>
                </div>
                <div class="info">
                    <span class="info-title">
                        Party time >
                    </span>
                    <span class="info-value">
                        {{JSON.parse(ticket.PartyDate).time}}
                    </span>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
    .row{
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        padding-bottom: 2px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        padding: 10px;
        transition: all 0.3s ease;
    }
    .title{
        font-weight: 600;
    }
    .movie-name{
        width: 40%;
        margin-left: 1%;
        text-align: center;
    }
    .ticket-no{
        width: 40%;
        margin-left: 1%;
        text-align: center;
    }
    .actions{
        width: 15%;
        margin-left: 1%;
        text-align: center;
        position: relative;
    }

    .arrow{
        width: fit-content;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        transition: all 0.3s ease;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        cursor: pointer;
    }
    .arrow::after{
        content: '';
        position: absolute;
        top: 45%;
        left: 50%;
        border: solid v-bind(color4);
        border-width: 0 3px 3px 0;
        transform: translateY(-50%) translateX(-50%) rotate(45deg);
        display: inline-block;
        padding: 3px;
        transition: all 0.3s ease;
    }
    .info-active:after{
        transform: translateY(-50%) translateX(-50%) rotate(225deg);
        top: 50%;
    }
    .arrow:hover{
        background-color: rgba(255, 255, 255, 0.3);
    }

    .ticket-info{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        background-color: v-bind(color3);
        padding: 10px;
        margin-top: 10px;
        border-radius: 10px;
    }
    .ticket-info h3{
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
        position: relative;
    }
    .ticket-info h3::after{
        content:  '';
        width: 20%;
        position: absolute;
        left: 50%;
        top: 30px;
        transform: translateX(-50%);
        height: 2px;
        border-radius: 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    }
    .info{
        width: 50%;
        display: flex;
    }
    .info-title{
        width: 50%;
        font-weight: 600;
        margin-right: 20px;
        color: rgba(255, 255, 255, 0.3);
    }
    .info-value{
        width: 50%
    }
    .bought-at{
        margin-left: 10px;
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
</style>