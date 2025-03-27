const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Server = sequelize.define("Server", {
    ip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    port: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ram: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    storage : {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
});


module.exports = Server