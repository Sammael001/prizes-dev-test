<template>
  <div class="prize-page">
    
    <div id="pic-and-redeem-box">

      <div class="img-holder">
        <img 
        :src="require(`@/assets/${prizeDetails.imageUrl}`)" :alt="prizeDetails.name"
      >
      </div>
      
      <div class="redeem-box">
        <h2>{{prizeDetails.name}}</h2>
        <hr class="small-hr">

        <button 
          v-if="available"
          class="generic-button yellow-button" 
          @click="handleRedeemClick()"
        >Redeem ></button>
        <button 
          v-if="!available"
          class="button-disabled" 
          disabled
        >Sorry, out of stock!</button>

        <hr class="small-hr">
        <p>{{prizeDetails.stock}} left in stock</p>
      </div>
      
      <hr class="big-hr">
    </div>

    
    <div class="description-box">
      <h2>Description</h2>
      <p>{{prizeDetails.description}}</p>
    </div>

    <div v-if="showConfirm" id="confirm-card-overlay">

      <div v-if="!redeemConfirmed" id="confirm-card">
        <p class="x-button">
          <span @click="handleRedeemCancel">X</span>
        </p>
        <h1>Are you sure?</h1>
        <img 
          :src="require(`@/assets/${prizeDetails.imageUrl}`)" :alt="prizeDetails.name"
        >
        <p>Redeem for {{prizeDetails.name}}?</p>
        <div id="confirm-buttons-box">
          <button class="generic-button yellow-button" @click="handleRedeemConfirm">Yes</button>
          <button class="generic-button gray-button" @click="handleRedeemCancel">Cancel</button>
        </div>
      </div>

      <div v-if="redeemConfirmed" id="confirm-card">
        <p class="x-button">
          <span @click="returnToMain">X</span>
        </p>
        <h1>Congratulations!</h1>
        <p>You redeemed</p> 
        <h3>{{prizeDetails.name}}</h3>
        <div id="confirm-buttons-box">
          <button 
            class="generic-button yellow-button" 
            @click="returnToMain"
          >More Prizes</button>
        </div>
      </div>

    </div>
    
    
  </div>
</template>

<script>
  export default {
    props: ["prizeDetails"],
    data() {
      return {
        showConfirm: false,
        redeemConfirmed: false,
        available: false
      }
    },
    created() {
      if (this.prizeDetails.stock > 0) {
        this.available = true
      } else {
        this.available = false
      }
    },
    methods: {
      handleRedeemClick() {
        this.showConfirm = true
      },
      handleRedeemCancel() {
        this.showConfirm = false
      },
      handleRedeemConfirm() {
        this.redeemConfirmed = true
        this.$emit("childConfirmsRedeem", this.prizeDetails._id)
      },
      returnToMain() {
        console.log("return to main screen");
        this.showConfirm = false
        this.redeemConfirmed = false
        this.$emit("returnToMain")
      }
    },


  }
</script>

<style>
  .prize-page {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: baseline;
  }
  #pic-and-redeem-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
  }
  .img-holder {
    min-width: 300px;
    max-width: 50%;
    height: auto;
    margin: 0 10px 10px 10px;
  }
  .img-holder img {
    width: 100%;
    height: 100%;
    object-fit: fit;
    overflow: hidden;
  }
  .redeem-box {
    min-width: 40%;
    background: white;
    border-radius: 5px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: left;
    box-shadow: 3px 3px 4px rgba(0,0,0,0.05);
  }
  .x-button {
    font-size: 2rem;
    text-align: right;
    margin: 0;
    padding: 0;
    color: gray;
  }
  .x-button span:hover {
    cursor: pointer;
  }
  .redeem-box h2, 
  .redeem-box p {
    text-align: left;
  }
  .generic-button {
    border: none;
    font-weight: bold;
    padding: 15px 25px;
    margin: 5px;
    border-radius: 25px;
    width: 175px;
  }
  .generic-button:hover {
    cursor: pointer;
  }
  .yellow-button {
    background: #ffcc00;
  }
  .gray-button {
    background: lightgray;
  }
  .button-disabled {
    border: none;
    font-weight: bold;
    padding: 15px 25px;
    margin: 5px;
    border-radius: 25px;
    width: 175px;
    background: lightgray;
  }
  .big-hr {
    border: none;
    height: 2px;
    background: #d9d9d9;
    width: 90%;
    margin: 30px 5px;
  }
  .small-hr {
    border: none;
    height: 2px;
    background: #d9d9d9;
    width: 100%;
    margin: 10px auto;
  }
  .description-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 90%;
    margin: 20px auto;
    padding: 10px;
    justify-content: center;
    align-items: flex-start;
  }
  .description-box h2 {
    padding: 0 20px 20px 20px;
    margin: 0;
  }
  .description-box p {
    max-width: 70%;
    padding: 0 20px;
    margin: 0;
    text-align: left;
  }

  #confirm-card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #confirm-card {
    width: 50%;
    background-color: white;
    margin: auto;
    padding: 20px 50px;
    border-radius: 5px;
  }
  #confirm-card img {
    border-radius: 50%;
    width: 150px;
    height: 150px;
  }
  #confirm-buttons-box {
    padding: 30px 10px;
  }

</style>