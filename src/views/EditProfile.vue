<template>
    <transition name="loading">
        <div>
            <Loading v-if="isLoading"></Loading>
            <div class="sub-cont" v-show="!isLoading">

                <div class="profile-pic-section" :style="{'--bg-img': `url('http://localhost:3500/images/cover.jpg')`}" v-if="ProfilePic && user.profilePicture">
                    <div class="rounded-corners"></div>
                    <img :src="ProfilePic || user.profilePicture" v-if="ProfilePic && user.profilePicture">
                    <input type="file" :disabled="disable" @change="UpdatePicture" name="profilepic" ref="ProfilePic" class="upload-input" title="Dimensions 512 X 512">
                    <div class="input-overlay">
                        <div class="overlay">
                            <span>Click to upload</span>
                            <font-awesome-icon icon="fa-solid fa-camera" />
                        </div>
                    </div>
                </div>
                <button class="update-profile" @click="finalizingUpdate" >
                    Save Changes
                </button>
                <div class="pg-body">
                    <aside class="side-bar">
                        <div>
                            <a :class="ActiveSection === 'personal-info' ? 'active' : ''" href="#personal-info">Personal Information</a>
                            <a :class="ActiveSection === 'security-info' ? 'active' : ''" href="#security-info">Security Information</a>
                        </div>
                    </aside>
                    <div class="content">
                        <div class="main-section">
                            <h3 class="sub-title" id="personal-info"> Personal Information </h3>
                            <div class="section double-inputs">
                                
                                <div class="first-input">
                                    <label for="FirstName">Enter First Name</label>
                                    <input placeholder="Eg: Mohamed" required :disabled="disable" type="text" id="FirstName" v-model="FirstName.value" @blur="handleError('FirstName')">
                                    <div class="err-cont" v-if="!!FirstName.error">{{FirstName.error}}</div>
                                </div>
                                
                                <div class="second-input">
                                    <label for="LastName">Enter Last Name</label>
                                    <input required placeholder="Eg: Hussein" :disabled="disable" type="text" id="LastName" v-model="LastName.value" @blur="handleError('LastName')">
                                    <div class="err-cont" v-if="!!LastName.error">{{LastName.error}}</div>
                                </div>
                            </div>

                            <div class="section">
                                <label for="PhoneNo">Enter Phone No.</label>
                                <input required placeholder="Eg: 01012789932" :disabled="disable" type="tel" id="PhoneNo" v-model="PhoneNo.value" @blur="handleError('PhoneNo')">
                                <div class="err-cont" v-if="!!PhoneNo.error">{{PhoneNo.error}}</div>
                            </div>
                            
                        </div>
                        <div class="main-section" >
                            <h3 class="sub-title" id="security-info"> Security Information </h3>
                            <div class="section">
                                <label for="OldPassword">Enter Old Password </label>
                                
                                <input placeholder="Only Use It If You Want Update Your Password" required :disabled="disable" :type="oldPasswordtype" id="OldPassword" v-model.trim="OldPassword.value" @blur="handleError('OldPassword')">
                                <font-awesome-icon
                                    icon="fa-solid fa-eye"
                                    class="passIcon"
                                    v-if="oldPasswordtype == 'password'"
                                    @click="changeOldPasswordType"
                                />
                                <font-awesome-icon
                                    icon="fa-solid fa-eye-slash"
                                    class="passIcon"
                                    v-else
                                    @click="changeOldPasswordType"
                                />
                                <div class="err-cont" v-if="!!OldPassword.error">{{OldPassword.error}}</div>
                            </div>

                            <div class="section">
                                <label for="Password">Enter New Password </label>
                                
                                <input placeholder="Only Use It If You Want Update Your Password" required :disabled="disable" :type="passwordtype" id="Password" v-model.trim="Password.value" @blur="handleError('Password')">
                                <font-awesome-icon
                                    icon="fa-solid fa-eye"
                                    class="passIcon"
                                    v-if="passwordtype == 'password'"
                                    @click="changePassType"
                                />
                                <font-awesome-icon
                                    icon="fa-solid fa-eye-slash"
                                    class="passIcon"
                                    v-else
                                    @click="changePassType"
                                />
                                <div class="err-cont" v-if="!!Password.error">{{Password.error}}</div>
                            </div>

                            <div class="section">
                                <label for="PasswordConfirmation">Confirm Your Password </label>
                                <input required placeholder="Only Use It If You Want Update Your Password" :disabled="disable" :type="passwordconfirmationtype" id="PasswordConfirmation" v-model.trim="PasswordConfirmation.value" @blur="handleError('PasswordConfirmation')">
                                <font-awesome-icon
                                    icon="fa-solid fa-eye"
                                    class="passIcon"
                                    v-if="passwordconfirmationtype == 'password'"
                                    @click="changePassConfirmationType"
                                />
                                <font-awesome-icon
                                    icon="fa-solid fa-eye-slash"
                                    class="passIcon"
                                    v-else
                                    @click="changePassConfirmationType"
                                />
                                <div class="err-cont" v-if="!!PasswordConfirmation.error">{{PasswordConfirmation.error}}</div>
                            </div>

                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>

</template>

<script>
import fetchRequest from "../FetchApi";
import Loading from "../components/ui/Loading.vue";
import mix from "../mixin/mixins";

const GET_MYUSER_API = 'http://127.0.0.1:3500/user/getmyuserinfo'

const UPLOAD_API = 'http://127.0.0.1:3500/upload'
const PROFILE_PICTURE_SRC = 'http://127.0.0.1:3500/images/'
const UPDATE_USER_API = 'http://127.0.0.1:3500/user'
const CHANGE_PASSWORD = 'http://127.0.0.1:3500/changepassword'
export default {
    components:{Loading},
    mixins: [mix],
    async created() {
        this.isLoading = true
        try{            
            const resp = await fetchRequest(GET_MYUSER_API, 'GET')
            if (resp.ok){
                const result = await resp.json()
                this.ProfilePic = result.user.profilePicture
                this.FirstName.value = result.user.firstName
                this.LastName.value = result.user.lastName
                this.PhoneNo.value = result.user.phoneno
                this.$store.dispatch('setUserState', result)
                this.isLoading = false
            }else{
                const result = await resp.json()
                const err = new Error(result)
                throw err
            }
        }catch (e){
            this.isLoading = false
            console.log(e)
        }
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
    data() {
        return {
            FirstName:{
                value:'',
                error: false
            },
            LastName:{
                value:'',
                error: false
            },
            PhoneNo:{
                value:'',
                error: false
            },
            OldPassword:{
                value:'',
                error: false
            },
            Password:{
                value:'',
                error: false
            },
            PasswordConfirmation:{
                value:'',
                error: false
            },
            ProfilePic:null,
            disable:false,
            isLoading: false,
            ObservedInit: false,
            ActiveSection: 'personal-info',
            sections: []
        }
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
        handleError(data){
            this[data].error = false
        },
        UpdatePicture(){
            if(this.$refs.ProfilePic.files[0]){
                const reader = new FileReader()
                reader.onload = e => {
                    this.ProfilePic = e.target.result
                }
                reader.readAsDataURL(this.$refs.ProfilePic.files[0])
            }
            
        },
        CheckForms(){
            if (this.FirstName.value == '' || !this.FirstName.value || this.FirstName.value == ' ') this.FirstName.error = 'First Name Cannot Be Empty' 
            if (!this.LastName.value || this.LastName.value == '' || this.LastName.value == ' ') this.LastName.error = 'Last Name Cannot Be Empty'
            
                !this.PhoneNo.value || this.PhoneNo.value == ' ' ?
                    this.PhoneNo.error = 'Phone Number Cannot Be empty' : ''
                    
                !this.PhoneNo.value.startsWith('0') ? 
                    this.PhoneNo.error = 'Phone Number Must Start With 0' : ''
                    
                this.PhoneNo.value.length != 11 ? 
                    this.PhoneNo.error = 'Phone Number Must Be 11-digit length' : ''
                    
                this.PhoneNo.value.charAt(2) != '0' && this.PhoneNo.value.charAt(2) != '1' && this.PhoneNo.value.charAt(2) != '2' && this.PhoneNo.value.charAt(2) != '5' ? 
                    this.PhoneNo.error = 'We Only Support "Orange", "Vodafone", "Etisalat" And "WE" Phone Numbers' : ''
                    
                if (!/^\d+$/. test(this.PhoneNo.value)) this.PhoneNo.error = 'Phone Number Must Be Contains Only Numbers'
                    

            if(this.Password.value != '' && this.Password.value){
                this.OldPassword.value == '' || !this.OldPassword.value ? this.OldPassword.error = 'Old Password Is Required' : ''
                let pattern = new RegExp(
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
                );
                    if( this.Password.value.length < 6 || this.Password.value.length > 20 )
                        this.Password.error = 'Password Length Must Be Between 6 and 20'
                    
                    if ( !pattern.test(this.Password.value) )
                        this.Password.error = 'Password Must Contain At Lease One Uppercase Letter and One Lowercase Letter'
                        
                
            }

            if (this.Password.value != '' && this.Password.value && !this.Password.error && this.Password.value != this.PasswordConfirmation.value){
                this.PasswordConfirmation.error = 'Passowrd Mismatch'
            }

        },
        async finalizingUpdate(){

            this.CheckForms()

            if(this.FirstName.error || this.LastName.error || this.PhoneNo.error || this.Password.error || this.PasswordConfirmation.error) return

            let RequestsArr = []

            await this.$store.dispatch('RequestNewAccessToken')

            if (this.Password.value) {
                RequestsArr.push(fetch(CHANGE_PASSWORD, {
                    method: 'PUT',
                    credentials: 'include',
                    headers:{
                        'Content-Type': 'application/json',
                        authentication: 'Bearer ' + this.$store.getters.accessToken
                    },
                    body: JSON.stringify({
                        oldp: this.OldPassword.value,
                        newp: this.Password.value
                    })
                }))
            }

            RequestsArr.push(fetch(UPDATE_USER_API, {
                method: 'POST',
                credentials: 'include',
                headers:{
                    'Content-Type': 'application/json',
                    authentication: 'Bearer ' + this.$store.getters.accessToken
                },
                body: JSON.stringify({
                    firstname: this.FirstName.value,
                    lastname: this.LastName.value,
                    phoneno: this.PhoneNo.value
                })
            }))
            this.disable = true
            const results = await Promise.allSettled(RequestsArr)
            
            let Errors = []

            for(let i = 0; i <results.length; i ++){
                if (!results[i].value.ok){
                    const msg = await results[i].value.json()
                    Errors.push(msg.message)
                }
            }

            if(Errors.length > 0){
                let newNotifId = this.$store.getters.getNotifId
                this.$store.dispatch('addNotif', { id: newNotifId, type: "error", title: 'Failed..', desc: Errors.toString()})
            }else{
                let newNotifId = this.$store.getters.getNotifId
                this.$store.dispatch('addNotif', { id: newNotifId, type: "success", title: 'Sucess..', desc: 'All Information Has Been Saved.'})                
            }

            if(this.ProfilePic != this.user.profilePicture){
                await this.ChangeProfilePicture()
            }

            this.disable = false
        
        },
        async ChangeProfilePicture(){
            const myFile = this.$refs.ProfilePic.files[0]
            if(!myFile) return
            let notifId = this.$store.getters.getNotifId

            let formData = new FormData()

            formData.append(myFile.name, myFile) //or we can use myFiles.item(key) like the tutorial
            try{
                this.$store.dispatch('addNotif', { id: notifId, type: "info", title: 'Loading..', desc: "Uploading Your Picture."})

                const resp = await fetchRequest(UPLOAD_API, 'POST', formData, true)
                
                    const result = await resp.json()

                    if (resp.ok){
                        this.$store.dispatch('removeNotifById', {id: notifId})
                        let newNotifId = this.$store.getters.getNotifId
                        this.$store.dispatch('addNotif', { id: newNotifId, type: "success", title: 'Finished..', desc: "Picture Uploaded Successfully."})
                        const NewProfilePictureSrc = PROFILE_PICTURE_SRC + result.message
                        
                        notifId = this.$store.getters.getNotifId

                        try{
                            this.$store.dispatch('addNotif', { id: notifId, type: "info", title: 'Loading..', desc: "Saving Picture In Database."})
                            const DBResp = await fetchRequest(UPDATE_USER_API, 'POST', {picurl: NewProfilePictureSrc})
                            if(DBResp.ok){
                                this.$store.dispatch('removeNotifById', {id: notifId})
                                newNotifId = this.$store.getters.getNotifId
                                this.$store.dispatch('addNotif', { id: newNotifId, type: "success", title: 'Finished..', desc: "Picture Saved In Database."})
                                
                                let userState = this.$store.getters.TheUser
                                
                                userState.profilePicture = NewProfilePictureSrc

                                this.$store.dispatch('setUserState', {user: userState} )

                            }else{
                                const DBResult = await DBResp.json()

                                const derr = new Error(DBResult.message )
                                throw derr
                            }
                        }catch(de){
                            this.$store.dispatch('removeNotifById', {id: notifId})
                            let newNotifId = this.$store.getters.getNotifId
                            this.$store.dispatch('addNotif', { id: newNotifId, type: "error", title: 'Failed..', desc: de.message })
                            return
                        }
                    }else{
                        const err = new Error(result.message)
                        throw err
                    }
            } catch(e){
                this.$store.dispatch('removeNotifById', {id: notifId})
                let newNotifId = this.$store.getters.getNotifId
                this.$store.dispatch('addNotif', { id: newNotifId, type: "error", title: 'Failed..', desc: e.message})
                return
            }
        },
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
        user(){
            return this.$store.getters.TheUser
        },
        pageRoute(){
            return this.$router.currentRoute.value.path || ''
        },
        normalPFP(){
            return 'http://127.0.0.1/images/profile'
        }
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

    .profile-pic-section{
        width: 100%;
        height: 300px;
        background: var(--bg-img) center no-repeat;
        background-size: cover;
        padding-top: 150px;
        margin-bottom: 70px;
    }

    .profile-pic-section img{
        width: 200px;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 50%;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        box-shadow: inset 3px 3px 10px 0 #000000;
        -webkit-box-shadow: inset 3px 3px 10px 0 #000000;;
        -moz-box-shadow: inset 3px 3px 10px 0 #000000;;
    }

    .profile-pic-section::before{
        content: '';
        position: absolute;
        width:210px;
        height: 210px;
        border-radius: 50%;
        background-color: v-bind(color3);
        top: 145px;        
        left: 50%;
        transform: translateX(-50%);
    }

    .rounded-corners::before, .rounded-corners::after{
        content: '';
        position: absolute;
        width: 30px;
        height: 30px;
        background-color: v-bind(color3);
        transform: translateX(-50%);
        top: 295px;        

    }

    .rounded-corners::after{
        border-top-right-radius: 100%;
        left: 56.5%;
    }

    .rounded-corners::before{
        border-top-left-radius: 100%;
        left: calc(56.5% - 185px);
    }

    .upload-input{
        display: none;
        width: 200px;
        height: 200px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index:2;
        outline: none;
        cursor: pointer;
        opacity: 0;
    }

    .profile-pic-section img:hover ~ .upload-input, .upload-input:hover{
        display: inline-block;
    }
    
    .profile-pic-section img:hover ~ .input-overlay, .upload-input:hover ~ .input-overlay, .input-overlay:hover {
        display: inline-block;
        opacity: 1;
        visibility: visible;
    }

    .input-overlay{
        opacity: 0;
        display: none;
        visibility: hidden;
        transition: 0.3s all;
        width: 200px;
        height: 200px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index:1;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        color: white
    }

    .overlay{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: relative;
    }

    .overlay span{
        margin-right: 10px
    }

    .update-profile{
        position: absolute;
        right: 10px;
        top: 325px;
        background-color: transparent;
        outline: none;
        padding: 5px 10px;
        font-size: 1.2rem;
        border: 1px solid v-bind(color4);
        color: v-bind(color4);
        transition: 0.3s all;
        font-weight: 600;
        cursor: pointer;
    }

    .primary-btn:hover, .update-profile:hover{
        background-color: v-bind(color4);
        color: v-bind(color3);
        border-radius: 10px;
    }

    .primary-btn{
        background-color: transparent;
        outline: none;
        padding: 5px 10px;
        font-size: 1.2rem;
        border: 1px solid v-bind(color4);
        color: v-bind(color4);
        transition: 0.3s all;
        font-weight: 600;
        cursor: pointer;
    }
    .actions{
        display: flex;
        justify-content: flex-end;
    }
    .err-cont{
        padding: 3px;
        border-radius: 5px;
        color: rgb(145, 0, 0);
        margin-left: 5px;
        width: fit-content;
        font-size: 0.8em;
    }

    .loading-enter-active,
    .loading-leave-active {
        transition: all 0.2s ease;
    }

    .loading-enter-from,
    .loading-leave-to {
        opacity: 0;
    }
/* Personal Info Styles */

    .section {
        border-radius: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px;
        padding-bottom: 0;
        padding-top: 5px;
        margin-bottom: 10px;
        position: relative;
        background-color: v-bind(color3);
        color: v-bind(color2);
    }
    
    .section.double-inputs{
        flex-direction: row;
        gap: 1%
    }
    .section label {
        top: -5px;
        padding: 0 10px
    }
    input, textarea{
        padding: 3px;
        outline: none;
        border: 0;
        border-radius: 5px;
    }
    .first-input, .second-input{
        display: flex;
        flex-direction: column;
        width: 49%
    }

    /* Security Section */
    .passIcon{
        position: absolute;
        top: 43px;
        transform: translateY(-50%);
        cursor: pointer;
        right:20px;
        color: rgba(0,0,0,0.5);
    }
</style>