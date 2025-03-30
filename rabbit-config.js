const amqp = require('amqplib');
const { User, Zone, Server } = require('./models');
require('dotenv').config();

//const RABBITMQ_URL = process.env["RABBIT.URL"];
const RABBITMQ_URL = process.env.RABBITMQ_URL;
const ZONE_EXCHANGE = process.env.ZONE_EXCHANGE;
//const USER_OFFER_EXCHANGE = process.env.USER_OFFER_EXCHANGE;
//const USER_NOTIFICATION_EXCHANGE = process.env.USER_NOTIFICATION_EXCHANGE;

const ZONE_CONSUMED_QUEUE = "zoneQueue";

const OFFER_QUEUE = "offerQueue";
const NOTIFICATION_QUEUE = "notificationQueue";
const SERVER_QUEUE = "serverQueue";

// Gérer la reconnexion à rabbitmq
const reconnect = async (err) => {
console.log("Tentative de reconnexion... " + err);
    await new Promise(res => setTimeout(res, 5000));
    await this.rabbitConfig();
};

exports.rabbitConfig = async () => {
    
    const cnx = await amqp.connect(RABBITMQ_URL);
    let channel = await cnx.createChannel();

    try {
        cnx.on("error", reconnect);
        cnx.on("close", reconnect);

        channel = await cnx.createChannel();
        //await channel.assertQueue(QUEUE_NAME, { durable: true });

        console.log("Connecté à RabbitMQ");

    } catch (error) {
        console.error("Erreur de connexion à RabbitMQ : ", error);
        reconnect();
    }

    // Création des echanges si ils n'existent pas
    await channel.assertExchange(ZONE_EXCHANGE, 'fanout', { durable: true });
    // await channel.assertExchange(USER_OFFER_EXCHANGE, 'fanout', { durable: true });
    // await channel.assertExchange(USER_NOTIFICATION_EXCHANGE, 'fanout', { durable: true });

    // Création des queues si elles n'existent pas (userNotificationQueue) | userId, message, createdAt
    
    // For request exchange
    let queues = [ OFFER_QUEUE, NOTIFICATION_QUEUE, SERVER_QUEUE ];
    queues.forEach(async (queue) => {
        await channel.assertQueue(queue, { durable: true });
    });

    await channel.bindQueue(OFFER_QUEUE, ZONE_EXCHANGE, "zone.crud");

    await channel.bindQueue(NOTIFICATION_QUEUE, ZONE_EXCHANGE, "notification.create");

    await channel.bindQueue(SERVER_QUEUE, ZONE_EXCHANGE, "server.crud");

    /*let queues = [ "userOfferQueue", "userNotificationQueue"];
    queues.forEach(async (queue) => {
        await channel.assertQueue(queue, { durable: true });
    });

    // For request user exchange
    let offerQueues = [ "userOfferQueue" ];
    offerQueues.forEach(async (queue) => {
        await channel.assertQueue(queue, { durable: true });
    });

    // For request notifications exchange
    let notifsQueues = [ "userNotificationQueue" ];
    notifsQueues.forEach(async (queue) => {
        await channel.assertQueue(queue, { durable: true });
    });
    
    // Liaison entre échange et queues
    queues.forEach(async (queue) => {
        await channel.bindQueue(queue, ZONE_EXCHANGE, "");
    });

    offerQueues.forEach(async (queue) => {
        await channel.bindQueue(queue, USER_OFFER_EXCHANGE, "");
    });

    notifsQueues.forEach(async (queue) => {
        await channel.bindQueue(queue, USER_NOTIFICATION_EXCHANGE, "");
    });*/

    // Souscription à la queue zone pour créer des comptes en cas de changement
    channel.consume(ZONE_CONSUMED_QUEUE, (message) => {
    
        let content = JSON.parse(message.content.toString());

        //console.log("\n");
        //console.log({"message": message});
        //console.log({"content - BDQ": content});

        if(message.fields.routingKey == "user.crud")
        {
            let type = content.type;
            let userId = null;
            switch (type) {
                case "CREATE":
                    userId = content.id;
                    let userName = content.name;
                    let userEmail = content.email;
                    User.create({
                        "userId": userId,
                        "name": userName,
                        "email": userEmail
                    })
                    .then(() => {
                        console.log("Utilisateur créé avec succès")
                    })
                    .catch((err) => {
                        console.log({ "message" : "Erreur lors de la création de l'utilisateur", "error" : err });
                    });
                    break;
                case "UPDATE":
    
                    userId = content.id;
                    
                    User.findOne({ where: { "userId": userId }})
                        .then((user) => {
    
                            if (!user) {
                                throw new Error('Utilisateur non trouvé');
                            }
                    
                            if(content.token != null) user.token = content.token;
                            if(content.token != null) user.expdate = content.token_exp_timestamp;
                    
                            return user.save();
                            
                        })
                        .then(() => {
                            console.log('Utilisateur mis à jour avec succès');
                        })
                        .catch((err) => {
                            console.log("Erreur lors de la mise à jour de l'utilisateur");
                        });
                    
                    break;
                case "DELETE":
                    User.destroy({ where: { "userId": content.id }})
                        .then(() => {
                            console.log("Utilisateur supprimé avec succès");
                        })
                        .catch((err) => {
                            console.log({ "message" : "Erreur lors de la suppression de l'utilisateur", "error" : err });
                        });
                    break;
                default:
                    console.log("NOTHING TO DO...")
                    break;
            }
        }

        channel.ack(message);
    });

    return channel;
};