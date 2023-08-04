const axios = require('axios'); 
const  express  = require('express');
const router = express.Router();

const {getDogs, DogsIdHandler,getDogByIdHandler, DogsByNameHandler, createDogHandler} = require('../Handler/dogsHandler')
router.use(express.json())



// I make the request to the api to obtain objects with dog breeds
router.get('/', getDogs )
router.get('/:id',getDogByIdHandler)
router.get('/name?="..."',DogsByNameHandler)
router.post('/', createDogHandler)



module.exports = router; 
