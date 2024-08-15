const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("OCTest", "postgres", "uQ^EeJvJKVX4&@", {
    host: "localhost",
    dialect: "postgres"
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully");
        return true;
    } catch (error) {
        console.log("Unable to connect to the database", error);
        return false;
    }
}

module.exports = { sequelize, testConnection }