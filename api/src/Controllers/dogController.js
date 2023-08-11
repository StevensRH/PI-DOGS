const axios = require('axios');
const { Op } = require ('sequelize');
const { Dog, Temperaments} = require('../db');

require('dotenv').config();
const{API_KEY, URL}  = process.env;

const cleanArray = (arr)=>
      arr.map((prop)=>{
        return{
      id: prop.id,
      name: prop.name,
      height: prop.height.metric,
      weight: prop.weight.metric,
      life_span: prop.life_span,
      image: prop.image,
      temperament: prop.temperament,
    };
  });



  
const getDogByIdDB = async (id) => {
  return await Dog.findByPk(id);
};

const getDogByIdAPI = async (id) => {
  const response = await axios.get(`${URL}/${id}?api_key=${API_KEY}`);
  const data = response.data;
  const {  name, height, weight, life_span, image } = data;
  const perro = {
  
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


const getApiInfo = async () => {
  const apiUrl = await axios.get(`${URL}?key=${API_KEY}`);
  const apiInfo = await apiUrl.data.map(el => {
      return {
          name: el.name,
          image: el.image,
          height: el.height,
          weight: el.weight,
          life_span: el.life_span,
          id: el.id,
          temperament:el.temperament,
      };
  });
  return apiInfo
};


//dogs de DB


const getDbInfo = async () => {
  let dogDB = await Dog.findAll({
      include:{
          model: Temperaments,
          attributes: ["name"],
          through: {
              attributes:[],
          }
      }
  })

return dogDB
}




//dogs de DB + API

const getAllDogs = async () => {
  const apiInfo = await getApiInfo();
  const DbInfo = await getDbInfo();
  const infoTotal = await DbInfo.concat(apiInfo);
  return infoTotal;
};






module.exports = { getDogsById, getAllDogs, getDbInfo, getApiInfo };
    




