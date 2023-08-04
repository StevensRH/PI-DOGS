const axios = require('axios')
require('dotenv').config();
const { getDogsCon, searchDogsByName, postDogs,getDogsById } = require('../Controllers/dogController')

const { API_KEY, URL } = process.env;


async function getDogs(req, res) {

  try {
    const { name } = req.query;
    const dogs = await getDogsCon()
    res.status(200).json(dogs)
  } catch (error) {
    console.error('Request failed:', error.message);
    res.status(500).json({ error: 'There was an error getting the dog breeds.' });
  }
};


const getDogByIdHandler = async (req, res) => {
  try {
    const idDog = req.params.id;
    const dog = await getDogsById(idDog);

    if (!dog) {
      return res.status(404).json({ message: 'Dog not found' });
    }

    return res.status(200).json(dog);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



async function DogsByNameHandler(req, res) {
  const { name } = req.query;

  try {
    const result = await searchDogsByName(name);

    if (result.length === 0) {
      return res.status(404).json({ message: 'No se encontró ninguna raza con ese nombre.' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Hubo un error al buscar las razas de perros.' });
  }
}

const postDogsHandler = async (req, res) => {
  try {
    await postDogs(req, res);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getDogs, DogsByNameHandler, postDogsHandler,getDogByIdHandler }