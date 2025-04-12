const amqp = require('amqplib');
const { rabbitConfig } = require('./rabbit-config');
require('dotenv').config();

const ZONE_EXCHANGE = process.env.ZONE_EXCHANGE;
const ZONE_SERVER_EXCHANGE = process.env.ZONE_SERVER_EXCHANGE;
const ZONE_NOTIFICATION_EXCHANGE = process.env.ZONE_NOTIFICATION_EXCHANGE;


exports.rabbitPublishZone = async (msg) => {
    const ch = await rabbitConfig();
    ch.publish(ZONE_EXCHANGE, "", Buffer.from(msg)); // zone.crud
    console.log(`Message envoyé : ${msg}`);
}

exports.rabbitPublishNotification = async (msg) => {
    const ch = await rabbitConfig();
    ch.publish(ZONE_NOTIFICATION_EXCHANGE, "", Buffer.from(msg)); // notification.create
    console.log(`Message envoyé : ${msg}`);
}

exports.rabbitPublishServer = async (msg) => {
    const ch = await rabbitConfig();
    ch.publish(ZONE_SERVER_EXCHANGE, "", Buffer.from(msg)); // server.crud
    console.log(`Message envoyé : ${msg}`);
}