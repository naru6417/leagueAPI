const express = require('express');
const { 
    getAramTeam,
} = require('../controllers/aramController.js');

const router = express.Router();

router.get('/aram', getAramTeam);

module.exports = router;
