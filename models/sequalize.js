const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    'postgres://wtkfoesjfkfasv:b5c8d042a8d7c3f5120f11021dda73bfdc8bfbf7ae97cadbf4ca0c580023da6d@ec2-34-251-115-141.eu-west-1.compute.amazonaws.com:5432/dt1opl8e0folh', {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl:{
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max:3,
        
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