const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    'postgresql://postgres:admin@localhost/postgres', {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl:false
    },
    pool: {
        max: 19,
        min: 5,
        acquire: 5000,
        idle: 2000
    },
    logging: false
});

async function Sync() {

    await sequelize.sync({ alter: true })

    console.log('Synced');

}

module.exports = { sequelize, Sync };