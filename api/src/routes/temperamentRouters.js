const {getAllTemperaments } = require('../Controllers/TemperamentsController')
const axios = require('axios'); 
const  express  = require('express');
const temp = express.Router();


temp.get("/",getAllTemperaments);

module.exports = temp;