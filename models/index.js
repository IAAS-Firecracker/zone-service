const sequelize = require("../sequelize");
const Server = require("./Server");
const User = require("./User");
const Zone = require("./Zone");

/*const initDB = async () => {
    try
    {
        await sequelize.authenticate();
        console.log("Opération réussie");

        await sequelize.sync({ alter: true });

        console.log("Base de données synchronisées");
    } catch (error) {
        console.error("Erreur de connexion :", error);
    }
}*/

module.exports = {
    sequelize, User, Server, Zone
}