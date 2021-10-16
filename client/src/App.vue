<template>
  <div id="app">

    <header id="navbar">
      <img alt="rewards logo" @click="returnFromPrizePage" src="./assets/logo.png">
      <div id="username">
        <div id="avatar-placeholder"></div>
        <h4>Sylvia Moore</h4>
      </div>
      
    </header>

    <div id="title-bar">
      <h1>Rewards</h1>
    </div> 

    <div v-if="!showSelected">

      <p id="list-intro">Here is the full list of prizes that you can win.</p>

      <div v-if="prizesDataLoaded">
        <ul id="prize-ul">
          <li v-for="prize in prizes" v-bind:key="prize._id"> 
            <PrizeCard 
              :name="prize.name"
              :description="prize.description"
              :imageUrl="prize.imageUrl"
              :stock="prize.stock"
              :prizeId="prize._id"
              @childDetailsClicked="setSelectedChild"
            />
          </li>
        </ul>
      </div>

      <div v-if="!prizesDataLoaded">
        <h3>...Loading prizes, please wait...</h3>
      </div>

    </div>



    <div v-if="showSelected">
      
      <PrizePage 
        :prizeDetails="selectedPrize"
        @childConfirmsRedeem="updateStock"
        @returnToMain="returnFromPrizePage"
      />
      
    </div>


    <footer>
      <p>
        <a href="#">Terms & Conditions</a>
        |
        <a href="#">Privacy Policy</a>
      </p>
    </footer>

  </div>
</template>

<script>
  import PrizeCard from './components/PrizeCard.vue';
  import PrizePage from "./components/PrizePage.vue";
  import axios from "axios";

  export default {
    name: 'App',
    components: {
      PrizeCard,
      PrizePage
    },
    data() {
      return {
        prizes: null,
        prizesDataLoaded: false,
        showSelected: false,
        selectedPrize: null
      }
    },
    created() {
      axios.get("/api/")
      .then(res => {
          this.prizes = res.data;
          console.log(res.data);
          this.prizesDataLoaded = true;
        });
    },
    methods: {
      setSelectedChild(childID) {
        console.log("Selected child with ID of", childID);
        axios.get(`/api/prize/?id=${childID}`)
        .then(res => {
          console.log(res.data);
          this.selectedPrize = res.data;
          this.showSelected = true;
        })
      },
      updateStock(childID) {
        console.log("Decreasing stock of child with ID of", childID);
        axios.get(`/api/redeem/?id=${childID}`)
        .then(response => {
          console.log(response);
          axios.get("/api/")
          .then(res => {
              this.prizes = res.data;
              console.log("Prizes updated, new data:");
              console.log(res.data);
            });
        })
      },
      returnFromPrizePage() {
        this.showSelected = false
        this.selectedPrize = null
      }
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
    margin: 0;
  }
  #navbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 15px;
  }
  #navbar img {
    width: 150px;
    height: auto;
  }
  #navbar img:hover {
    cursor: pointer;
  }
  #username {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  #avatar-placeholder {
    height: 40px;
    width: 40px;
    background: #d9d9d9;
    margin-right: 10px;
    border-radius: 50%;
  }
  #title-bar {
    background: #366eb8;
    color: white;
    margin: 0 5px;
  }
  #title-bar h1 {
    margin: 0;
    padding: 50px;
    letter-spacing: -0.05rem;
  }
  #list-intro {
    font-size: 1.25rem;
    margin: 50px 0;
  }
  #prize-ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  #prize-ul li {
    list-style-type: none;
  }
  footer {
    background-image: linear-gradient(#262626, #000000);
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  footer a, footer p {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
</style>
