<template>
    
    <div class="sub-cont">

        <base-modal :action="'Update Roles'" :show="activeUser.active" @closeModal="CloseActiveUser" @submitModal="UpdateUserRoles">
            <template v-slot:title>
                <p class="modal-username">{{activeUser.name || "Username"}}</p>
            </template>
            <div class="roles-cont">
                <div class="role" v-for="(role, key) in activeUser.roles" :key="role" >
                    <input type="checkbox" class="input" :id="key" v-model="role.state">
                    <label :for="key">{{key}}</label>
                </div>
            </div>
        </base-modal>

        <div class="search">
            <font-awesome-icon
                icon="fa-solid fa-magnifying-glass"
                class="search-icon"
            />            
            <input type="text" placeholder="Search For Users" class="search-bar" v-model="searchText">
            <button class="search-btn" @click="SearchEngine">Search</button>
        </div>
            <transition-group tag="div" name="cards" appear mode="out-in" class="pg-cont">
                <card v-for="user in ActiveUsers" :key="user._id">
                    <div class="img-holder">
                        <img :src='user.profilePicture'>
                    </div>
                    <div class="user-info">
                        <h3 class="user-name">{{user.username}}</h3>
                        <div class="info-section lables-section">
                            <base-label v-for="(k, role) in user.roles" :key="role" :role="role"></base-label>
                        </div>
                        <div class="info-section">
                            <span>E-mail:</span> {{user.email}}
                        </div>
                        <div class="info-section">
                            <span>Username:</span> {{user.username}}
                        </div>
                        <div class="actions">
                            <button class="edit-btn" @click="SetActiveUser(user)">
                                <font-awesome-icon icon="fa-solid fa-pencil" /> 
                                Edit
                            </button>
                            <button class="delete-btn">
                                <font-awesome-icon icon="fa-solid fa-trash" />                       
                                Delete
                            </button>
                        </div>
                    </div>
                </card>
            </transition-group>
    </div>
</template>

<script>
    import Card from '../../components/Dashboard/Card.vue';
    import BaseLabel from '../../components/Dashboard/BaseLabel.vue';
    import BaseModal from '../../components/ui/BaseModal.vue';
    import fetchRequest from '../../FetchApi';
    const USER_API = 'https://watch-this-gjx8.onrender.com/user'
    export default {
        components: { Card, BaseLabel, BaseModal },
        created(){
            this.GetAllUsers()
        },
        methods:{
            async GetAllUsers(){
                let newNotifId = this.$store.getters.getNotifId
                this.$store.dispatch('addNotif', { id: newNotifId, type: "info", title: 'Loading..', desc: "Fetching Users From Data Base."})
                try {
                    const resp = await fetchRequest (USER_API, "GET")
                    const result = await resp.json()
                    if (resp.ok){
                        this.$store.dispatch('removeNotifById', {id: newNotifId})
                        this.users = result
                        this.ActiveUsers = result
                    }else {
                        const err = new Error(result.message)
                        throw err
                    }   
                }catch (e){
                    this.$store.dispatch('removeNotifById', {id: newNotifId})
                    let norifId = this.$store.getters.getNotifId
                    this.$store.dispatch('addNotif', { id: norifId, type: "error", title: 'Failed..', desc: e.message})
                }
            },
            async SearchEngine(){
                this.ActiveUsers = this.users.filter((e) => e.username.includes(this.searchText) || e.email.includes(this.searchText))
            },
            SetActiveUser(user){
                this.activeUser.name = user.username
                this.activeUser.email = user.email
                for (let role in user.roles){
                    this.activeUser.roles[role].state = true
                }
                this.activeUser.active = true
            },
            CloseActiveUser(){
                this.activeUser = {
                    name: null,
                    email: null,
                    roles: {
                        user: {
                            code: 2001,
                            state: false
                        },
                        admin: {
                            code: 2002,
                            state: false
                        },
                    },
                    active: false
                }
            },
            async UpdateUserRoles(){
                const UserIndex = this.users.findIndex((e) => e.email === this.activeUser.email)
                const TheUser = this.users[UserIndex]

                const Roles = {}
                for (let role in this.activeUser.roles){
                    if (this.activeUser.roles[role].state){
                        Roles[role] = this.activeUser.roles[role].code
                    }
                }
                let newNotifId = this.$store.getters.getNotifId
                this.$store.dispatch('addNotif', { id: newNotifId, type: "info", title: 'Loading..', desc: "Applying Info To Database."})
                try {
                    const resp = await fetchRequest(USER_API, "PUT",
                        {
                            roles: Roles,
                            email: TheUser.email,
                            accessToken: this.$store.getters.accessToken
                        }
                    )     

                    if (resp.ok) {
                        this.$store.dispatch('removeNotifById', {id: newNotifId})
                        this.CloseActiveUser()
                        this.users[UserIndex].roles = Roles
                        const ActiveUsersIndex = this.ActiveUsers.findIndex((e) => e.email === TheUser.email)
                        this.ActiveUsers[ActiveUsersIndex].roles = Roles
                    }else{
                        const result = await resp.json()
                        const err = new Error(result.message)
                        throw err
                    }
                }catch(e){
                    this.$store.dispatch('removeNotifById', {id: newNotifId})
                    let notifId = this.$store.getters.getNotifId
                    this.$store.dispatch('addNotif', { id: notifId, type: "error", title: 'Failed..', desc: e.message})
                }
            }
        },
        watch:{
            searchText(_, __){
                this.SearchEngine()
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
                activeUser: {
                    name: null,
                    email: null,
                    roles: {
                        user: {
                            code: 2001,
                            state: false
                        },
                        admin: {
                            code: 2002,
                            state: false
                        },
                    },
                    active: false
                },
                users: [],
                ActiveUsers: [],
                searchText: null
            }
        }
    }
</script>

<style scoped>
    .search{
        position: relative;
        display: flex;
        margin-bottom: 20px
    }
    .search-bar{
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        padding: 5px;
        padding-left: 30px;
        background: #161616;
        outline: none;
        border: 0;
        color: white;
        width: 50%;
        transition: 0.3s all 
    }
    .search-bar:focus{
        width: 75%;
        background-color: v-bind(colors['shadow-clr']);
        font-size: 16px
    }
    .search-icon{
        position: absolute;
        width: 30px;
        top: 50%;
        transform: translateY(-50%);
        color: v-bind(colors['hover-bg'])

    }
    .pg-cont{
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        justify-content: center;
    }
    button{
        border: 0;
        outline: none;
        cursor: pointer;
    }
    .search-btn{
        
        background-color: v-bind(colors['secondary-color']);
        padding: 5px 10px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        color: white;
        border-left: 1px solid #3a3a3a;
        transition: 0.3s all;
    }
    .search-btn:hover{
        filter: brightness(75%);
    }
    .search-bar:focus ~ .search-btn{
        background-color: #161616;
    }
    .img-holder{
        width: 35%;
        overflow: hidden;
    }
    .img-holder img{
        width:100%;
        height: 100%;
        object-fit: cover;
    }
    .user-info{
        width: 65%;
        margin-left: 5px;
        display: flex;
        flex-direction: column;
    }
    .user-name{
        text-align: center;
    }
    .info-section{
        font-size: 12px;
        margin-bottom: 4px;
        font-weight: 500;
        color: #424242
    }
    .info-section span{
        font-size: 14px;
        font-weight: 700;
        color: white
    }
    .lables-section{
        display: flex;
        justify-content: center;
        gap: 5px
    }
    .actions{
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin-top: auto;

    }
    .edit-btn{
        padding: 5px 15px;
        border-radius: 5px;
        background-color: v-bind(colors['header-txt-clr']);
        transition: all 0.3s;
    }
    .delete-btn{
        padding: 5px 10px;
        border-radius: 5px;
        background-color: #000;
        color: goldenrod;
        transition: all 0.3s;
    }
    .edit-btn:hover, .delete-btn:hover{
        filter: brightness(75%)
    }
    .modal-cont{
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.30);
        position: fixed;
        z-index: 2;
        top: 0;
        left: 0;
    }
    .modal{
        width: max(50%, 500px);
        position: relative;
        background-color: #333;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        color: white
    }
    .modal-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: goldenrod;
        padding-bottom: 5px;
        margin-bottom: 10px;
        border-bottom: 1px solid #c3c3c3;
        padding: 10px;

    }
    .modal-title .modal-username{
        font-size: 1.2rem;
        font-weight: bold;
    }
    .close{
        font-size: 1.1rem;
        cursor: pointer;
        color: red;
        transition: all 0.3s;
    }
    .close:hover{
        filter: brightness(70%)
    }

    .roles-cont{
        padding: 10px;
    }
    .input{
        margin-right: 3px;
    }

    .update-btn-cont{
        border-top: 1px solid #c3c3c3;
        padding: 10px;
        display: flex;
        justify-content: flex-end;
    }
    .update-btn{
        padding: 5px 15px;
        border-radius: 5px;
        background-color: goldenrod;
        transition: all 0.3s;
        font-weight: 500;
    }
    .update-btn:hover{
        filter: brightness(70%)
    }
    @media (max-width: 900px) {
        .pg-cont{
            gap: 10px
        }
        
    }

    @media (max-width: 425px) {
        .card > *{
            width: 90%
        }
        
    }

    .cards-enter-active,
    .cards-leave-active {
        transition: all 0.4s ease;
    }

    .cards-enter-from,
    .cards-leave-to {
        opacity: 0;
        transform: translateX(-20px);
    }
    .cards-leave-active{
        position: absolute;
    }
    .cards-move{
        transition: all 0.3s ease;
    }
    
</style>