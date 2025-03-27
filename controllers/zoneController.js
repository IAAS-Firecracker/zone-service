const db = require('../db');
const { Zone } = require('../models');

exports.all = async (req, res) => {
    try {
        const zones = await Zone.findAll({ order: [['name', 'ASC']] });
        res.status(200).json(zones);
    } catch (err) {
        res.status(500).json({
            message : err.message
        });
    }
}

exports.get = async (req, res) => {
    const { id } = req.params;

    try {
        const zone = await Zone.findOne({ where: {'id': id} });

        if(zone == null) return res.status(404).json("Zone avec cet identifiant inexistante");    

        res.status(200).json(zone);
    } catch (err) {
        res.status(500).json({
            message : err.message
        });
    }
}

exports.create = async (req, res) => {
    const { name, center, pricing } = req.body;
    try {
        const zone = await Zone.create({ name, center, pricing });
        
        res.status(201).json({ message: "Zone ajouté avec succès", zone });
    } catch(err) {
        res.status(500).json({
            message : err.message
        });
    }
}


exports.update = async (req, res) => {
    
    const { id } = req.params;
    const { name, center, pricing } = req.body;

    try {
        const zone = await Zone.findOne({ where: { "id": id }});
        
        if(zone != null)
        {
            if(name != null) zone.name = name;
            if(center != null) zone.center = center;
            if(pricing != null) zone.pricing = pricing;

            zone.save();
        
            res.status(200).json({ message: "Zone modifiée avec succès", zone });
        } else {
            return res.status(404).json({ message: "Zone inexistante" });
        }
    } catch(err) {
        res.status(500).json({
            message : err.message
        });
    }
}

exports.delete = async (req, res) => {

    const { id } = req.params;

    try {
        const deletedZone = await Zone.destroy({ where: { "id": id } });

        if(deletedZone > 0)
        {
            res.status(200).json({ message: "Zone supprimée avec succès" });
        }
        else res.status(404).json({ message: "Zone inexistante" });
        
    } catch(err) {
        res.status(500).json({
            message : err.message
        });
    }
}