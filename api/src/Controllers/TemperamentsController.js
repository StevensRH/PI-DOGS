const axios = require("axios");
require("dotenv").config();
const {Dog, Temperaments} = require('../db')
const { URL } = process.env;

async function getAllTemperaments(req, res) {
  try {

    const infoApi = await axios.get(`${URL}`);

    console.log("API data:", infoApi.data)
    const temperamentDogs = await infoApi.data.map((dog) => dog.temperament);
    console.log("Temperaments:", temperamentDogs);
    for (let i = 0; i < temperamentDogs.length; i++) {  
      const temperament = String(temperamentDogs[i]).split(", ");
console.log('holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',temperament)
      for (let j = 0; j < temperament.length; j++) {
        await Temperaments.findOrCreate({
          where: { name: temperament[j] },
        });
      }
    }

    const temperamentAll = await Temperaments.findAll();


    return res.status(200).send(temperamentAll);
  } catch (error) {
    return res.status(500).send("Error loading to database");
  }
}

  module.exports= {
    getAllTemperaments,
  }