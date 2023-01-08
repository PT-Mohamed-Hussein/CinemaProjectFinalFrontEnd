<script>
import PanelRow from './PanelRow.vue'
export default {
    components:{PanelRow},
    props:{
        items: {
            type: Array,
            required: true
        }
    },
    watch:{
        ItemsPerPage(newval, _){
            this.ActivePage = 1
        }    
    },
    computed:{
        MaxPages(){
            return Math.ceil(this.items.length/this.ItemsPerPage)
        },
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
        ActiveItems(){
            return this.items.filter((val, index) => index >= ((this.ItemsPerPage) * (this.ActivePage - 1)) && index < ((this.ItemsPerPage) * (this.ActivePage))  )
        }
    },
    data(){
        return {
            ItemsPerPage: 10,
            ActivePage: 1,
            CurrentItemsPerPage: 10,
            selectVisible: false
        }
    },
    methods:{
        ChangePage(mode){
            if(mode == 'inc'){
                if(this.ActivePage < this.MaxPages){
                    this.ActivePage++
                }else{
                    this.ActivePage = 1
                }
            }else if(mode =='dec'){
                if(this.ActivePage == this.MaxPages && this.ActivePage - 1 > 0){
                    this.ActivePage--
                }else{
                    this.ActivePage = this.MaxPages
                }
            }
            
        },
        ChangeItemsPerPage(){
            this.ItemsPerPage = this.CurrentItemsPerPage
        },
        
    }
}
</script>

<template>
    <div class="sub-cont">

        <TransitionGroup name="selects" appear tag="div" class="panel-items">
            <panel-row :header="true"></panel-row>
            <panel-row v-for="item in ActiveItems" :key="item" :header="false" :ticket="item">{{item}}</panel-row>
        </TransitionGroup>
        <div class="panel-controls">
            <div class="control">
                <p class="select-items-per-page">Items Per Page:</p>
                <div class="items-per-page" :class="{'active-selectbox': selectVisible}" @click="selectVisible = !selectVisible">{{ItemsPerPage}}
                    <Transition name="selects" mode="out-in" appear tag="div" class="selects">
                        <TransitionGroup name="selects" appear tag="div" class="selects" v-if="selectVisible">
                            <span @click="ItemsPerPage = 10" v-if="items.length >= 10" :class="{'visible': selectVisible, 'active-select': ItemsPerPage == 10}">10</span>
                            <span @click="ItemsPerPage = 20" v-if="items.length >= 20" :class="{'visible': selectVisible, 'active-select': ItemsPerPage == 20}">20</span>
                            <span @click="ItemsPerPage = 30" v-if="items.length >= 30" :class="{'visible': selectVisible, 'active-select': ItemsPerPage == 30}">30</span>
                            <span @click="ItemsPerPage = 50" v-if="items.length >= 50" :class="{'visible': selectVisible, 'active-select': ItemsPerPage == 50}">50</span>
                            <span @click="ItemsPerPage = 100" v-if="items.length >= 100" :class="{'visible': selectVisible, 'active-select': ItemsPerPage == 100}">100</span>
                        </TransitionGroup>
                    </Transition>
                </div>
            </div>
            <div class="control">
                <button @click="ChangePage('dec')"> &lt; </button>
                <span>{{ActivePage}} / {{MaxPages}}</span>
                <button @click="ChangePage('inc')"> > </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .sub-cont{
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: v-bind(color1);
        border-radius: 10px;
        color: v-bind(color2);
        position: relative;
    }
    .panel-controls{
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: center;
        margin-top: 10px;
        padding-top: 5px;
    }
    .control{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 20px;
    }
    /* Start Custom Select + Items Per Page Control */
    .select-items-per-page{
        color: v-bind(color2);
        margin-right: 20px;
        font-size: 0.8rem;
    }
    .items-per-page{
        width: 80px;
        padding-bottom: 5px;
        border-bottom: 1px solid v-bind(color2);
        position: relative;
        cursor: pointer;
        background-color: v-bind(color3);
        padding: 5px;
    }
    .items-per-page::after{
        content: '';
        position: absolute;
        top: 40%;
        right: 10px;
        border: solid rgba(255, 255, 255, 0.5);
        border-width: 0 3px 3px 0;
        transform: translateY(-50%) rotate(45deg);
        display: inline-block;
        padding: 3px;
        transition: all 0.3s ease;
    }
    .items-per-page.active-selectbox::after{
        top: 50%;
        transform: translateY(-50%) rotate(225deg);
    }
    .selects{
        position: absolute;
        background-color: v-bind(color3);
        width: 100%;
        z-index: 3;
        top: 35px;
        left: 0;
        max-height: 100px;
        overflow: hidden;
        overflow-y: auto;
        display: flex;
        flex:1;
        flex-wrap: wrap;
    }
    .selects > span{
        display: none;
        background-color: v-bind(color3);
        border-bottom: 1px solid v-bind(color2);
        padding: 3px 0;
        color: inherit;
        text-align: center;
        transition: all 0.3s ease;
        order: 2;
        width: 100%;
    }
    .selects > span:hover{
        background-color: rgba(255, 255, 255, 0.4);
    }
    .selects > span.active-select{
        background-color: rgba(255, 255, 255, 0.4);
        cursor: auto;
        order: -1
    }

    
    .selects-enter-active,
    .selects-leave-active {
        transition: all 0.4s ease;
    }

    .selects-enter-from,
    .selects-leave-to {
        opacity: 0;
        transform: translateX(-20px);
    }
    .selects-leave-active{
        position: absolute;
    }
    .selects-move{
        transition: all 0.1s ease;
    }

    .visible{
        display: block!important;;
    }

    /* End Custom Select + Items Per Page Control */
    
    /* Start Of Pagination Section */
    .control button{
        outline: none;
        background: transparent;
        color: rgba(255, 255, 255, 0.6);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-weight: 600;
        font-size: 1.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s ease;
        margin: 0 10px;
    }

    .control button:hover{
        background-color: rgba(255, 255, 255, 0.2);
    }
</style>