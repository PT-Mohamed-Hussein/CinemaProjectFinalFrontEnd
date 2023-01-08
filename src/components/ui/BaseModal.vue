<template>
    <teleport to="#app">
        <div class="modal-cont" v-if="show">
            <div class="modal" v-if="show">
                <div class="modal-title">
                    <slot name="title"></slot>
                    <font-awesome-icon icon="fa-solid fa-xmark" class="close" @click="$emit('closeModal')" />
                </div>
                <slot></slot>
                <div class="update-btn-cont">
                    <button class="update-btn" @click="$emit('submitModal')">{{action}}</button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
export default {
    props: {
        show:{
            required: true,
            type: Boolean,
        },
        action:{
            type: String,
            required: true
        }
    },
    emits:['submitModal', 'closeModal']
}
</script>

<style scoped>
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
    @media (max-width: 510px) {
        .modal{
            width: 90%
        }
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
    .close{
        font-size: 1.1rem;
        cursor: pointer;
        color: red;
        transition: all 0.3s;
    }
    .close:hover{
        filter: brightness(70%)
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
        border: 0;
        cursor: pointer;
    }
    .update-btn:hover{
        filter: brightness(70%)
    }

</style>