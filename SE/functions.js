const axios = require("axios");


const functions= {

getAlleArtikel: () => {
  return axios.get("http://localhost:7000/shop")

},

loadById: () => {
  return axios.get("http://localhost:7000/shop/gib/5")
}, 

getAktuelleAngebote: () =>{
  return axios.get("http://localhost:7000/shop/aktuelleAngebote")
},

getMaenner: () =>{
  return axios.get("http://localhost:7000/shop/maenner")
}


}

module.exports = functions;


