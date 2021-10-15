<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div v-if="showPrizes">
      <ul>
        <li v-for="prize in prizes" v-bind:key="prize.id"> 
          <CardComponent 
            :name="prize.name"
            :description="prize.description"
            :imageUrl="prize.imageUrl"
            :stock="prize.stock"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import CardComponent from './components/CardComponent.vue';
  import axios from "axios";

  export default {
    name: 'App',
    components: {
      CardComponent
    },
    data() {
      return {
        prizes: null,
        showPrizes: false
      }
    },
    created() {
      axios.get("http://localhost:5000/api/")
      .then(res => {
          this.prizes = res.data;
          console.log(res.data);
          this.showPrizes = true;
        });
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
