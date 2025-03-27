const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const User = sequelize.define("User", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate : {
            isEmail: true
        }
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "user", // user, admin
        allowNull: true
    },
    token : {
        type: DataTypes.TEXT,
        allowNull: true
    },
    expdate : {
        type: DataTypes.TEXT,
        allowNull: true
    }
});


module.exports = User