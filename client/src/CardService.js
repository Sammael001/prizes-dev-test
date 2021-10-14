import axios from "axios";

const url = `http://localhost:5000/api/`;

class CardService {
  // get cards
  static getCards() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(data);
      } catch(err) {
        reject(err);
      }
    })
  }

  // create cards

  // delete cards
  static redeemPrize(id){

  }
};

export default CardService;