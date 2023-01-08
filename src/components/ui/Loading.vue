<template>
    <div class="loading-cont">
        <div class="spin3">
            <div class="c1"></div>
            <div class="c2"></div>
            <div class="c3"></div>
        </div>
        <div class="loading-message">{{loadingMessage}}{{dots}}</div>
    </div>
</template>

<script>
export default {
    computed:{
        loadingMessage () {
            return this.$store.getters.LoadingMessage || 'Fetching your Data'
        }
    },
    data(){
        return {
            dots: '.'
        }
    },
    mounted(){
       this.PlayWithDots()
    },
    methods:{
        PlayWithDots(){
            if (this.dots.length >= 5){
                this.dots = ''
            }
            this.dots = this.dots + '.'
            setTimeout(this.PlayWithDots, 500)
        }
    }

}
</script>

<style scoped>
    .loading-cont{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #212121;
    }
    .spin3 {
        display: flex;
        position: relative;
        justify-content: center;
    }
    .spin3 div {
        position: absolute;
        border-radius: 50%;
        border: 2px solid transparent;
        animation: spin linear infinite;
        border-bottom-color: goldenrod;
    }
    .spin3 .c1 {
        width: 80px;
        height: 80px;
        animation-duration: 0.85s;
    }
    .spin3 .c2 {
        top: -10px;
        width: 100px;
        height: 100px;
        animation-duration: 0.95s;
    }
    .spin3 .c3 {
        top: -20px;
        width: 120px;
        height: 120px;
        animation-duration: 1.05s;
    }
    @keyframes spin {
        from {transform: rotate(0);}
        to {transform: rotate(360deg);}
    }
    .loading-message{
        top: 65%;
        position: absolute;
        color: white;
        font-weight: 600;
        text-transform: capitalize;
        font-size: 1.2rem
    }
</style>