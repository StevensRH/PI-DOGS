const express= require('express')
const { Router } = require('express');
const temperamentRouter = require ('./temperamentRouters');
const dogRouter = require('./dogsRouters') 

const router = Router();

// router.use('/temperaments', temperamentRouter)
router.use('/dogs',dogRouter )
router.use('/temperaments', temperamentRouter)

module.exports = router;
