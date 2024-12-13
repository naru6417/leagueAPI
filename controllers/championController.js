const champion = require('../models/champion.js');

exports.getAllchampions = async (req, res) => {
    try {
        const champions = await champion.findAll();
        res.json(champions);
    } catch (err) {
        res.status(500).json({ error: 'failed to fetch champion' });
    }
};

exports.getchampionById = async (req, res) => {    
    try {
        const champions = await champion.findOne({ 
            where: { championname: req.params.championname } 
        }); 
        if (!champions) {
            return res.status(404).json({ error: 'champion not found' });
        }
        res.json(champions);
    } catch (err) {
        res.status(500).json({ error: 'failed to fetch champion' });
    }
};

exports.deletechampion = async (req, res) => {
    try {
        const deleted = await champion.destroy({
            where: { championname: req.params.championname },
        });
        if (!deleted) {
            return res.status(404).json({ error: 'champion not found' });
        }
        res.json({ message: 'champion deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'failed to delete champion' });
    }
};


exports.createchampion = async (req, res) => {
    try {
        const existingChampion = await champion.findByPk(req.body.championname);

        if (!existingChampion) {
            return res.status(409).json({ error: 'champion with this ID already exists' });
        }

        const newchampion = await champion.create(req.body);
        res.status(201).json(newchampion);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create champion' });
    }
};

exports.updatechampion = async (req, res) => {
    try {
        const [updated] = await champion.update(req.body, {
            where: { championname: req.params.championname },
        });

        if (!updated) {
            return res.status(404).json({ error: 'champion not found' });
        }

        const updatedchampion = await champion.findOne({
            where: { championname: req.params.championname },
        });
        
        res.json(updatedchampion);
    } catch (err) {
        res.status(400).json({ error: 'failed to update champion' });
    }
};

