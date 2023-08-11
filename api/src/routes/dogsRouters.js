const axios = require('axios'); 
const  express  = require('express');
const router = express.Router();

const { allDogs, getDogByIdHandler, postDog} = require('../Handler/dogsHandler')
router.use(express.json())



// I make the request to the api to obtain objects with dog breeds
router.post('/', postDog)
router.get('/', allDogs )
router.get('/:id',getDogByIdHandler)




module.exports = router; 
