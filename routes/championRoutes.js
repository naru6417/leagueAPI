const express = require('express');
const { 
    getAllchampions,
    getchampionById, 
    createchampion,
    updatechampion,
    deletechampion,
} = require('../controllers/championController.js');

const router = express.Router();

router.get('/champion', getAllchampions);
router.get('/champion/:championname', getchampionById); 
router.post('/champion', createchampion);
router.put('/champion/:championname', updatechampion); 
router.delete('/champion/:championname', deletechampion); 


module.exports = router;