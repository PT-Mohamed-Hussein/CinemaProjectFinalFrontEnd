<template>
    <div class="sub-cont">
        <h1 class="title" v-if="routeName == 'Add-Edit Movie' && routeParam == 'add-new' " >
            Add New Movie
        </h1>
        <h1 class="title" v-else-if="routeName == 'Add-Edit Movie' && routeParam !== 'add-new' " >
            Edit Movie
        </h1>
        <h1 class="title" v-else>
            {{routeName}}
        </h1>
        <transition name="route" mode="out-in">            
            <base-container v-if="routeName == 'dashboard'">
                    <div>Content</div>
            </base-container>
        </transition>

        
        <router-view v-if="routeName != 'dashboard'" v-slot="slotProps">
            <transition name="route" mode="out-in">
                <component :is="slotProps.Component"></component>
            </transition>
        </router-view>
    </div>
</template>

<script>
    import BaseContainer from '../../components/Dashboard/BaseContainer.vue';
    const MOVIES_API = 'https://watch-this-gjx8.onrender.com/movies/'
    export default {
        components: {BaseContainer},
        computed: {
            routeName () {
                return this.$router.currentRoute.value.name
            },
            routeParam(){
                if (this.$router.currentRoute.value.params.movie){
                    return this.$router.currentRoute.value.params.movie
                }
                return false
            },
            
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
                MovieTitle: ''
            }
        }
    }
</script>

<style>
    ::-webkit-scrollbar{
        width: 10px
    }
    ::-webkit-scrollbar-track{
        background-color: #232323
    }
    ::-webkit-scrollbar-thumb{
        background-color: #323232;
        transition: 0.1s;
    }
    ::-webkit-scrollbar-thumb:hover{
        background-color: #424242
    }
</style>

<style scoped>

    
    .title{
        position: relative;
        color: var(--primary-color);
        text-transform: capitalize;
        margin: 20px 20px 40px;
    }
    .title::before, .title::after{
        content: '';
        height: 3px;
        position: absolute;
        bottom: -10px;
        left: 0;
        border-radius: 10px;
    }
    .title::before{
        background-color: var(--secondary-color);
        width: 120px;
    }
    .title::after{
        background-color: var(--header-txt-clr);
        width:40px;
    }
    
.route-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

</style>