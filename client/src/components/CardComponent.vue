<template>
  <div class="hello">
    <h3>{{ name }}</h3>
    <!-- Figuring out the correct image src property took waaaaay too long :O  -->
    <img :src="require(`@/assets/${imageUrl}`)" :alt="name" />
    <p>Description: {{ description }}</p>
    <p>stock: {{ stock }}</p>
  </div>
</template>

<script>
  export default {
    props: ["name", "imageUrl", "description", "stock"],
   
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
