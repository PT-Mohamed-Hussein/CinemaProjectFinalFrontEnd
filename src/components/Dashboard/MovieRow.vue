<template>
    <div class="header" v-if="header">
        <p class="name"> Movie Name </p>
        <p class="actions"> Actions </p>
    </div>
    <div class="movie" v-else @mouseenter="showEdit = true" @mouseleave="showEdit = false" :class="{'odd': index%2, 'even': index%2 == 0}">
        <p class="name">{{name}}</p>
        <div class="actions">
            <router-link :to="`/dashboard/movie/${id}`" class="edit" >
                <font-awesome-icon icon="fa-solid fa-pencil" /> 
                <span>Edit</span>
            </router-link>
        </div>
    </div>
</template>
  
<script>
export default {
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
        id:{
            required: false,
            type: String
        }
    },
    data(){
        return{
            showEdit: false,
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
    .header, .movie{
        display: flex;
        align-content: center;
        align-items: center;
        width: 100%;
        color: white;
        text-align: center;
    }
    .header{
        margin-bottom: 5px;
        padding-bottom: 5px;
        border-bottom: 1px solid #c3c3c3;
    }
    .movie{
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
        width: 65%
    }
    .actions{
        width: 35%;
        position: relative;
    }
    .edit{
        border-radius: 10px;
        background-color: v-bind(colors['header-txt-clr']);
        padding: 5px 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        transition: 0.3s all;
        border: 0;
        outline: none;
        color: black;
        text-decoration: none;
    }
    .edit:hover{
        filter: brightness(75%)
    }
    @media (max-width: 550px) {
        .actions span{
            display: none
        }
    }
</style>