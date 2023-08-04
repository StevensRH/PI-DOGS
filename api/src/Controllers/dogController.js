const axios = require('axios');
const { Op } = require('sequelize');
const { Dog, Temperaments} = require('../db');
require('dotenv').config();
const{API_KEY, URL}  = process.env;

async function getDogsCon() { 
  
    try {
      const response = await axios.get(`${URL}?api_key=${API_KEY}`)
      const data = response.data; 
  
    const dogsDB = await Dog.findAll();
      if (data.length === 0) {
        return data;
      } 
      const apiYDB = [...data, ...dogsDB];
      return apiYDB;
    } catch (error) {
      console.error('Request failed:', error.message);
   
    }
  }

  const getDogByIdDB = async (id) => {
    return await Dog.findByPk(id);
  };
  
  const getDogByIdAPI = async (id) => {
    const response = await axios.get(`${URL}/${id}?api_key=${API_KEY}`);
    const data = response.data;
    const { id: dogId, name, height, weight, life_span, image } = data;
    const perro = {
      id: dogId,
      name,
      image,
      weight,
      height,
      life_span,
    };
    return perro;
  };
  
  const getDogsById = async (id) => {
    if (id.toString().length > 3) {
      return await getDogByIdDB(id);
    } else {
      return await getDogByIdAPI(id);
    }
  };


const getAllDogsDb = async()=>{
    return await Dog.findAll({
        include:{
            model: Temperaments,
            attributes:["name"],
            through:{
                attributes:[],
            }
        }
    })
}

const dogOfApiDB = async()=>{
    const resApi = await getId();
    const resDB = await getAllDogsDb();
    return resApi.concat(resDB);                                                                        
}
const searchDogsByName = async(name)=>{
    try {
      // Primero, buscamos en la base de datos
      const dbResult = await Dog.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%` // Realiza una búsqueda case-insensitive (ignorando mayúsculas y minúsculas)
          }
        }
      });
  
      // Luego, buscamos en la API externa si no encontramos en la base de datos
      if (dbResult.length === 0) {
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${encodeURIComponent(name)}&api_key=${API_KEY}`);
        const apiResult = response.data;
  
        return apiResult;
      }
  
      return dbResult;
    } catch (error) {
      console.error('Request failed:', error.message);
      throw new Error('Hubo un error al buscar las razas de perros.');
    }
  }



  const postDogs = async (req, res) => {
    try {
      const {
        name,
        image,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        lifeSpanMin,
        lifeSpanMax,
        temperaments,
        // tamanio,
      } = req.body;
  
      if (
        !name ||
        !heightMin ||
        !heightMax ||
        !weightMin ||
        !weightMax ||
        !lifeSpanMin ||
        !lifeSpanMax ||
        !temperaments
        // !tamanio
      ) {
        throw new Error("Missing required data");
      }
  
      const newDog = {
        name,
        image,
        heightMin: parseInt(heightMin),
        heightMax: parseInt(heightMax),
        weightMin: parseInt(weightMin),
        weightMax: parseInt(weightMax),
        lifeSpan: `${lifeSpanMin} - ${lifeSpanMax} years`,
        // tamanio,
      };
  
      const createNewDog = await Dog.create(newDog);
  
      const findTemp = await Temperament.findAll({
        where: { name: temperaments },
      });
  
      createNewDog.addTemperament(findTemp);
  
      return res.status(201).send("The dog was created successfully");
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
  
  
module.exports = { getDogsCon, searchDogsByName, getAllDogsDb, dogOfApiDB, postDogs, getDogsById};
    




