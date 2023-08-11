const axios = require('axios')
require('dotenv').config();
const { getDogsById,getAllDogs } = require('../Controllers/dogController');
const { Dog, Temperaments} = require('../db');

const { API_KEY, URL } = process.env;




// const dogDetailHandler = async (req, res) => {
//   await getDogDetail(req, res);
// };


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


const allDogs = async (req,res)=>{
  try {
    const name = req.query.name
    let dogsTotal = await getAllDogs();
if(name){
    let dogName = await dogsTotal.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
    dogName.length ?
    res.status(200).send(dogName) :
    res.status(404).send("No se encuentra la raza");
} else{
    res.status(200).send(dogsTotal);
}
} catch (error) {
    res.status(500).json(error.message);
}
}



async function postDog(req, res) {
  try {
    const {id, name, height, weight, temperaments, life_span, image } = req.body;
    if (!id || !name || !height || !weight || !life_span || !temperaments)
      throw new Error("Missing required data");

    const dogNew = {
      id,
      name,
      height,
      weight,
      life_span,
      image,
    };

    const createNewDog = await Dog.create(dogNew);

    const findTemp = await Temperaments.findAll({
      where: { name: temperaments },
    });
    createNewDog.addTemperament(findTemp);

    res.status(201).json(createNewDog);
  } catch (error) {
    console.error("Error, the dog cannot be created", error);
    res.status(500).json({ error: "There's a error" });
  }
}


module.exports = {  allDogs, postDog, getDogByIdHandler}