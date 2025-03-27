const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const Server = require("./Server");
const User = require("./User");

const Zone = sequelize.define("Zone", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    center: {
        type: DataTypes.GEOMETRY("POINT"),
        allowNull: true,
    },
    pricing: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
    }
});


Zone.hasMany(Server, { foreignKey: "zoneId", onDelete: "CASCADE" });
Server.belongsTo(Zone, { foreignKey: "zoneId" });

Zone.hasMany(User, { foreignKey: { name: "zoneId" , allowNull: true },  onDelete: "SET NULL"});
User.belongsTo(Zone, { foreignKey: { name: "zoneId" , allowNull: true } });

module.exports = Zone;