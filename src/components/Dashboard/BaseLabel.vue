<template>
    <div class="role" :class="role">
        {{role}}
    </div>
</template>
  
<script>
export default {
    props: {
        role: {
            required: true,
            type: String
        }
    }
}
</script>
  
<style scoped>
    .role{
        padding: 2px 10px;
        border-radius: 10px;
        font-weight: 600;
        font-size: 12px;
        color: yellow;
        background: #c3c3c3;
        width: fit-content;
        text-transform: capitalize;
    }
    .user{
        color: #030030;
        background-color: #d6d6d6;
    }
    .admin{
        color: rgb(75, 0, 37);
        background: rgb(248, 167, 208);
    }
</style>