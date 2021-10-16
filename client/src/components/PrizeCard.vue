<template>
  <div class="prize-card">
    <img :src="require(`@/assets/${imageUrl}`)" :alt="name" />
    <p class="prize-card-title">{{ name }}</p>
    <button @click="showPrizeScreen()">Details</button>
  </div>
</template>

<script>
  export default {
    props: ["name", "imageUrl", "description", "stock", "prizeId"],
    data() {
      return {
      }
    },
    methods: {
      showPrizeScreen(){
        this.$emit('childDetailsClicked', this.prizeId);
      }
    }
  }
</script>

<!-- Add <style scoped> to limit CSS to this component only -->
<style>
  .prize-card {
    max-width: 400px;
    border-radius: 2%;
    background: white;
    margin: 3px;
  }
  .prize-card img{
    width: 400px;
    height: auto;
  }
  .prize-card-title {
    font-weight: bold;
    font-size: 1.2rem;
    letter-spacing: -0.05rem;
  }
  .prize-card button {
    border: none;
    background: #ffcc00;
    font-weight: bold;
    padding: 15px 60px;
    margin: 20px;
    border-radius: 25px;
  }
  .prize-card button:hover {
    cursor: pointer;
  }
</style>
