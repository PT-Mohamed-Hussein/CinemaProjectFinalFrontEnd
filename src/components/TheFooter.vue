<template>
    <footer>
        <section class="primary-footer">
            <div class="contact-us">
                <div class="title">Keep In Touch With Us</div>
                <div class="icon-holder">
                    <a href=''><font-awesome-icon icon="fa-brands fa-facebook" class="icon"/></a>
                    <a href=''><font-awesome-icon icon="fa-brands fa-twitter" class="icon"/></a>
                    <a href=''><font-awesome-icon icon="fa-brands fa-youtube" class="icon"/></a>
                    <a href=''><font-awesome-icon icon="fa-brands fa-instagram" class="icon"/></a>
                </div>
            </div>
            
        </section>
        <section class="copyright">
            <h4>© 2022 Watch This Cinemas. All rights protected.</h4>
        </section>
    </footer>
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
    },
    data() {
        return {
            center: {lat: 51.093048, lng: 6.842120},
            position: {
                lat: 51.093048, lng: 6.842120
            },
        }
    }

}
</script>

<style scoped>
    footer{
        width: 100%;
        background-color: v-bind(color1);
        color: v-bind(color2);
        padding: 10px;
    }
    .primary-footer{
        display: flex;
        justify-content: center;
        gap:  1%;
        width:85%;
        max-width: 940px;
        align-items: center;
        margin: auto;
    }
    .contact-us{
        width: 75%;
        display: flex;
        flex-direction: column;
        gap: 5%;
        align-items: center;
    }
    .google-map{
        padding: 10px;
        border-left: 1px solid rgba(255, 255, 255, 0.2);
        text-align: center;
        padding-left: 30px
    }
    .contact-us div {
        width: 100%;
    }
    .title{
        display: flex;
        justify-content: center;

    }
    .icon-holder{
        display: flex;
        gap: 2%;
        justify-content: center;
    }
    .icon{
        font-size: 1.5em;
        cursor: pointer;
        outline: none;
        color: v-bind(color2);
    }

    .copyright{
        display: flex;
        justify-content: center;
    }
    @media (max-width: 425px) {
        .copyright h4{
            font-size: 0.7em
        }
    }
</style>