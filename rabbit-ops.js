const amqp = require('amqplib');
const { User } = require('./models/models');
const { rabbitConfig } = require('./rabbit-config');
require('dotenv').config();

const ZONE_EXCHANGE = process.env.ZONE_EXCHANGE;
// const USER_OFFER_EXCHANGE = process.env.USER_OFFER_EXCHANGE;
// const USER_NOTIFICATION_EXCHANGE = process.env.USER_NOTIFICATION_EXCHANGE;


exports.rabbitPublishZone = async (msg) => {
    const ch = await rabbitConfig();
    ch.publish(ZONE_EXCHANGE, "zone.create", Buffer.from(msg));
    console.log(`Message envoyé : ${msg}`);
}

exports.rabbitPublishNotification = async (msg) => {
    const ch = await rabbitConfig();
    ch.publish(ZONE_EXCHANGE, "notification.create", Buffer.from(msg));
    console.log(`Message envoyé : ${msg}`);
}

exports.rabbitPublishServer = async (msg) => {
    const ch = await rabbitConfig();
    ch.publish(ZONE_EXCHANGE, "server.create", Buffer.from(msg));
    console.log(`Message envoyé : ${msg}`);
}