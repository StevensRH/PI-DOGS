const express= require('express')
const { Router } = require('express');
const temperamentRouter = require ('./temperamentRouters');
const dogRouter = require('./dogsRouters') 

const router = Router();

// router.use('/temperaments', temperamentRouter)
router.use('/dogs',dogRouter )

module.exports = router;
