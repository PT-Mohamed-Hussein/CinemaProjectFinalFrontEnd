<template>
    <div class="card">
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
      props: {
  
      }
  }
  </script>
  
  <style scoped>
      .card{
        background-color: #161616;
        color: #fff;
        width: 30%;
        box-shadow: 0 0 10px #121212;
        padding: 10px;
        display: flex;
      }
      @media (max-width: 1200px) {
        .card{
          width: 45%
        }
        .sidebar{
          margin-right: 10px
        }
      }
      @media (min-width: 767px) and (max-width: 960px) {
        .card{
          width: 70%
        }
        
      }
      @media (max-width: 680px) {
        .card{
          width: 90%
        }
        
      }
      @media (max-width: 425px) {
        .card{
          flex-direction: column;
          align-items: center;
          width: 90%
        }
        
      }
      
  </style>