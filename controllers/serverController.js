const { Server } = require('../models');
const { rabbitPublishServer, rabbitPublishNotification } = require('../rabbit-ops');

exports.all = async (req, res) => {
    try {
        const servers = await Server.findAll({ order: [['ip', 'ASC']] });
        res.status(200).json(servers);
    } catch (err) {
        res.status(500).json({
            message : err.message
        });
    }
}

exports.zoneServers = async (req, res) => {
    const { zoneId } = req.query;

    try {
        const servers = await Server.findAll({ where: { zoneId }, order: [['ip', 'ASC']] });
        res.status(200).json(servers);
    } catch (err) {
        res.status(500).json({
            message : err.message
        });
    }
}

exports.get = async (req, res) => {
    const { id } = req.params;

    try {
        const server = await Server.findOne({ where: { 'id': id } });

        if(server == null) return res.status(404).json("Serveur avec cet identifiant inexistant");    

        res.status(200).json(server);
    } catch (err) {
        res.status(500).json({
            message : err.message
        });
    }
}

exports.create = async (req, res) => {
    const { ip, port, ram, storage, zoneId } = req.body;
    try {

        const { userId } = req.userData.userId;

        const server = await Server.create({ ip, port, ram, storage, zoneId });
        
        const event = {
            server : {
                "id": server.id,
                ip,
                port,
                ram,
                storage,
                zoneId
            },
            type: "CREATE"
        };
    
        const notificationEvent = {
            user : {
                "id": userId,
            },
            message: "Serveur créé avec succès" 
        };
    
        rabbitPublishServer(JSON.stringify(event));
    
        rabbitPublishNotification(JSON.stringify(notificationEvent));

        res.status(201).json({ message: "Serveur ajouté avec succès", server });
    } catch(err) {
        res.status(500).json({
            message : err.message
        });
    }
}


exports.update = async (req, res) => {
    
    const { id } = req.params;
    const { ip, port, ram, storage } = req.body;

    try {
        const { userId } = req.userData.userId;
        const server = await Server.findOne({ where: { "id": id }});
        
        if(server != null)
        {
            if(ip != null) server.ip = ip;
            if(port != null) server.port = port;
            if(ram != null) server.ram = ram;
            if(storage != null) server.storage = storage;

            server.save();
            
            const event = {
                server : {
                    "id": server.id,
                    "ip": server.ip,
                    "port": server.port,
                    "ram": server.ram,
                    "storage": server.storage,
                },
                type: "UPDATE"
            };
        
            const notificationEvent = {
                user : {
                    "id": userId,
                },
                message: "Serveur mis à jour avec succès" 
            };
        
            rabbitPublishServer(JSON.stringify(event));
        
            rabbitPublishNotification(JSON.stringify(notificationEvent));

            res.status(200).json({ message: "Serveur modifié avec succès", server });
        } else {
            return res.status(404).json({ message: "Serveur inexistant" });
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
        const deletedServer = await Server.destroy({ where: { "id": id } });

        if(deletedServer > 0)
        {
            const event = {
                server : {
                    "id": deletedServer.id,
                },
                type: "DELETE"
            };
        
            const notificationEvent = {
                user : {
                    "id": userId,
                },
                message: "Serveur supprimé avec succès" 
            };
        
            rabbitPublishServer(JSON.stringify(event));
        
            rabbitPublishNotification(JSON.stringify(notificationEvent));

            res.status(200).json({ message: "Serveur supprimé avec succès" });
        }
        else res.status(404).json({ message: "Serveur inexistant" });
        
    } catch(err) {
        res.status(500).json({
            message : err.message
        });
    }
}